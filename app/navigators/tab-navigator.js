import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import MoviesNavigator from './movies-navigator';
import ActorsNavigator from './actors-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';


const style = {
  backgroundColor: '#FFDD0C',
};

export const TabNavRouteConfig = {
  MoviesTab: {
    screen: MoviesNavigator,
    navigationOptions: {
      title: 'Movies',
      tabBarIcon: ({ focused }) => (
        <Icon
          name="video-camera"
          size={25}
          color={focused ? 'black' : '#616161'}
        />
      ),
    },
  },
  ActorsTab: {
    screen: ActorsNavigator,
    navigationOptions: {
      title: 'Actors',
      tabBarIcon: ({ focused }) => (
        <Icon
          name="users"
          size={25}
          color={focused ? 'black' : '#616161'}
        />
      ),
    },
  },
};

export const TabNavNavigatorConfig = {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    style,
    inactiveTintColor: '#616161',
    activeTintColor: 'black',
  },
  navigationOptions: {

  },
};

// export default TabNavigator(TabNavRouteConfig, TabNavNavigatorConfig);
