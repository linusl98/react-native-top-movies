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
import { TabNavRouteConfig, TabNavNavigatorConfig } from '../../navigators/tab-navigator';


export const AppNavigator = TabNavigator(TabNavRouteConfig, TabNavNavigatorConfig);


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
