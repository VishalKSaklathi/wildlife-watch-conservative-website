const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const twilio = require('twilio');
const { ObjectId } = require('mongodb');

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: false }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// twilio key

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Simple_database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error in connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Setup multer for file upload handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Sign up endpoint
app.post("/sign_up", async (req, res) => {
    try {
        const { fullname, email, location, mobile, username, password, password1, role, adminID } = req.body;

        const userData = {
            name: fullname,
            email,
            location,
            mobile,
            username,
            password,
            password1
        };

        if (role === '1') {
            const adminData = {
                name: fullname,
                email,
                location,
                mobile,
                username,
                password,
                password1,
                adminID
            };
            await db.collection('admin_details').insertOne(adminData);
            console.log(adminData);
            console.log("Admin data stored successfully");

            const queryParams = `?email=${encodeURIComponent(adminData.email)}&name=${encodeURIComponent(adminData.name)}&adminID=${encodeURIComponent(adminData.adminID)}&location=${encodeURIComponent(adminData.location)}&mobileNumber=${encodeURIComponent(adminData.mobile)}`;
            return res.redirect(`/welcome_admin.html${queryParams}`);
        } else {
            await db.collection('login_details').insertOne(userData);
            console.log("User data stored successfully");
        }
        const queryParams = `?email=${encodeURIComponent(userData.email)}&name=${encodeURIComponent(userData.name)}&location=${encodeURIComponent(userData.location)}&mobileNumber=${encodeURIComponent(userData.mobile)}`;
        return res.redirect(`/welcome.html${queryParams}`);
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Failed to sign up. Please try again later.');
    }
});

// User login endpoint
app.post("/user_login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.collection('login_details').findOne({ "email": email, "password": password });
        console.log(user)
        if (user) {
            const queryParams = `?email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}&location=${encodeURIComponent(user.location)}&mobileNumber=${encodeURIComponent(user.mobile)}`;
            res.redirect(`/welcome.html${queryParams}`);
        } else {
            res.send("Invalid Login Credentials");
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Failed to log in. Please try again later.');
    }
});

// Admin login endpoint
app.post("/admin_login", async (req, res) => {
    try {
        const { adminID, admin_name, password } = req.body;
        const admin = await db.collection('admin_details').findOne({ adminID });

        if (admin && admin.username === admin_name && admin.password === password) {
            const queryParams = `?email=${encodeURIComponent(admin.email)}&name=${encodeURIComponent(admin.name)}&adminID=${encodeURIComponent(admin.adminID)}&location=${encodeURIComponent(admin.location)}&mobileNumber=${encodeURIComponent(admin.mobile)}`;
            return res.redirect(`/welcome_admin.html${queryParams}`);
        } else {
            res.send("Invalid Login Credentials");
        }
    } catch (error) {
        console.error('Error logging in as admin:', error);
        res.status(500).send('Failed to log in. Please try again later.');
    }
});

// Forgot password endpoint
app.post("/forgot-password", async (req, res) => {
    try {
        const { forgotemail, password1 } = req.body;
        const user = await db.collection('login_details').findOne({ email: forgotemail });

        if (user && user.password1 === password1) {
            const queryParams = `?email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}&location=${encodeURIComponent(user.location)}&mobileNumber=${encodeURIComponent(user.mobile)}`;
            res.redirect(`/welcome.html${queryParams}`);
        } else {
            res.status(401).send("Invalid credentials or user not found.");
        }
    } catch (error) {
        console.error('Error processing forgot password request:', error);
        res.status(500).send('Internal Server Error. Please try again later.');
    }
});

//animal  count endpoint
app.post("/add-animals", async (req, res) => {
    try {
        const { animalName, species, count } = req.body;
        const add_animals = {
            animalName: animalName,
            species: species,
            count: parseInt(count, 10)
        };
        await db.collection('animal_details').insertOne(add_animals);
        console.log(add_animals);
        res.status(200).send('Animal added successfully');
    } catch (error) {
        console.error('Error processing animal count request:', error);
        if (!res.headersSent) {
            res.status(500).send('Internal Server Error. Please try again later.');
        }
    }
});


// Update animal endpoint
app.put("/update-animal/:id", async (req, res) => {
    const { id } = req.params;
    const { animalName, species, count } = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
    }

    try {
        const updatedAnimal = {
            animalName,
            species,
            count: parseInt(count, 10)
        };

        await db.collection('animal_details').updateOne({ _id: new ObjectId(id) }, { $set: updatedAnimal });
        res.status(200).send('Animal updated successfully');
    } catch (error) {
        console.error('Error updating animal:', error);
        res.status(500).send('Internal Server Error. Please try again later.');
    }
});

// Delete animal endpoint
app.delete("/delete-animal/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
    }
    try {
        // await db.collection('animal_details').deleteOne({ _id: new ObjectId(id) });
        // res.status(200).send('Animal deleted successfully');
        const result = await db.collection('animal_details').deleteOne({ _id: new ObjectId(id) });
        console.log(result)
        if (result.deletedCount === 1) {
            res.status(200).send('Animal deleted successfully');
        } else {
            res.status(404).send('Animal not found');
        }
    } catch (error) {
        console.error('Error deleting animal:', error);
        res.status(500).send('Internal Server Error. Please try again later.');
    }
});

// Report sighting endpoint
app.post("/sightings/report-sighting", upload.single('uploadPic'), async (req, res) => {
    try {
        const { userName, userEmail, sightingDate, latitude, longitude, placeName, comments } = req.body;
        const imagePath = `/uploads/${req.file.filename}`;
        const sightingData = {
            name: userName,
            email: userEmail,
            date: sightingDate,
            imagePath,
            latitude,
            longitude,
            location: placeName,
            comments
        };

        await db.collection('sighting_details').insertOne(sightingData);
        console.log(sightingData);
        console.log("Sighting report stored in database!");

        // Send SMS notification to users matching the sighting location
        // const sightings = await db.collection('sighting_details').find({ name: userName }).toArray();
        const sightings = await db.collection('sighting_details').findOne({ location: placeName });
        const users = await db.collection('login_details').find({ location: placeName }).toArray();
        users.forEach(async user => {
            await twilioClient.messages.create({
                body: `Hello ${user.name}, there has been an animal sighting at ${sightings.location} on ${sightings.date}.`,
                from: '+13204296656', // Replace with your Twilio phone number
                to: `+91${user.mobile}`
            });
        });

        res.status(200).send("Sighting reported successfully!");
    } catch (error) {
        console.error('Error reporting sighting:', error);
        res.status(500).send('Failed to report sighting. Please try again later.');
    }
});

// This will render view.ejs from the views directory
// app.get('/count', (req, res) => {
//     res.render('count');
// });
// Example of fetching animal data and rendering in Express route
app.get('/count', async (req, res) => {
    try {
        const animals = await db.collection('animal_details').find().toArray();
        res.render('count', { animals });
    } catch (error) {
        console.error('Error fetching animals:', error);
        if (!res.headersSent) {
            res.status(500).send('Failed to fetch animals. Please try again later.');
        }
    }
});

// Get sightings endpoint
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/sightings", async (req, res) => {
    try {
        const reports = await db.collection('sighting_details').find().toArray();
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching sightings:', error);
        res.status(500).send('Failed to fetch sightings. Please try again later.');
    }
});

// Default route
app.get("/", (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
