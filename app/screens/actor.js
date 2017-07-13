import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import ActorContent from '../navigators/actor-navigator';

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

function getAgeString(birthDate, deadDate) {
  const curDate = new Date();
  const curYear = curDate.getFullYear();

  if (deadDate !== null) {
    return (`Died at age ${(parseInt((deadDate.substr(0, 4))) - parseInt((birthDate.substr(0, 4))))}.`);
  }
  return (`${(parseInt(curYear)) - (parseInt((birthDate.substr(0, 4))))} years old.`);
}

class Actor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: {},
      images: [],
    };
  }

  componentWillMount() {
    fetch(`${API}/person/${this.props.navigation.state.params.actorID}?${API_KEY}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          actor: res,
        });
      })
      .catch((err) => { console.log(err); });

    fetch(`${API}/person/${this.props.navigation.state.params.actorID}/images?${API_KEY}`)
        .then(res => res.json())
        .then(({ profiles }) => {
          this.setState({
            images: profiles,
          });
        })
        .catch((err) => { console.log(err); });
  }


  render() {
    if (Object.getOwnPropertyNames(this.state.actor).length === 0) {
      return null;
    }

    const imgKey = 0;
    console.log(this.state.actor);
    console.log(this.state.images);
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Swiper
            width={100}
            height={130}
            showsPagination={false}
          >
            {this.state.images.map(image => (
              <Image
                source={{ uri: `${IMAGE_PATH}${image.file_path}` }}
                resizeMode="contain"
                style={styles.movieCover}
                key={(imgKey + 1)}
              />
            ))}
          </Swiper>
          <View style={styles.movieDetails}>
            <Text style={{ fontSize: 18, paddingBottom: 5 }}>
              {this.state.actor.name}
            </Text>
            <Text style={{ fontSize: 14, color: '#9f8b0c', fontWeight: '400' }}>
              {`${this.state.actor.birthday} ${(this.state.actor.deathday === null) ? '' : `- ${this.state.actor.deathday}`}`}
            </Text>
            <Text style={{ fontSize: 14, color: '#9f8b0c', fontWeight: '400', paddingBottom: 10 }}>
              {`${getAgeString(this.state.actor.birthday, this.state.actor.deathday)}`}
            </Text>
            <Text style={{ fontSize: 14, color: '#9f8b0c', fontWeight: '400', paddingBottom: 5 }}>
              {`${this.state.actor.place_of_birth}`}
            </Text>
          </View>
        </View>
        <ActorContent screenProps={{ images: this.state.images, biography: this.state.actor.biography }} />
      </View>
    );
  }
}

Actor.propTypes = propTypes;
Actor.defaultProps = defaultProps;

export default Actor;
