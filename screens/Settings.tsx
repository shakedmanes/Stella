import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Audio } from 'expo-av';
import SelectDropdown from 'react-native-select-dropdown';

import { IRootStore, useStores } from '../store';
import { AlarmSoundTypes, MotionSensitivityLevels } from '../constants/config';
import IconButton from '../components/IconButton';
import { AssetContext } from '../contexts/AssetContext';

interface SettingsScreenProps {
  store: IRootStore
}


const Settings = observer((props: SettingsScreenProps) => {
  const { settings } = useStores();
  const [asset, setAsset, playAsset] = useContext(AssetContext);

  const playSound = async () => {
    await playAsset();
  }

  const handlePlaySound = async () => {
    console.log('play sound', settings.alarmSoundType);
    await playSound();
  }

  return (
    <>
      <View>
        <View className="md:grid md:grid-cols-3 md:gap-6">
          <View className="mt-10 md:col-span-2 md:mt-0">
            <View className="shadow sm:overflow-hidden sm:rounded-md">
              <View className="space-y-6 px-4 py-5 sm:p-6">
                <View className="grid grid-cols-3 gap-6">
                  <View className="col-span-3 sm:col-span-2">
                    <Text className="block text-sm font-medium text-cyan-600">
                      Sensitivity
                    </Text>
                    <View className="mt-1 flex rounded-md">
                      <SelectDropdown
                        defaultValue={[settings.sensitivity, (MotionSensitivityLevels as any)[settings.sensitivity]]}
                        data={Object.entries(MotionSensitivityLevels)}
                        onSelect={(selectedItem: [string, typeof MotionSensitivityLevels], index) => {
                          (settings as any).setSensitivityLevel(selectedItem[0]);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          return selectedItem[0]
                        }}
                        rowTextForSelection={(item, index) => {
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return item[0]
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View>
                  <Text className="block text-sm font-medium text-cyan-600">
                    Alarm Sound
                  </Text>
                  <View className="mt-1 flex-row space-x-6 space-y-1">
                    <View>
                      <SelectDropdown
                        defaultValue={[settings.alarmSoundType, (AlarmSoundTypes as any)[settings.alarmSoundType]]}
                        data={Object.entries(AlarmSoundTypes)}
                        onSelect={(selectedItem: [string, typeof AlarmSoundTypes], index) => {
                          (settings as any).setAlarmSoundType(selectedItem[0]);
                          setAsset(selectedItem[1] || AlarmSoundTypes.Alarm1);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          return selectedItem[0]
                        }}
                        rowTextForSelection={(item, index) => {
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return item[0]
                        }}
                      />
                    </View>
                    <View>
                      <IconButton
                        rounded
                        iconName="play"
                        size='small'
                        color='lightblue'
                        onPress={handlePlaySound}
                      />
                    </View>
                  </View>
                  <Text className="mt-2 text-sm text-gray-500">
                    Press the button to play the alarm sound.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
});

export default Settings;