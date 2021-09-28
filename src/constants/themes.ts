import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    configureFonts,
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { Fonts } from 'react-native-paper/lib/typescript/types';

const fontConfig: { ios: Fonts, android: Fonts } = {
    ios: {
        regular: {
            fontFamily: 'Rubik_400Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Rubik_700Bold',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Rubik_300Light_Italic',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'Rubik_400Regular_Italic',
            fontWeight: 'normal',
        },
    },
    android: {
        regular: {
            fontFamily: 'Rubik_400Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Rubik_700Bold',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Rubik_300Light_Italic',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'Rubik_400Regular_Italic',
            fontWeight: 'normal',
        },
    }
}


const themes = {
    light: {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            accent: '#bc4598',
        },
        fonts: configureFonts(fontConfig),
    },
    dark: {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            accent: '#bc4598',
        },
        fonts: configureFonts(fontConfig),
    },
};




export default themes;