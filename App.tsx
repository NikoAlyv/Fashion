import React from 'react';
import Router from './src/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Toast} from './src/components/Toast';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Toast />
      <Router />
    </SafeAreaProvider>
  );
}

export default gestureHandlerRootHOC(App);
