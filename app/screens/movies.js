import React, { Component, PropTypes } from 'react';
import {
  Button,
  View,
  Text,
  ListView,
  FlatList,
  Picker,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getState, setMovies } from '../redux/modules/movies';
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
  moviesState: getState(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setMovies,
}, dispatch);


class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: false,
      filterOptions: {
        order: 'desc',
        sort: 'popularity',
        releaseYear: 2017,
      },
    };

    this._renderItem = this._renderItem.bind(this);
    this.fetchData = debounce(this.fetchData, 500, { leading: false }).bind(this);
    this.searchMovies = this.searchMovies.bind(this);
    this.discoverMovies = debounce(this.discoverMovies, 100, { leading: false }).bind(this);
  }


  componentWillMount() {
    this.discoverMovies();

    console.log('nav state', this.props.navigation.state);
    this.props.navigation.setParams({
      showSearch: false,
      showMenu: false,
    });
  }

  searchMovies(event) {
    this.fetchData(`/search/movie?query=${event.text}`);
  }

  discoverMovies() {
    this.fetchData(`/discover/movie?sort_by=${this.state.filterOptions.sort}.${this.state.filterOptions.order}`);
    console.log('discover');
  }

  fetchData(url) {
    fetch(`${API}${url}&${API_KEY}`)
      .then(res => res.json())
      .then(({ results }) => {
        this.props.setMovies({ data: results });
      })
      .catch((err) => { console.log(err); });
  }

  _renderItem({ item }) {
    return (
      <View style={styles.movieListItem}>
        <ImageListItem
          imageURL={`${IMAGE_PATH}${item.poster_path}`}
          onPress={() => this.props.navigation.navigate('Movie', { movieID: item.id, movieTitle: item.title })}
        />
      </View>
    );
  }

  render() {
    console.log('filterOptions', this.props);

    const showMenu = (this.props.navigation.state.params === undefined) ? false :
                     (this.props.navigation.state.params.showMenu === true);
    const showSearch = (this.props.navigation.state.params === undefined) ? false :
                     (this.props.navigation.state.params.showSearch === true);

    const MenuContent = () => (
      <View style={styles.menuContainer}>
        <Text style={styles.menuText}>Order</Text>
        <Picker
          selectedValue={this.state.filterOptions.order}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({
              filterOptions: {
                ...this.state.filterOptions,
                order: itemValue,
              },
            });

            this.discoverMovies();
          }}
          style={{ flex: 1 }}
        >
          <Picker.Item label="Descending" value="desc" />
          <Picker.Item label="Ascending" value="asc" />
        </Picker>
        <Text style={styles.menuText}>Sort</Text>
        <Picker
          selectedValue={this.state.filterOptions.sort}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({
              filterOptions: {
                ...this.state.filterOptions,
                sort: itemValue,
              },
            });

            this.discoverMovies();
          }}
          style={{ flex: 1 }}
        >
          <Picker.Item label="Popularity" value="popularity" />
          <Picker.Item label="Revenue" value="revenue" />
          <Picker.Item label="Vote Count" value="voteCount" />
          <Picker.Item label="Release Date" value="releaseDate" />
        </Picker>
      </View>
    );

    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 3 },
    };
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Drawer
        type="overlay"
        content={<MenuContent />}
        open={showMenu}
        tapToClose
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
      >
        <View style={styles.container}>
          <AnimatedView
            show={showSearch}
            pointerEvents={showSearch ? 'auto' : 'none'}
          >
            <View style={styles.searchBar}>
              <TextInput
                style={{ height: 20, maxWidth: '50%', marginLeft: '25%' }}
                placeholder="Search movies.."
                returnKeyType={'search'}
                onSubmitEditing={event => this.searchMovies(event.nativeEvent)}
                keyboardType={'default'}
              />
            </View>
          </AnimatedView>
          <Button onPress={() => console.log(this.props)} title="open close" />
          <View style={styles.content}>
            <FlatList
              numColumns={3}
              data={this.props.moviesState.movies}
              keyExtractor={(item, index) => item.id}
              renderItem={this._renderItem}
            />
          </View>
        </View>
      </Drawer>
    );
  }
}

Movies.propTypes = propTypes;
Movies.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
