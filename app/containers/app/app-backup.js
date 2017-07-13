import React, { PureComponent, PropTypes } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMenuState, getState } from '../../redux/modules/movies';
import Movies from '../../screens/movies';
import Movie from '../../screens/movie';


const style = {
  backgroundColor: '#FFDD0C',
};

export const RouteConfig = {
  Main: {
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
            source={require('../../icons/menu.png')}
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
            source={require('../../icons/search.png')}
            style={{ width: 30, height: 30, marginRight: 12 }}
          />
        </TouchableOpacity>
        ),
    }),
  },

  // {
  //   screen: Movies,
  //   navigationOptions: ({ navigation }) => ({
  //     title: 'Movies',
  //     headerStyle: style,
  //     headerLeft: (
  //       <TouchableOpacity
  //         onPress={() => navigation.setParams({
  //           showMenu: !navigation.state.params.showMenu,
  //           showSearch: navigation.state.params.showSearch,
  //         })}
  //       >
  //         <Image
  //           source={require('../../icons/menu.png')}
  //           style={{ width: 50, height: 30 }}
  //         />
  //       </TouchableOpacity>
  //     ),
  //     headerRight: (
  //       <TouchableOpacity
  //         onPress={() => navigation.setParams({
  //           showMenu: navigation.state.params.showMenu,
  //           showSearch: !navigation.state.params.showSearch,
  //         })}
  //       >
  //         <Image
  //           source={require('../../icons/search.png')}
  //           style={{ width: 30, height: 30, marginRight: 12 }}
  //         />
  //       </TouchableOpacity>
  //     ),
  //   }),
  // },
  Movie: {
    screen: Movie,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.movieTitle,
      headerStyle: style,
    }),
  },
};

export const NavigatorConfig = {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    title: 'Default',
    headerStyle: style,
  }),
};

export const AppNavigator = StackNavigator(RouteConfig, NavigatorConfig);

const mapStateToProps = state => ({
  nav: state.nav,
});


class App extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });

    return (
      <AppNavigator navigation={navigation} />
    );
  }
}


App.propTypes = {

};


export default connect(mapStateToProps)(App);
