import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Movies from '../screens/movies';
import Movie from '../screens/movie';
import Actor from '../screens/actor';


const style = {
  backgroundColor: '#FFDD0C',
};

export const StackNavRouteConfig = {
  Movies: {
    screen: Movies,
    navigationOptions: ({ navigation }) => ({
      title: 'Movies',
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
  Movie: {
    screen: Movie,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.movieTitle,
      headerStyle: style,
    }),
  },
};

export const StackNavNavigatorConfig = {
  headerMode: 'float',
  initialRouteParams: {
    showMenu: false,
    showSearch: false,
  },
  navigationOptions: ({ navigation }) => ({
    title: 'Default',
    headerStyle: style,
  }),
};

export default StackNavigator(StackNavRouteConfig, StackNavNavigatorConfig);
