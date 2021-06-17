/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const CLASSES = {
    ACTIVE: 'landing__active',
    ACTIVE_SELECTOR: '.landing__active',
    SECTION: '[data-nav]',
    NAVIGATION_WRAPPER: '#navbar__list',
    MENU_LINK: 'menu__link',
    HEADER_SELECTOR: '.page__header',
};

const header = document.querySelector(CLASSES.HEADER_SELECTOR);
const sections = document.querySelectorAll(CLASSES.SECTION);
const navigationWrapper = document.querySelector(CLASSES.NAVIGATION_WRAPPER);
let activeSection = document.querySelector(CLASSES.ACTIVE_SELECTOR);


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const isAtTheTopOfTheViewPort = (element) => {
    const { top } = element.getBoundingClientRect();
    const { height: headerHeight } = header.getBoundingClientRect();
    return window.scrollY >= ((window.scrollY + top) - headerHeight);
};



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavigation = () => {
    const fragment = document.createDocumentFragment();

    sections.forEach(function (section) {
        const { nav: text } = section.dataset;
        const li = document.createElement('li');
        li.textContent = text;
        li.classList.add(CLASSES.MENU_LINK);
        fragment.appendChild(li);
    });

    navigationWrapper.appendChild(fragment);
};


// Add class 'active' to section when near top of viewport
const activateCurrentSection = () => {
    for (let i = 0; i < sections.length; i++) {
        if (sections[i] === activeSection) {
            continue;
        }
        const isActive = isAtTheTopOfTheViewPort(sections[i]);
        sections[i].classList.toggle(CLASSES.ACTIVE, isActive);
        if (isActive) {
            activeSection.classList.toggle(CLASSES.ACTIVE);
            activeSection = sections[i];
        }
    }
    return activeSection;
};

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
document.addEventListener('DOMContentLoaded', () => {
    buildNavigation();
});

// Scroll to section on link click


// Set sections as active
window.addEventListener('scroll', () => {
    activateCurrentSection();
});

