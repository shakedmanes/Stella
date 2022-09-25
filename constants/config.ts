export enum MotionSensitivityLevels {
    LOW = '2',
    MEDIUM = '1',
    HIGH = '0.5'
}

export enum AlarmSoundTypes {
    Alarm1 = '../assets/sounds/Alarm1.mp3',
    Alarm2 = '../assets/sounds/Alarm2.mp3',
    Alarm3 = '../assets/sounds/Alarm3.mp3',
    Alarm4 = '../assets/sounds/Alarm4.mp3'
}

export const ROOT_STATE_STORAGE_KEY = 'rootState';

export default {
    alarmSoundTypes: AlarmSoundTypes,
    sensitivity: MotionSensitivityLevels,
}