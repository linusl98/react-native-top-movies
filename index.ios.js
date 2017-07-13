/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppProvider from './app/index';

AppRegistry.registerComponent('firstApp', () => AppProvider);
