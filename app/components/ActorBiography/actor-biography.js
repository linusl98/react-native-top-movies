import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const propTypes = {};

const defaultProps = {};

function ActorBiography(props) {
  return (
    <ScrollView style={{ padding: 5 }}>
      <Text style={{ fontWeight: '400', fontSize: 14, color: '#4f565d' }}>
        {props.screenProps.biography}
      </Text>
    </ScrollView>
  );
}

ActorBiography.propTypes = propTypes;
ActorBiography.defaultProps = defaultProps;

export default ActorBiography;
