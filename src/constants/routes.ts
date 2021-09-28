// Navigation Routes Configuration
import i18n from 'i18n-js';

export default {
    ROUTES: {
        MAIN_SCREEN: {
            key: 'MAIN_SCREEN',
            title: () => i18n.t('MainScreen.title'),
            icon: 'home'
        },
        SETTINGS_SCREEN: {
            key: 'SETTINGS_SCREEN',
            title: () => i18n.t('SettingsScreen.title'),
            icon: 'cog'
        }
    },
    DEFAULT_ROUTE: 'MAIN_SCREEN'
}