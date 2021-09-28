import i18n from 'i18n-js';

import config from '../constants/translations';
import en from './en';
import he from './he';



export const initializeTranslations = (currentLocale: string = config.LANGUAGUES.EN.value) => {
    i18n.translations = {
        he,
        en, 
    };

    i18n.locale = currentLocale;
    i18n.fallbacks = true;
};