import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './routes';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 4000));
        await SplashScreen.hideAsync();
      } catch (erro) {
        console.error(erro);
      } 
    }
    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}