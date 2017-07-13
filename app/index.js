import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import Store from './redux/store';
import App from './containers/app';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const propTypes = {};

const defaultProps = {};

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={Store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <App />
        </View>
      </Provider>
    );
  }
}

AppProvider.propTypes = propTypes;
AppProvider.defaultProps = defaultProps;

export default AppProvider;
