import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AssetContextProvider } from './contexts/AssetContext';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AssetContextProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AssetContextProvider>
      </SafeAreaProvider>
    );
  }
}
