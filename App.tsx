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
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen'
import { ProvideAuth } from './src/functions/UserAuth';
import Route from './src/navigate/Route';

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  });
  return (
    <ProvideAuth>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
      <Route />
    </ProvideAuth>
  );

}

export default App;
