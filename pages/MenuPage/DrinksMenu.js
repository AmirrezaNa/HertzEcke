const translations = {
    en: {
        navHome: 'Home',
        navDrinksMenu: 'Drinks Menu',
        navFoodMenu: 'Food menu',
        navEvents: 'Events',
        navContact: 'Contact us',

        menuEyebrow: 'Hertz Ecke menu',
        menuHeroTitle: 'Good drinks. Good food. Good vibes.',
        menuHeroText: 'Explore our drinks by category and jump smoothly to the section you want.',
        menuHeroButton: 'View categories',

        catSparkling: 'Sparkling & Aperitif',
        catWine: 'Wine',
        catBeer: 'Beer',
        catModern: 'Modern Classics',
        catSours: 'Sours & Fizzes',
        catCaribbean: 'Caribbean & Fancy',
        catDriver: 'Alcohol-free cocktails',
        catSpirits: 'Spirits',
        catSoft: 'Soft drinks',
        catHot: 'Hot drinks',
        catLemonades: 'Lemonades',
        catIcedTea: 'Iced Tea',

        icedTea1: 'green tea · lime juice · sugar syrup · cucumber slices',
        icedTea2: 'black tea · mango purée · passion fruit purée · lime juice',
        icedTea3: 'black tea · peach syrup · orange juice · lemon juice',

        whiteWine: 'White wine',
        roseWine: 'Rosé wine',
        redWine: 'Red wine',
        openGlass: 'open',
        bottle: 'bottle',
        draftBeer: 'On tap',
        bottleBeer: 'Bottled beer',
        brandyCognac: 'Brandy & Cognac',
        bitterLiqueur: 'Bitter & Liqueur',
        hotChocolate: 'Hot chocolate',
        teaTypes: 'Tea varieties',
        teaNote: 'Fresh tea with mint, ginger, lemon...',

        footerHoursTitle: 'Working hours',
        footerHoursWeek: 'Monday - Thursday: 11:00 - 22:00',
        footerHoursWeekend: 'Friday - Saturday: 11:00 - 02:00',
        footerHoursSunday: 'Sunday: 12:00 - 22:00',
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

        menuEyebrow: 'Speisekarte von Hertz Ecke',
        menuHeroTitle: 'Gute Getränke. Gutes Essen. Gute Stimmung.',
        menuHeroText: 'Entdecken Sie unsere Getränke nach Kategorien und springen Sie direkt zum gewünschten Bereich.',
        menuHeroButton: 'Kategorien ansehen',

        catSparkling: 'Schaumwein & Aperitif',
        catWine: 'Wein',
        catBeer: 'Bier',
        catModern: 'Moderne Klassiker',
        catSours: 'Sours & Fizzes',
        catCaribbean: 'Karibik & Fancy Cocktails',
        catDriver: 'Alkoholfreie Cocktails',
        catSpirits: 'Spirituosen',
        catSoft: 'Erfrischungsgetränke',
        catHot: 'Heißgetränke',
        catLemonades: 'Limonaden',
        catIcedTea: 'Eistee',

        icedTea1: 'Grüner Tee · Limettensaft · Zuckersirup · Gurkenscheiben',
        icedTea2: 'Schwarzer Tee · Mangopüree · Maracujapüree · Limettensaft',
        icedTea3: 'Schwarzer Tee · Pfirsichsirup · Orangensaft · Zitronensaft',

        whiteWine: 'Weißwein',
        roseWine: 'Roséwein',
        redWine: 'Rotwein',

        openGlass: 'offen',
        bottle: 'Flasche',

        draftBeer: 'Vom Fass',
        bottleBeer: 'Flaschenbier',

        brandyCognac: 'Brandy & Cognac',
        bitterLiqueur: 'Bitter & Liköre',

        hotChocolate: 'Heiße Schokolade',

        teaTypes: 'Teesorten',
        teaNote: 'Frischer Tee mit Minze, Ingwer, Zitrone...',

        footerHoursTitle: 'Öffnungszeiten',
        footerHoursWeek: 'Montag – Donnerstag: 11:00 – 22:00',
        footerHoursWeekend: 'Freitag – Samstag: 11:00 – 02:00',
        footerHoursSunday: 'Sonntag: 12:00 – 22:00',

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
            element.textContent = translations[language][key];
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