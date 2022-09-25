import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { observer } from 'mobx-react-lite';
import { Audio } from 'expo-av';

import IconButton from '../components/IconButton';
import MotionDetector from '../components/MotionDetector';
import { IRootStore, useStores } from '../store';
import { AlarmSoundTypes } from '../constants/config';
import { AssetContext } from '../contexts/AssetContext';

interface HomeScreenProps {
  store: IRootStore
}


const HomeScreen = observer((props: HomeScreenProps) => {
  const { settings } = useStores();

  const [checkingMovement, setCheckingMovement] = useState(false);
  const [motionDetectionAvailable, setMotionDetectionAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset, playAsset] = useContext(AssetContext);


  useEffect(() => {
    const checkForMotionDetection = async () => {
      setMotionDetectionAvailable(await DeviceMotion.isAvailableAsync());
      setIsLoading(false);
    };

    checkForMotionDetection();
  }, []);

  const handlePress = () => {
    setCheckingMovement((prevCheckingMovement) => !prevCheckingMovement);
  };

  const handleMovement = async () => {
    console.log('Movement detected');
    await playAsset();
  };

  const renderScreen = () => {
    if (isLoading) {
      return (
        <Text style={styles.title}>
          Checking for motion detection option...
        </Text>
      );
    } else if (!motionDetectionAvailable) {
      return (
        <Text style={styles.title}>
          Motion detection is not available on this device.
        </Text>
      );
    }

    return renderActionContainer();
  }

  const renderActionContainer = () => {
    if (checkingMovement) {
      return (
        <>
          <Text style={styles.title}>Watching for movement...</Text>
          <IconButton
            iconName="stop"
            size="large"
            color="red"
            onPress={handlePress}
          />
        </>
      );
    }

    return (
      <>
        <Text style={styles.title}>Press to start watching for movement</Text>
        <IconButton
          iconName="play"
          size="large"
          color="green"
          onPress={handlePress}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <MotionDetector
        isWatching={checkingMovement}
        onMovement={handleMovement}
        sensitivity={settings.sensitivity}
      />
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default HomeScreen;