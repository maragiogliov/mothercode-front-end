import TranslationTo from '../components/Translation/TranslationTo';

const Translation = () => {
    const { language, setLanguage, setFallbackLanguage, t } = TranslationTo();

    return (
        <>
            <div>{language}</div>

            <button onClick={() => setLanguage('de')}></button>
            <button onClick={() => setLanguage('en')}>English</button>
        </>
    );
};

export default Translation;
