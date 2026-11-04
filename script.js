// ------------------------------
// 1. Dark / light mode
// ------------------------------

const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

// Apply the saved theme when the page loads.
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
        themeIcon.textContent = "☀";
        themeText.textContent = "Light mode";
        themeButton.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeIcon.textContent = "☾";
        themeText.textContent = "Dark mode";
        themeButton.setAttribute("aria-label", "Switch to dark mode");
    }
}

updateThemeButton();

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    // Remember the user's selected theme in this browser.
    localStorage.setItem(
        "portfolio-theme",
        isDarkMode ? "dark" : "light"
    );

    updateThemeButton();
});


// ------------------------------
// 2. Project category filtering
// ------------------------------

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(
    ".project-gallery .project-card"
);

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.filter;

        // Update which filter button looks selected.
        filterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        // Show cards matching the selected category.
        projectCards.forEach(function (card) {
            const cardCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === cardCategory
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});


// ------------------------------
// 3. Mobile navigation menu
// ------------------------------

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {
    const menuIsOpen = navMenu.classList.toggle("show-menu");

    menuButton.setAttribute("aria-expanded", menuIsOpen);
    menuButton.setAttribute(
        "aria-label",
        menuIsOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the mobile menu after selecting a navigation link.
const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show-menu");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});


// ------------------------------
// 4. Project detail modal
// ------------------------------

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalCloseButton = document.getElementById("modalCloseButton");

const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLearning = document.getElementById("modalLearning");

// Project details shown when the user clicks "View Details".
const projectInformation = {
    measurement: {
        category: "Machine Vision",
        title: "Image Measurement with OpenCV",
        description:
            "This project explored how computer vision can be used to identify objects and estimate their dimensions from images. The workflow included image preprocessing, contour analysis, and measurement logic.",
        learning: [
            "Loading and processing images with OpenCV.",
            "Using image thresholding and contour detection.",
            "Understanding how pixel measurements relate to real-world dimensions.",
            "Recognizing the limitations of measurement without camera calibration."
        ]
    },

    yolo: {
        category: "Machine Vision",
        title: "YOLO Household Object Detection",
        description:
            "A basic object-detection project using a YOLO model trained to recognize three selected household object classes. It introduced the process of preparing data, training a model, and testing predictions.",
        learning: [
            "Preparing and labeling an object-detection dataset.",
            "Training a YOLO model using a dataset workflow.",
            "Interpreting predicted classes and confidence scores.",
            "Testing model performance on new images."
        ]
    },

    led: {
        category: "Embedded Systems",
        title: "LED Control with Arduino & STM32",
        description:
            "A microcontroller exercise involving LED output control and basic program logic. The work helped build familiarity with GPIO and the relationship between software instructions and hardware behavior.",
        learning: [
            "Configuring digital input and output pins.",
            "Writing conditional logic for hardware behavior.",
            "Understanding basic microcontroller programming.",
            "Debugging software and hardware connections."
        ]
    },

    reaction: {
        category: "Embedded Systems",
        title: "LED Reaction Game",
        description:
            "A simple interactive game where the user responds to an LED signal. It uses timing, input detection, and program conditions to create a reaction-based activity.",
        learning: [
            "Reading button input from a microcontroller.",
            "Using timing and delay logic.",
            "Building a simple game state flow.",
            "Combining input and output components."
        ]
    }
};

// Attach a click handler to each project detail button.
const projectDetailButtons = document.querySelectorAll(
    ".project-details-button"
);

projectDetailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const projectKey = button.dataset.project;
        const project = projectInformation[projectKey];

        // Stop if no matching project information exists.
        if (!project) {
            return;
        }

        modalCategory.textContent = project.category;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        // Clear the old list before adding this project's learning points.
        modalLearning.innerHTML = "";

        project.learning.forEach(function (learningPoint) {
            const listItem = document.createElement("li");
            listItem.textContent = learningPoint;
            modalLearning.appendChild(listItem);
        });

        projectModal.showModal();
    });
});

// Close the modal using either close button.
modalClose.addEventListener("click", function () {
    projectModal.close();
});

modalCloseButton.addEventListener("click", function () {
    projectModal.close();
});

// Close the modal if the user clicks outside its content.
projectModal.addEventListener("click", function (event) {
    if (event.target === projectModal) {
        projectModal.close();
    }
});


// ------------------------------
// 5. Automatically update footer year
// ------------------------------

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();
