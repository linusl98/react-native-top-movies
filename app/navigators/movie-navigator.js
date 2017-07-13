import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MovieOverview from '../components/MovieOverview/movie-overview';
import MovieTrailers from '../components/MovieTrailers/movie-trailers';
import { TabNavigator } from 'react-navigation';


const styles = {
  tabBar: {
    backgroundColor: '#FFDD0C',
    height: 50,
  },
  tab: {
    height: '100%',
  },
  tabLabel: {
    fontSize: 15,
  },
};

export const TabNavRouteConfig = {
  OverviewTab: {
    screen: MovieOverview,
    navigationOptions: {
      title: 'Overview',
    },
  },
  TrailersTab: {
    screen: MovieTrailers,
    navigationOptions: {
      title: 'Trailers',
    },
  },
};

export const TabNavNavigatorConfig = {
  tabBarPosition: 'top',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    initialRouteName: 'OverviewTab',
    showIcon: false,
    style: styles.tarBar,
    tabStyle: styles.tab,
    labelStyle: styles.tabLabel,
    inactiveTintColor: '#616161',
    activeTintColor: 'black',
  },
  navigationOptions: {

  },
};

export default TabNavigator(TabNavRouteConfig, TabNavNavigatorConfig);
