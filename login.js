// Robust Login Function
function login() {
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        // Clear any previous messages
        message.textContent = "";

        // Basic input validation
        if (!username || !password) {
            message.style.color = "red";
            message.textContent = "Please enter both username and password!";
            return;
        }

        // Updated credentials to match the username and password in the HTML
        if (username === "Admin" && password === "Admin@2002") {
            // Set login state in localStorage
            localStorage.setItem('isAdminLoggedIn', 'true');

            // Style successful login message
            message.style.color = "green";
            message.textContent = "Login Successful!";

            // Redirect based on previous page or default
            setTimeout(() => {
                // Check if there's a stored redirect page in sessionStorage
                const redirectPage = sessionStorage.getItem('redirectPage');
                console.log(redirectPage);
                // Clear the stored redirect page
                sessionStorage.removeItem('redirectPage');

                // Use window.location.replace to prevent adding to browser history
                window.location.replace(redirectPage);
            }, 1000);
        } else {
            // Style error message
            message.style.color = "red";
            message.textContent = "Invalid Username or Password!";
        }
    } catch (error) {
        console.error("Login error:", error);
        const message = document.getElementById("message");
        message.style.color = "red";
        message.textContent = "An unexpected error occurred. Please try again.";
    }
}

// Add login protection for admin pages
document.addEventListener('DOMContentLoaded', () => {
    // Check login status when admin pages load
    function protectAdminPage() {
        try {
            const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

            // If not logged in, store current page and redirect to login
            if (!isLoggedIn) {
                // Store the current page to redirect back after login
                sessionStorage.setItem('redirectPage', window.location.pathname);

                // Use window.location.replace to prevent adding to browser history
                window.location.replace('/login.html');
            }
        } catch (error) {
            console.error("Page protection error:", error);
            // Fallback redirect
            window.location.replace('/login.html');
        }
    }

    // Setup logout functionality
    function setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                try {
                    // Remove login state
                    localStorage.removeItem('isAdminLoggedIn');
                    // Redirect to login page
                    window.location.replace('/login.html');
                } catch (error) {
                    console.error("Logout error:", error);
                    window.location.replace('/login.html');
                }
            });
        }
    }

    // Protect admin pages
    const protectedPages = [
        '/upload_notes.html',
        '/research-admin.html'
    ];

    const currentPath = window.location.pathname;
    const redirectPage = sessionStorage.getItem('redirectPage');
    console.log(redirectPage);
    if (protectedPages.some(page => currentPath.includes(page))) {
        protectAdminPage();
    }

    // Setup logout if logout button exists
    if (document.getElementById('logoutBtn')) {
        setupLogout();
    }
});

// Additional error handling for script loading
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
});