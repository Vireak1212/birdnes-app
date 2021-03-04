/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  Platform,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Route from './src/navigate/Route';

declare const global: { HermesInternal: null | {} };

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  });
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <Route />
    </>
  );

}

export default App;
