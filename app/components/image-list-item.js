import React, { PropTypes } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: '100%',
  },
});

const propTypes = {
  imageURL: PropTypes.string,
  onPress: PropTypes.func,
};

const defaultProps = {};

function ImageListItem({ imageURL, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

ImageListItem.propTypes = propTypes;
ImageListItem.defaultProps = defaultProps;

export default ImageListItem;
