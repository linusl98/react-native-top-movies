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
    padding: 5,
  },
});

const propTypes = {};

const defaultProps = {};

function MovieOverview(props) {
  console.log(props);
  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontWeight: '400', fontSize: 14, color: '#4f565d' }}>
        {props.screenProps.overview}
      </Text>
    </ScrollView>
  );
}

MovieOverview.propTypes = propTypes;
MovieOverview.defaultProps = defaultProps;

export default MovieOverview;
