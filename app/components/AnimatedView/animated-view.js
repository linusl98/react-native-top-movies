import React, { Component, PropTypes } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Easing,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const propTypes = {};

const defaultProps = {};


class AnimatedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };

    this.showView = this.showView.bind(this);
    this.hideView = this.hideView.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.show ? this.showView() : this.hideView();
    console.log(nextProps.show);
  }

  showView() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 700,
    }).start();
  }

  hideView() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 700,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim,
          position: 'absolute',
          zIndex: 20,
          backgroundColor: '#FFDD0C',
          width: '100%',
          height: 50,
          borderRadius: 30,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderWidth: 5,
          borderTopWidth: 0,
          borderColor: '#424242',
        }}
        pointerEvents={this.props.pointerEvents}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

AnimatedView.propTypes = propTypes;
AnimatedView.defaultProps = defaultProps;

export default AnimatedView;
