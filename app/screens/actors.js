import React, { Component, PropTypes } from 'react';
import {
  Button,
  View,
  Text,
  ListView,
  FlatList,
  Picker,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getState, setActors } from '../redux/modules/actors';
import { debounce } from 'lodash';
import Drawer from 'react-native-drawer';
import ImageListItem from '../components/image-list-item';
import AnimatedView from '../components/AnimatedView/animated-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDD0C',
    height: '100%',
  },

  content: {

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

  menuContainer: {
    flex: 1,
  },

  menuText: {
    fontSize: 20,
  },

  searchBar: {
    flex: 1,
    justifyContent: 'center',
  },
});

const API_KEY = 'api_key=4b6d8afeccb259c60ee50fdf3fd76a53';
const API = 'https://api.themoviedb.org/3';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w92/';

const propTypes = {};

const defaultProps = {};

const mapStateToProps = state => ({
  actorsState: getState(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setActors,
}, dispatch);


class Actors extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this._renderItem = this._renderItem.bind(this);
    this.fetchData = debounce(this.fetchData, 500, { leading: false }).bind(this);
    this.searchActors = this.searchActors.bind(this);
    this.discoverActors = debounce(this.discoverActors, 100, { leading: false }).bind(this);
  }


  componentWillMount() {
    this.discoverActors();

    console.log('nav state', this.props.navigation.state);
  }

  searchActors(event) {
    this.fetchData(`/search/person?query=${event.text}`);
  }

  discoverActors() {
    this.fetchData('/person/popular?');
  }

  fetchData(url) {
    fetch(`${API}${url}&${API_KEY}`)
      .then(res => res.json())
      .then(({ results }) => {
        this.props.setActors({ data: results });
      })
      .catch((err) => { console.log(err); });
  }

  _renderItem({ item }) {
    return (
      <View style={styles.movieListItem}>
        <ImageListItem
          imageURL={`${IMAGE_PATH}${item.profile_path}`}
          onPress={() => this.props.navigation.navigate('Actor', { actorID: item.id, actorName: item.name })}
        />
        <Text style={{ fontSize: 14, textAlign: 'center' }}>{item.name}</Text>
      </View>
    );
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const showSearch = (this.props.navigation.state.params === undefined) ? false :
                     (this.props.navigation.state.params.showSearch === true);

    return (
      <View style={styles.container}>
        <AnimatedView
          show={showSearch}
          pointerEvents={showSearch ? 'auto' : 'none'}
        >
          <View style={styles.searchBar}>
            <TextInput
              style={{ height: 20, maxWidth: '50%', marginLeft: '25%' }}
              placeholder="Search actors.."
              returnKeyType={'search'}
              onSubmitEditing={event => this.searchActors(event.nativeEvent)}
              keyboardType={'default'}
            />
          </View>
        </AnimatedView>
        <Button onPress={() => console.log(this.props)} title="open close" />
        <View style={styles.content}>
          <FlatList
            numColumns={3}
            data={this.props.actorsState.actors}
            keyExtractor={(item, index) => item.id}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

Actors.propTypes = propTypes;
Actors.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
