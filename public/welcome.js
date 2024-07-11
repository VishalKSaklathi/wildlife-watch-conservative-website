document.addEventListener("DOMContentLoaded", () => {
    const options = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, options);

    const sections = document.getElementsByClassName('hide');

    Array.from(sections).forEach((section) => {
        observer.observe(section);
    });
});
