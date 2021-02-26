import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';

interface IState {
  isLoading: boolean;
  isPlay: boolean;
  paused: boolean;
}

class VideoPage extends React.PureComponent<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isPlay: true,
      paused: false
    }
  }

  private uri = 'https://vd1.bdstatic.com/mda-hexnfica0fzu4yfs/hd/mda-hexnfica0fzu4yfs.mp4?playlist=%5B%22hd%22%5D&auth_key=1558260801-0-0-732b4a74bc5054aaf63c2d56e757685f&bcevod_channel=searchbox_feed&pd=bjh&abtest=all';

  play = () => {
    this.setState({
      isPlay: true,
      paused: false
    })
  }

  onLoad = (data: any) => {
    console.log(data);
    this.setState({
      paused: true,
      isLoading: false,
      isPlay: false
    })
  }

  onEnd = (data: any) => {
    console.log('end: ', data);
  }

  onPress = () => {
    console.log('pressed');
  }

  render() {
    const { isLoading, isPlay, paused } = this.state;
    return (
      <View style={styles.container}>
        {
          (!!isLoading) && (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size='large' color='#2CB044' />
            </View>
          )
        }
        <Video
          source={{ uri: this.uri }}
          style={styles.backgroundVideo}
          resizeMode='contain'
          paused={paused}
          onLoad={this.onLoad}
          onEnd={this.onEnd}
          onPress={this.onPress}
        />
        {
          (!isPlay) && (
            <View style={styles.videoDefault}>
              <TouchableOpacity style={styles.btnPlay} onPress={this.play}>
                <Image source={require('../assert/transmit.png')} resizeMode='contain' style={styles.imagePlay} />
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  videoDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  imageDefault: {
    position: 'absolute',
    width: '100%'
  },
  btnPlay: {
    zIndex: 3,
    position: 'absolute',
    width: 48,
    height: 48
  },
  imagePlay: {
    position: 'absolute',
    width: 48,
    height: 48
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
});

export default VideoPage;