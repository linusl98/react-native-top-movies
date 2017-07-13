import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActorBiography from '../components/ActorBiography/actor-biography';
import ActorImageGallery from '../components/ActorImageGallery/actor-image-gallery';
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
  BiographyTab: {
    screen: ActorBiography,
    navigationOptions: {
      title: 'Biography',
    },
  },
  GalleryTab: {
    screen: ActorImageGallery,
    navigationOptions: {
      title: 'Images',
    },
  },
};

export const TabNavNavigatorConfig = {
  tabBarPosition: 'top',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    initialRouteName: 'BiographyTab',
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
