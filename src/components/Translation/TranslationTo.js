import LocalStorage from './LocalStorage';
import * as translations from 'translations';

const TranslationTo = () => {
    const [language, setLanguage] = LocalStorage('language', 'en');
    const [fallbackLanguage, setFallbackLanguage] = LocalStorage(
        'fallbackLanguage',
        'en'
    );

    const translate = (key) => {
        const keys = key.split('.');

        return (
            getNestedTranslation(language, keys) ??
            getNestedTranslation(fallbackLanguage, keys) ??
            key
        );
    };

    return {
        language,
        setLanguage,
        fallbackLanguage,
        setFallbackLanguage,
        t: translate,
    };
};

function getNestedTranslation(language, keys) {
    return keys.reduce((obj, key) => {
        return obj?.[key];
    }, translations[language]);
}

export default TranslationTo;
