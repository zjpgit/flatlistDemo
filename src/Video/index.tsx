import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import Video from 'react-native-video';
import Slider from 'react-native-slider';

const { scale, width } = Dimensions.get('window');
const whScale = width * scale / 1080;

interface IState {
  isLoading: boolean;
  showControl: boolean;
  isPlay: boolean;
  paused: boolean;
  videoWidth: number;
  videoHeight: number;
  duration: number;
  currentTime: number;
  sliderValue: number;
}

class VideoPage extends React.PureComponent<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      showControl: true,
      isPlay: true,
      paused: false,
      videoWidth: 0,
      videoHeight: 0,
      duration: 0,
      currentTime: 0,
      sliderValue: 0
    }
  }

  private uri = 'https://vd1.bdstatic.com/mda-hexnfica0fzu4yfs/hd/mda-hexnfica0fzu4yfs.mp4?playlist=%5B%22hd%22%5D&auth_key=1558260801-0-0-732b4a74bc5054aaf63c2d56e757685f&bcevod_channel=searchbox_feed&pd=bjh&abtest=all';
  private target = 0;

  onLoad = (data: any) => {
    console.log(data);
    let w = 0;
    let h = 0;
    let d = 0;
    if (data) {
      w = data['naturalSize']['width'];
      h = data['naturalSize']['height'];
      d = data['duration'];
      this.target = data['target'];
    }
    //console.log(w, ', ', h, ', ',whScale);
    this.setState({
      paused: true,
      isLoading: false,
      isPlay: false,
      videoWidth: w * whScale,
      videoHeight: h * whScale,
      duration: d
    })
  }

  onProgress = (e: any) => {
    console.log(e);
    let current = e['currentTime'];
    this.setState({
      currentTime: current,
      sliderValue: current
    })
  }

  onEnd = (data: any) => {
    if (data['target'] == this.target) {
      if (this.player) {
        this.player.seek(0);
      }
      let timeId = setTimeout(() => {
        clearTimeout(timeId);
        this.setState({
          isPlay: false,
          paused: true
        })
      }, 200)
    }
  }

  //格式化音乐播放的时间为0：00。借助onProgress的定时器调用，更新当前时间
  formatMediaTime = (time: number): string => {
    let minute = Math.floor(time / 60);
    let second = parseInt((time - minute * 60).toString());
    let minuteStr = minute >= 10 ? minute : "0" + minute;
    let secondStr = second >= 10 ? second : "0" + second;
    return minuteStr + ":" + secondStr;
  }

  // 移动滑块，改变视频播放进度
  customerSliderValue = (value: number) => {
    if (this.player) {
      this.player.seek(value);
    }
    this.setState({
      currentTime: value
    })
  }

  onPlayOrPause = () => {
    const { isPlay } = this.state;
    let play = isPlay ? false : true;
    let pause = isPlay ? true : false;
    this.setState({
      isPlay: play,
      paused: pause
    })
  }

  render() {
    const {
      isLoading,
      showControl,
      isPlay,
      paused,
      videoWidth,
      videoHeight,
      duration,
      currentTime,
      sliderValue
    } = this.state;
    return (
      <View style={styles.container}>
        {
          (!!isLoading) && (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator size='large' color='#2CB044' />
            </View>
          )
        }
        <TouchableWithoutFeedback onFocus={(e) => {
          console.log('focus on');
          this.setState({
            showControl: true
          })
        }} onBlur={() => {
          console.log('focus out');
          this.setState({
            showControl: false
          })
        }} onPress={this.onPlayOrPause}>
          <View style={[styles.viewVideo, { width: '100%', height: videoHeight, }]}>
            <Video
              ref={v => this.player = v}
              source={{ uri: this.uri }}
              style={{ width: videoWidth * whScale, height: videoHeight * whScale, backgroundColor: "#FFC1C1" }}
              resizeMode='cover'
              paused={paused}
              onLoad={this.onLoad}
              onEnd={this.onEnd}
              onProgress={this.onProgress}
            />
            {
              (showControl && !isLoading) && (
                <View style={{ width: '96%', position: 'absolute', bottom: 9, zIndex: 8, backgroundColor: "rgba(70,70,70,0.95)", borderRadius: 9 }}>
                  <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.onPlayOrPause} activeOpacity={0.7}>
                      <Image source={isPlay ? require('../assert/pause.png') : require('../assert/play.png')} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.textTime}>{this.formatMediaTime(currentTime)}</Text>
                    <Slider
                      style={{ flex: 1, height: 40 }}
                      thumbTintColor="white"
                      minimumTrackTintColor='rgb(161, 161, 165)'
                      maximumTrackTintColor='rgb(112, 112, 115)'
                      value={sliderValue}
                      step={1}
                      maximumValue={duration}
                      onValueChange={this.customerSliderValue}
                    />
                    <Text style={styles.textTime}>{this.formatMediaTime(duration)}</Text>
                  </View>
                </View>
              )
            }

          </View>
        </TouchableWithoutFeedback>

      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  viewVideo: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTime: {
    paddingHorizontal: 5,
    color: 'rgb(176, 176, 179)',
    fontSize: 15,
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 9
  }
});

export default VideoPage;