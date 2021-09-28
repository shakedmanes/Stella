import * as React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';

import { default as navigationConfig } from '../constants/routes';
import { MainScreen } from '../screens/Main';
import { SettingsScreen } from '../screens/Settings';

const MainNavigator = () => {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    Object.values(navigationConfig.ROUTES).map((route) => {
      return {
        ...route,
        title: route.title(),
      }
    })
  );
  

  const renderScene = BottomNavigation.SceneMap({
    [navigationConfig.ROUTES.MAIN_SCREEN.key]: MainScreen,
    [navigationConfig.ROUTES.SETTINGS_SCREEN.key]: SettingsScreen
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={theme.colors.primary}
      barStyle={{ backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border, borderTopWidth: 1 }}
    />
  );
};

export default MainNavigator;