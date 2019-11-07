import ELanguageCode from '../i18n/LanguageCode';

type I18nRegistry = {
    languageCode: ELanguageCode;
    texts: Record<string, string>;
};

export default I18nRegistry;
