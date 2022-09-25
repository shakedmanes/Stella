import { useState, useEffect } from 'react';
import { useAssets } from 'expo-asset';
import { Audio } from 'expo-av';
import { AlarmSoundTypes } from '../constants/config';

const AssetsMap = {
    [AlarmSoundTypes.Alarm1]: 0,
    [AlarmSoundTypes.Alarm2]: 1,
    [AlarmSoundTypes.Alarm3]: 2,
    [AlarmSoundTypes.Alarm4]: 3,
};

export default function useAsset(asset = AlarmSoundTypes.Alarm1) {
    const [assets, error] = useAssets(
        [
            require('../assets/sounds/Alarm1.mp3'),
            require('../assets/sounds/Alarm2.mp3'),
            require('../assets/sounds/Alarm3.mp3'),
            require('../assets/sounds/Alarm4.mp3')
        ]
    );
    const [sound, setSound] = useState<Audio.Sound>();
    const [selectedAsset, setSelectedAsset] = useState(AssetsMap[asset]);

    useEffect(() => {
        return (
            sound ?
            () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            :
            undefined
        );
    }, [sound]);

    const playSound = async () => {
        if (assets) {
            const { sound } = await Audio.Sound.createAsync(
                assets[selectedAsset]
            );
            setSound(sound);

            await sound.playAsync();
        }
    }

    const setSelectedAssetHelper = (asset: AlarmSoundTypes) => {
        setSelectedAsset(AssetsMap[asset]);
    };

    if (!assets) {
        return [null, error];
    }

    return [assets[selectedAsset], setSelectedAssetHelper, playSound];
}
