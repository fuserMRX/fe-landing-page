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
    ACTIVE_HEADER_SECTION: 'menu__active',
};

const header = document.querySelector(CLASSES.HEADER_SELECTOR);
const sections = document.querySelectorAll(CLASSES.SECTION);
const navigationWrapper = document.querySelector(CLASSES.NAVIGATION_WRAPPER);
let activeSection = document.querySelector(CLASSES.ACTIVE_SELECTOR);
let activeHeaderSection = null;
let oldScroll = null;


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

const isScrollingUp = () => {
    const isScrollUp = oldScroll > window.scrollY;
    oldScroll = window.scrollY;
    return isScrollUp;
};

const isInViewPort = (element) => {
    const { top, bottom } = element.getBoundingClientRect();
    return ((top < window.innerHeight) && bottom > 1);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavigation = () => {
    const fragment = document.createDocumentFragment();

    sections.forEach((section) => {
        const { nav: text } = section.dataset;
        const id = section.getAttribute('id');
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', `#${id}`);
        a.textContent = text;
        li.appendChild(a);
        li.classList.add(CLASSES.MENU_LINK);
        fragment.appendChild(li);
    });

    navigationWrapper.appendChild(fragment);
    activateHeaderSection(activeSection);
};


// Add an active state to your navigation items when a section is in the viewport.
const activateHeaderSection = (section) => {
    const id = section.getAttribute('id');
    const destinationHeaderSection = document.querySelector(`a[href^='#${id}']`);
    if ((activeHeaderSection !== destinationHeaderSection) && (activeHeaderSection !== null)) {
        activeHeaderSection.parentNode.classList.remove(CLASSES.ACTIVE_HEADER_SECTION);
    }
    activeHeaderSection = destinationHeaderSection;
    activeHeaderSection.parentNode.classList.add(CLASSES.ACTIVE_HEADER_SECTION);
};


const activateCurrentSection = () => {
    const isScrollUp = isScrollingUp();
    for (let i = 0; i < sections.length; i++) {
        var c = isInViewPort(sections[i]);
        var t = isAtTheTopOfTheViewPort(sections[i]);
        const isActive = isInViewPort(sections[i]) && isAtTheTopOfTheViewPort(sections[i]);
        if (!isActive) {
            continue;
        }
        const currentSectionNumber = +sections[i].dataset.nav.slice(-1);
        const activeSectionNumber = +activeSection.dataset.nav.slice(-1);
        const isPassCondition = isScrollUp ? (activeSectionNumber < currentSectionNumber) : (currentSectionNumber < activeSectionNumber);
        if (sections[i] === activeSection || isPassCondition) {
            continue;
        }

        // Add class 'active' to section when near top of viewport
        sections[i].classList.toggle(CLASSES.ACTIVE, isActive);

        if (isActive) {
            activeSection.classList.remove(CLASSES.ACTIVE);
            activeSection = sections[i];
            activateHeaderSection(activeSection);
        }
    }
    return activeSection;
};


// Scroll to anchor ID using scrollTO event
navigationWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    if (id) {
        const destinationSection = document.querySelector(`${id}`);
        destinationSection.scrollIntoView({ behavior: 'smooth'});
    }
});


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
document.addEventListener('DOMContentLoaded', () => {
    buildNavigation();
});


// Set sections as active
window.addEventListener('scroll', () => {
    setTimeout(() => {activateCurrentSection()}, 0);
});

