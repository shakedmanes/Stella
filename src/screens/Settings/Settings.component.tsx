import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, List, Text, useTheme, Title, Subheading, Caption } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';


import styles from './Settings.styles';

const Settings = () => {
    const theme = useTheme();
    const [sensitivity, setSensitivity] = useState(0);

    const sensitivityLevels = 2;
    const sensitivityMap: {[key: number]: string} = {
        0: 'Low',
        1: 'Medium',
        2: 'High'
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <SafeAreaView>
                <Title style={{ fontFamily: theme.fonts.medium.fontFamily }}>Movement Detection</Title>
                <Divider />
                <View style={{ margin: 10 }}>
                    <Subheading>Sensitivity: {sensitivityMap[sensitivity]}</Subheading>
                    <Caption>Controls the sensitivity of the movement</Caption>
                </View>
                <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={sensitivityLevels}
                    thumbTintColor={theme.colors.primary}
                    minimumTrackTintColor={theme.colors.accent}
                    maximumTrackTintColor={theme.colors.primary}
                    onValueChange={setSensitivity}
                />
            </SafeAreaView>
        </SafeAreaView>
    );

};

export default Settings;