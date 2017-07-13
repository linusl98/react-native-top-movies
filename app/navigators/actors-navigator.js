import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Actors from '../screens/actors';
import Actor from '../screens/actor';


const style = {
  backgroundColor: '#FFDD0C',
};

export const StackNavRouteConfig = {
  Actors: {
    screen: Actors,
    navigationOptions: ({ navigation }) => ({
      title: 'Actors',
      headerStyle: style,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.setParams({
            showMenu: !navigation.state.params.showMenu,
            showSearch: navigation.state.params.showSearch,
          })}
        >
          <Image
            source={require('../icons/menu.png')}
            style={{ width: 50, height: 30 }}
          />
        </TouchableOpacity>
        ),
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.setParams({
            showMenu: navigation.state.params.showMenu,
            showSearch: !navigation.state.params.showSearch,
          })}
        >
          <Image
            source={require('../icons/search.png')}
            style={{ width: 30, height: 30, marginRight: 12 }}
          />
        </TouchableOpacity>
        ),
    }),
  },
  Actor: {
    screen: Actor,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.actorName,
      headerStyle: style,
    }),
  },
};

export const StackNavNavigatorConfig = {
  headerMode: 'float',
  initialRouteParams: {
    showSearch: false,
  },
  navigationOptions: ({ navigation }) => ({
    title: 'Default',
    headerStyle: style,
  }),
};

export default StackNavigator(StackNavRouteConfig, StackNavNavigatorConfig);
