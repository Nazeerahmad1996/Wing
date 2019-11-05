import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import Tabs from './MainTabNavigator';
import Walkthrough from '../screens/Walkthrough';
import Learn from '../screens/LearnScreen';
import Profile from '../screens/ProfileScreen';




const HomeNavigator = createStackNavigator({
    Walkthrough: {
        screen: Walkthrough
    },
    HomeScreen: {
        screen: HomeScreen
    },
    Learn: {
        screen: Learn
    },
    Profile: {
        screen: Profile
    },
    Tabs: {
        screen: Tabs,
    navigationOptions: ({ navigation }) => ({
        header: null,
    })
}
});

const App = createAppContainer(HomeNavigator);
export default App;
