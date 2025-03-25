const navToggler = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');
const overlay = document.querySelector('.overlay');

// Ensure the sidebar is always open
// aside.classList.add('open'); 

// Remove toggle functionality
navToggler.addEventListener('click', function () {
    aside.classList.add('open'); // Sidebar remains open
});

// Prevent overlay from closing sidebar
overlay?.addEventListener('click', function () {
    aside.classList.add('open'); // Sidebar remains open
});

// Ensure nav links do not close the sidebar
document.querySelectorAll('.nav li a').forEach(link => {
    link.addEventListener('click', function () {
        aside.classList.add('open'); // Sidebar remains open
    });
});
