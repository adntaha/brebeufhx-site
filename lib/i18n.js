// Global language management
const customComponents = ['faq-item', 'feature-card', 'navbar-component', 'stats-card', 'timeline-item'];

export function updateTextLanguage(element=document.body) {
    const language = document.documentElement.lang;

    let selectorPrefix = '';
    if (element === document.body) {
        selectorPrefix = customComponents.map(component => `:not(${component})`).join('');
    }

    // Update all elements with data-en and data-fr attributes that are not inside components
    element.querySelectorAll(`${selectorPrefix} [data-en][data-fr]`).forEach((element) => {
        const text = element.getAttribute(`data-${language}`);
        if (text) {
            element.innerHTML = text;
        }
    });
    
    // Update placeholders for input elements
    element.querySelectorAll(`${selectorPrefix} [data-en-placeholder][data-fr-placeholder]`).forEach((element) => {
        const placeholder = element.getAttribute(`data-${language}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });

    if (element === document.body) {
        // Update newsletter language preference
        // It doesn't exist in the components lol
        element.querySelector(`${selectorPrefix} [name="entry.854837853"]`).value = language === 'en' ? 'English' : 'Français';
    }
}

export function switchLanguage() {
    // Switch language from French to English and vice versa
    document.documentElement.lang = document.documentElement.lang === 'fr' ? 'en' : 'fr';

    // Update button text
    const langBtn = document.querySelector('#lang-btn');
    langBtn.textContent = document.documentElement.lang === 'en' ? '🇫🇷' : '🇺🇸';

    // Update all translatable elements
    updateTextLanguage();

    // Dispatch custom event for components
    document.dispatchEvent(new CustomEvent('languageChanged'));
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = navigator.language.split('-')[0] || 'en';
    updateTextLanguage();
});

// Event listener for language button
document.querySelector('#lang-btn').addEventListener('click', switchLanguage);

// Listen for language changes
document.addEventListener('languageChanged', (e) => {
    document.documentElement.lang = e.detail.language;
    updateTextLanguage();
});
