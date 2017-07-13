import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  PixelRatio,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import YouTube from 'react-native-youtube';
import MovieOverview from '../components/MovieOverview/movie-overview';
import MovieContent from '../navigators/movie-navigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContent: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 5,
    backgroundColor: '#FFDD0C',
  },
  movieCover: {
    width: 100,
    height: 130,
    paddingRight: 8,
  },
  movieDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  overviewContent: {

  },
});

const API_KEY = 'api_key=4b6d8afeccb259c60ee50fdf3fd76a53';
const API = 'https://api.themoviedb.org/3';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w92';

const propTypes = {};

const defaultProps = {};

function getBudgetString(budgetCount) {
  const budgetNumber = parseInt(budgetCount);
  const budgetString = budgetNumber.toString();

  if (budgetNumber < 1000) {
    return `${budgetString}`;
  } else if (budgetNumber > 1000 && budgetNumber < 10000) {
    return `${budgetString.substr(0, 0)}K`;
  } else if (budgetNumber > 10000 && budgetNumber < 100000) {
    return `${budgetString.substr(0, 1)}.${budgetString.substr(2, 1)}K`;
  } else if (budgetNumber > 100000 && budgetNumber < 1000000) {
    return `${budgetString.substr(0, 3)}.${budgetString.substr(3, 1)}K`;
  } else if (budgetNumber > 1000000 && budgetNumber < 10000000) {
    return `${budgetString.substr(0, 1)}.${budgetString.substr(1, 1)}M`;
  } else if (budgetNumber > 10000000 && budgetNumber < 100000000) {
    return `${budgetString.substr(0, 2)}.${budgetString.substr(5, 1)}M`;
  } else if (budgetNumber > 100000000 && budgetNumber < 1000000000) {
    return `${budgetString.substr(0, 3)}.${budgetString.substr(6, 1)}M`;
  }
  return 'failed';
}

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      videos: [],
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
    };
  }

  componentWillMount() {
    fetch(`${API}/movie/${this.props.navigation.state.params.movieID}?${API_KEY}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          movie: res,
        });
      })
      .catch((err) => { console.log(err); });

    fetch(`${API}/movie/${this.props.navigation.state.params.movieID}/videos?${API_KEY}`)
        .then(res => res.json())
        .then(({ results }) => {
          this.setState({
            videos: results,
          });
        })
        .catch((err) => { console.log(err); });
  }


  render() {
    if (Object.getOwnPropertyNames(this.state.movie).length === 0) {
      return null;
    }

    console.log(this.state.movie);
    console.log(this.state.videos);

    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Image
            style={styles.movieCover}
            source={{ uri: `${IMAGE_PATH}${this.state.movie.poster_path}` }}
            resizeMode="contain"
          />
          <View style={styles.movieDetails}>
            <Text style={{ fontSize: 18, paddingBottom: 5 }}>
              {this.state.movie.title}
            </Text>
            <ScrollView style={{ paddingBottom: 5, flex: 0.8, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 14, color: '#9f8b0c', fontWeight: '400' }}>
                {`by ${this.state.movie.production_companies.map(item => ` ${item.name}`)}`}
              </Text>
            </ScrollView>
            <Text style={{ paddingBottom: 3, fontSize: 14, color: '#9f8b0c', fontWeight: '400' }}>
              {`${(this.state.movie.budget !== 0) ? `Budget: $${getBudgetString(this.state.movie.budget)}` : ''}`}
            </Text>
            <View style={{ width: '40%' }}>
              <StarRating
                maxStars={5}
                rating={(this.state.movie.vote_average / 2)}
                starSize={15}
                disabled
                emptyStarColor="black"
              />
            </View>
          </View>
        </View>
        <MovieContent screenProps={{ videos: this.state.videos.map(vid => `${vid.key}`), overview: this.state.movie.overview }} />
      </View>
    );
  }
}

Movie.propTypes = propTypes;
Movie.defaultProps = defaultProps;

export default Movie;
