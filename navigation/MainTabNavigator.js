import React from 'react';
import { Platform, View, Image,Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Walkthrough from '../screens/Walkthrough';
import Learn from '../screens/LearnScreen';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    return <Text style={{textAlign: 'center', fontSize: 12, marginBottom: 2, color: focused ? '#db2b2b' : '#757e8dff' }}>HR{"\n"}Questions</Text>;
  },
  tabBarIcon: ({ focused }) => (
    <View>
      {focused ? (
        <Image
          source={
            require('../assets/images/computer.png')
          }
          style={{ height: 25, width: 25, marginBottom: -1 }}
        />

      ) : (
          <Image
            source={
              require('../assets/images/computer.png')
            }
            style={{ height: 25, width: 25, marginBottom: -1 }}
          />

        )}
    </View>
  ),
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      height: 64,
    },
    style: {
      height: 64,
      backgroundColor: '#F7F7F8'
    },
  }
};

const LearnStack = createStackNavigator({
  Learn: Learn,
});

LearnStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    return <Text style={{textAlign: 'center', fontSize: 13, marginBottom: 2, color: focused ? '#db2b2b' : '#757e8dff' }}>IT{"\n"}Questions</Text>;
  },
  tabBarIcon: ({ focused }) => (
    <View>
      {focused ? (
        <Image
          source={
            require('../assets/images/business.png')
          }
          style={{ height: 25, width: 25, marginBottom: -1 }}
        />

      ) : (
          <Image
            source={
              require('../assets/images/business.png')
            }
            style={{ height: 25, width: 25, marginBottom: -1 }}
          />

        )}
    </View>
  ),
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      height: 64,
    },
    style: {
      height: 64,
      backgroundColor: '#F7F7F8'
    },
  }
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    return <Text style={{textAlign: 'center', fontSize: 12, marginBottom: 2, color: focused ? '#db2b2b' : '#757e8dff' }}>Ask to{"\n"}Employeer</Text>;
  },
  tabBarIcon: ({ focused }) => (
    <View>
      {focused ? (
        <Image
          source={
            require('../assets/images/right.png')
          }
          style={{ height: 25, width: 25, marginBottom: -1 }}
        />

      ) : (
          <Image
            source={
              require('../assets/images/right.png')
            }
            style={{ height: 25, width: 25, marginBottom: -1 }}
          />

        )}
    </View>
  ),
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      height: 64,
    },
    style: {
      height: 64,
      backgroundColor: '#F7F7F8'
    },
  }
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    return <Text style={{textAlign: 'center', fontSize: 12, marginBottom: 2, color: focused ? '#ff3333' : '#757e8dff' }}>Best Company{"\n"}Questions</Text>;
  },
  tabBarIcon: ({ focused }) => (
    <View>
      {focused ? (
        <Image
          source={
            require('../assets/images/star.png')
          }
          style={{ height: 25, width: 25, marginBottom: -1 }}
        />

      ) : (
          <Image
            source={
              require('../assets/images/star.png')
            }
            style={{ height: 25, width: 25, marginBottom: -1 }}
          />

        )}
    </View>
  ),
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      height: 64,
    },
    style: {
      height: 64,
      backgroundColor: '#F7F7F8'
    },
  }
};

export default createBottomTabNavigator({
  LearnStack,
  HomeStack,
  LinksStack,
  SettingsStack,
});
