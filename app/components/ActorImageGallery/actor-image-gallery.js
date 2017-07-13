import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';

import ImageListItem from '../image-list-item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    flex: 1,
    padding: 5,
    width: 100,
    height: 100,
  },
  movieList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  movieListItem: {
    width: '33%',
    height: 171.45,
    padding: 8,
  },
});

const propTypes = {};

const defaultProps = {};

const IMAGE_PATH = 'https://image.tmdb.org/t/p/w92';

const imgKey = 0;

class ActorImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item }) {
    return (
      <View style={styles.movieListItem}>
        <ImageListItem
          imageURL={`${IMAGE_PATH}${item.file_path}`}
          onPress={() => console.log('click')}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          numColumns={3}
          data={this.props.screenProps.images}
          keyExtractor={(item, index) => item.poster_path}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

ActorImageGallery.propTypes = propTypes;
ActorImageGallery.defaultProps = defaultProps;

export default ActorImageGallery;
