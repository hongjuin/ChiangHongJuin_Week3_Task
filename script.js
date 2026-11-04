// Find the dark-mode button in the HTML
const themeButton = document.getElementById("themeButton");

// Listen for a click on the button
themeButton.addEventListener("click", function () {

    // Add or remove the dark-mode class on the page body
    document.body.classList.toggle("dark-mode");

    // Check whether dark mode is currently enabled
    const darkModeEnabled = document.body.classList.contains("dark-mode");

    // Change the button text based on the current mode
    if (darkModeEnabled) {
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }
});
