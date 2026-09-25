const translations = {
    en: {
        navHome: 'Home',
        navDrinksMenu: 'Drinks Menu',
        navFoodMenu: 'Food Menu',
        navEvents: 'Events',
        navContact: 'Contact us',
        navImpressum: 'Law Notice',

        menuEyebrow: 'Hertz Ecke menu',
        menuHeroTitle: 'Good drinks. Good food. Good vibes.',
        menuHeroText: 'Explore our menu by category and jump smoothly to the section you want.',
        menuHeroButton: 'View categories',

        catSides: 'Sides',
        catSnacks: 'Snacks & Starters',
        catLoadedFries: 'Loaded Fries',
        catCroques: 'Croques',
        catPizzaburger: 'Pizza Burgers',
        catSalate: 'Salads',
        catBeefburger: 'Beef Burgers',
        catChickenburger: 'Chicken Burger',
        catDesserts: 'Desserts',
        catDips: 'Dips & Sauces',

        beefBurgerNote: 'All beef burgers are served with French fries.',
        chickenBurgerNote: 'Served with French fries.',

        footerHoursTitle: 'Working hours',
        footerHoursWeek: 'Monday - Thursday: 12:00 - 23:00',
        footerHoursWeekend: 'Friday - Saturday: Open end',
        footerContactTitle: 'Contact',
        footerPhone: 'Phone:',
        footerEmail: 'E-Mail:',
        footerAddress: 'Address:',
        footerAddressValue: 'Heinrich-Hertz-Straße 102',
        footerLinksTitle: 'Links',
        footerWebsiteWolt: 'Order from Wolt',
        footerWebsiteLieferando: 'Order from Lieferando'
    },
    de: {
        navHome: 'Startseite',
        navDrinksMenu: 'Getränkemenü',
        navFoodMenu: 'Speisemenü',
        navEvents: 'Veranstaltungen',
        navContact: 'Kontakt',
        navImpressum: 'Impressum',

        menuEyebrow: 'Speisekarte von Hertz Ecke',
        menuHeroTitle: 'Gute Getränke. Gutes Essen. Gute Stimmung.',
        menuHeroText: 'Entdecken Sie unsere Speisen nach Kategorien und springen Sie direkt zum gewünschten Bereich.',
        menuHeroButton: 'Kategorien ansehen',

        catSides: 'Sides',
        catSnacks: 'Snacks & Starter',
        catLoadedFries: 'Loaded Fries',
        catCroques: 'Croques',
        catPizzaburger: 'Pizzaburger',
        catSalate: 'Salate',
        catBeefburger: 'Beef Burger',
        catChickenburger: 'Chicken Burger',
        catDesserts: 'Desserts',
        catDips: 'Dips & Saucen',

        beefBurgerNote: 'Alle Beef Burger werden mit Pommes frites serviert.',
        chickenBurgerNote: 'Mit Pommes frites.',

        footerHoursTitle: 'Öffnungszeiten',
        footerHoursWeek: 'Sonntag – Donnerstag: 12:00 – 23:00',
        footerHoursWeekend: 'Freitag – Samstag: Offenes Ende',

        footerContactTitle: 'Kontakt',
        footerPhone: 'Telefon:',
        footerEmail: 'E-Mail:',
        footerAddress: 'Adresse:',
        footerAddressValue: 'Heinrich-Hertz-Straße 102',

        footerLinksTitle: 'Links',
        footerWebsiteWolt: 'Bei Wolt bestellen',
        footerWebsiteLieferando: 'Bei Lieferando bestellen'
    }
};

const languageSelect = document.getElementById('languageSelect');
const translatableElements = document.querySelectorAll('[data-i18n]');
const categoryButtons = document.querySelectorAll('.category-button');
const menuSections = document.querySelectorAll('.menu-section');

function setLanguage(language) {
    translatableElements.forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });
    document.documentElement.lang = language;
    localStorage.setItem('hertzEckeLanguage', language);
}

function setActiveCategory(sectionId) {
    categoryButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.target === sectionId);
    });
}

languageSelect.addEventListener('change', (event) => setLanguage(event.target.value));

categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);
        if (!target) return;

        const headerOffset = 170;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        setActiveCategory(button.dataset.target);
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
        }
    });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

menuSections.forEach((section) => observer.observe(section));

const savedLanguage = localStorage.getItem('hertzEckeLanguage') || 'de';
languageSelect.value = savedLanguage;
setLanguage(savedLanguage);