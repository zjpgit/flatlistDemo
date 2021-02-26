import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Video from 'react-native-video';

class VideoPage extends React.PureComponent{
    private uri = 'https://vd1.bdstatic.com/mda-hexnfica0fzu4yfs/hd/mda-hexnfica0fzu4yfs.mp4?playlist=%5B%22hd%22%5D&auth_key=1558260801-0-0-732b4a74bc5054aaf63c2d56e757685f&bcevod_channel=searchbox_feed&pd=bjh&abtest=all';
    render(){
        return(
          <View style={styles.container}>
            <Video
              source={{uri: this.uri}}
              style={styles.backgroundVideo}
              resizeMode='contain'
            />
          </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default VideoPage;