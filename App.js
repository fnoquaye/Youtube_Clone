import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer,DefaultTheme,DarkTheme,useTheme} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';
import Constant from 'expo-constants'
import Home from './SRC/screens/Home'
import Search from './SRC/screens/Search'
import VideoPlayer from './SRC/screens/VideoPlayer'
import Explore from './SRC/screens/Explore'
import Suscribe from './SRC/screens/Suscribe'
import { reducer } from './SRC/reducers/reducer';
import {themeReducers} from './SRC/reducers/themeReducers'
import {Provider,useSelector} from 'react-redux'
import {createStore,combineReducers} from 'redux'

const customDarkTheme={
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    headerColor:"#404040",
    iconcolor:"white",
    tabIcon:"white"
  }
}

const customDefaultTheme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    headerColor:"white",
    iconcolor:"black",
    tabIcon:"red"
  }
}

const rooReducer = combineReducers({
     cardData:reducer, //[],
     myDarMode:themeReducers //false
})
const store = createStore(rooReducer)


const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

const RootHome = ()=>{
  const {colors} = useTheme()
  return(
    <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({  color }) => {
        let iconName;

        if (route.name === 'home') {
          iconName = 'home';
        } else if (route.name === 'explore') {
          iconName = 'explore';
        } else if (route.name === 'suscribe'){
          iconName = 'subscriptions'
        }

        // You can return any component that you like here!
        return <MaterialIcons name={iconName} size={32} color={color} />;
      },
      tabBarActiveTintColor: colors.tabIcon,
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tabs.Screen name="home" component={Home} />
      <Tabs.Screen name="explore" component={Explore} />
      <Tabs.Screen name="suscribe" component={Suscribe} />
    </Tabs.Navigator>
  )
}

export default App=()=>{
  return(
      <Provider store={store}>
    <Navigation />
  </Provider>
  )

}
export function Navigation() {

  let currentTheme = useSelector(state=>{
    return state.myDarMode
  })
  return (
  //<Provider store={store}>
   <NavigationContainer theme={currentTheme?customDarkTheme:customDefaultTheme}>
      <Stack.Navigator headerMode="none" >
         <Stack.Screen name="rootHome" component={RootHome} />
         <Stack.Screen name="Search" component={Search} />
         <Stack.Screen name="videoplayer" component={VideoPlayer} />
      </Stack.Navigator>
   </NavigationContainer>
  //</Provider>
  );
}


