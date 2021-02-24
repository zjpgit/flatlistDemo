import React from 'react';
import Home from '../Home';
import Map from '../Map';
import {
  Image,
  StyleSheet
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const tabs = {
  home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ tintColor, focused }) => (
        <Image source={!focused ? require('../assert/home.png') : require('../assert/home_selected.png')} style={styles.image} resizeMode='contain' />
      )
    }
  },
  map: {
    screen: Map,
    navigationOptions: {
      tabBarLabel: '地图',
      tabBarIcon: ({ tintColor, focused }) => (
        <Image source={!focused ? require('../assert/map.png') : require('../assert/map_selected.png')} style={styles.image} resizeMode='contain' />
      )
    }
  }
}

const TabNavigator = createBottomTabNavigator(tabs, {
  tabBarOptions: {
    activeTintColor: '#2dceff',
    inactiveTintColor: '#8a8a8a'
  },
  initialRouteName: 'home'
})

const AppContainer = createAppContainer(TabNavigator);
export default AppContainer;
/*
export const AppContainer = () => {
  return (
    <AppBottomNavigator.Navigator
      initialRouteName='home'
      activeColor="#2dceff"
      inactiveColor="#8a8a8a"
      barStyle={styles.barStyle}
    >
      <AppBottomNavigator.Screen name='home' component={Home} options={{
        tabBarLabel: '首页',
        tabBarIcon: ({ focused }) => (
          <Image source={!focused ? require('../assert/home.png') : require('../assert/home_selected.png')} style={styles.image} resizeMode='contain' />
        ),
      }} />
      <AppBottomNavigator.Screen name='map' component={Map} options={{
        tabBarLabel: '地图',
        tabBarIcon: ({ focused }) => (
          <Image source={!focused ? require('../assert/map.png') : require('../assert/map_selected.png')} style={styles.image} resizeMode='contain' />
        ),
      }} />
      <AppBottomNavigator.Screen name='mine' component={Mine} options={{
        tabBarLabel: '我的',
        tabBarIcon: ({ focused }) => (
          <Image source={!focused ? require('../assert/mine.png') : require('../assert/mine_selected.png')} style={styles.image} resizeMode='contain' />
        ),
      }} />
    </AppBottomNavigator.Navigator>
  )
}
*/

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24
  },
  barStyle: {
    backgroundColor: 'white',
  }
})