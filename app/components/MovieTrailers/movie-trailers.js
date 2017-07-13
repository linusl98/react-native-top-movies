import React, { PropTypes, Component } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
import YouTube from 'react-native-youtube';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const YT_API_KEY = 'AIzaSyBpEkUX9_PUHXF1IsPbDIRaTLmZMrsMGWk';

const propTypes = {};

const defaultProps = {};

class MovieTrailers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <YouTube
          ref={(component) => { this._youTubeRef = component; }}
          videoIds={this.props.screenProps.videos}
          apiKey={YT_API_KEY}
          play={this.state.play}
          style={{
            height: PixelRatio.roundToNearestPixel(
              Dimensions.get('window').width / (16 / 9),
            ),
            alignSelf: 'stretch',
            marginVertical: 10,
          }}
        />
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <Button title="Previous" onPress={() => this._youTubeRef.previousVideo()} />
          <Button title="Play/Pause" onPress={() => this.setState({ play: !this.state.play })} />
          <Button title="Next" onPress={() => this._youTubeRef.nextVideo()} />
        </View>

      </View>
    );
  }
}

MovieTrailers.propTypes = propTypes;
MovieTrailers.defaultProps = defaultProps;

export default MovieTrailers;
