import React from 'react';
import { Theme } from 'react-native-paper/lib/typescript/types';
const AnimatedSplash = require("react-native-animated-splash-screen").default;

import styles from './Loading.styles';
const logo = require("../../../assets/splash.png");

interface LoadingProps {
    isLoaded: boolean;
    theme: Theme
}

const Loading = (props: React.PropsWithChildren<LoadingProps>) => {

    return (
        <AnimatedSplash
            translucent={true}
            isLoaded={props.isLoaded}
            logoImage={logo}
            backgroundColor={props.theme.colors.surface}
            logoHeight={150}
            logoWidth={150}
        >
            {props.children}
        </AnimatedSplash>
    );
};

export default Loading;