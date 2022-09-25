import { types } from "mobx-state-tree";

import config, { AlarmSoundTypes, MotionSensitivityLevels } from "../../constants/config";

const backwardAlarmSoundTypes = Object.keys(AlarmSoundTypes).reduce((acc: any, key: any) => { acc[(AlarmSoundTypes as any)[key]] = key; return acc; }, {});
const backwardMotionSensitivityLevels = Object.keys(MotionSensitivityLevels).reduce((acc: any, key: any) => { acc[(MotionSensitivityLevels as any)[key]] = key; return acc; }, {});

const Settings = types.model({
    alarmSoundType: types.optional(
        types.enumeration(Object.keys(AlarmSoundTypes)),
        backwardAlarmSoundTypes[AlarmSoundTypes.Alarm1]
    ),
    alarmSoundVolume: types.optional(types.number, 1),
    sensitivity: types.optional(
        types.enumeration(Object.keys(MotionSensitivityLevels)),
        backwardMotionSensitivityLevels[MotionSensitivityLevels.MEDIUM]
    ),
}).actions(self => ({
    setAlarmSoundType(alarmSoundType: AlarmSoundTypes) {
        self.alarmSoundType = alarmSoundType;
    },

    setSensitivityLevel(sensitivityLevel: MotionSensitivityLevels) {
        self.sensitivity = sensitivityLevel;
    },

    setAlarmSoundVolume(alarmSoundVolume: number) {
        self.alarmSoundVolume = alarmSoundVolume;
    }
}));

export default Settings;