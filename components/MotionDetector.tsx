import { useState, useEffect, useCallback } from "react";
import { Text, View } from "react-native";
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { MotionSensitivityLevels } from "../constants/config";

export interface MotionDetectorProps {
    onMovement: (motionMeasurement: DeviceMotionMeasurement) => void;
    sensitivity?: MotionSensitivityLevels;
    interval?: number;
    isWatching?: boolean;
}


export default function MotionDetector(props: MotionDetectorProps) {
    const { onMovement = () => { }, isWatching = false, sensitivity = parseInt(MotionSensitivityLevels.LOW), interval = 1000 } = props;

    const [deviceMotionMeasurement, setDeviceMotionMeasurement] = useState<DeviceMotionMeasurement | null>(null);
    const [lastAcceleration, setLastAcceleration] = useState<DeviceMotionMeasurement['acceleration'] | null>(null);
    const [isListenerStarted, setIsListenerStarted] = useState(false);

    const numSensitivity = typeof(sensitivity) === 'number' ? sensitivity : parseInt(MotionSensitivityLevels[sensitivity]);

    const updateMotionInterval = () => {
        DeviceMotion.setUpdateInterval(interval);
    };

    const deviceMotionListener = (motionMeasurement: DeviceMotionMeasurement) => {
        setDeviceMotionMeasurement(motionMeasurement);
    }

    const getDeviceMotionStatus = useCallback(() => {
        const { accelerationIncludingGravity } = deviceMotionMeasurement || { accelerationIncludingGravity: null };

        const motionDetected =
            accelerationIncludingGravity &&
            lastAcceleration &&
            (
                Math.abs(accelerationIncludingGravity.x - lastAcceleration.x) > numSensitivity ||
                Math.abs(accelerationIncludingGravity.y - lastAcceleration.y) > numSensitivity ||
                Math.abs(accelerationIncludingGravity.z - lastAcceleration.z) > numSensitivity
            );
            
        setLastAcceleration(accelerationIncludingGravity);

        return motionDetected;
    }, [deviceMotionMeasurement, lastAcceleration, sensitivity]);

    const registerMovementWatcher = () => {
        updateMotionInterval();
        DeviceMotion.addListener(deviceMotionListener);
    };

    const cleanupSubscriptions = () => {
        if (isListenerStarted) {
            DeviceMotion.removeAllListeners();
        }
    }

    useEffect(() => {
        if (isListenerStarted && !isWatching) {
            cleanupSubscriptions();
            setIsListenerStarted(false);
            setLastAcceleration(null);
            setDeviceMotionMeasurement(null);
        } else if (!isListenerStarted && isWatching) {
            setIsListenerStarted(true);
            registerMovementWatcher();
        }

        return cleanupSubscriptions;
    }, [isWatching]);

    useEffect(() => {
        if (deviceMotionMeasurement && getDeviceMotionStatus()) {
            onMovement(deviceMotionMeasurement);
        }
    }, [deviceMotionMeasurement, getDeviceMotionStatus, lastAcceleration]);

    return (
        <View>
            <Text style={{ fontSize: 22, color: 'white' }}>
                Rotation: {JSON.stringify(deviceMotionMeasurement)}
            </Text>
        </View>
    );
};