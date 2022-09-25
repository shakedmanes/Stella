import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import Colors from "../constants/Colors";

export interface IconButtonProps {
    iconName: React.ComponentProps<typeof FontAwesome>['name'];
    size: 'small' | 'medium' | 'large';
    color: string;
    rounded?: boolean;
    onPress: () => void;
}

const mapIconSizeToNumber = {
    small: 15,
    medium: 30,
    large: 50,
};


export default function IconButton(props: IconButtonProps) {
    const { iconName = "play", size = 'medium', color = 'purple', rounded = true, onPress = () => { } } = props;

    let buttonStyle: any = [
        styles.button,
        (styles as any)[`button${size[0].toLocaleUpperCase()}${size.slice(1)}`],
        (styles as any)[`roundedButton${size[0].toLocaleUpperCase()}${size.slice(1)}`]
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            activeOpacity={0.5}
        >
            <FontAwesome
                style={styles.icon}
                name={iconName}
                size={mapIconSizeToNumber[size]}
                color={color}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.secondaryBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLarge: {
        height: 150,
        width: 150,
    },
    buttonMedium: {
        height: 75,
        width: 75,
    },
    buttonSmall: {
        height: 40,
        width: 40,
    },
    roundedButtonLarge: {
        borderRadius: 150,
    },
    roundedButtonMedium: {
        borderRadius: 75,
    },
    roundedButtonSmall: {
        borderRadius: 30,
    },
    icon: {
        textShadowColor: 'black',
        textShadowOpacity: 2,
        textShadowRadius: 8,
        textShadowOffset: {
            width: 1,
            height: 5,
        },
    }
});
