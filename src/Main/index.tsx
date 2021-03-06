import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform
} from 'react-native';
import CustomBottomTab from './CustomBottomTab';
import { E_BOTTOM_TAB_TYPE } from '../Module/data';
import Home from '../Home';
import Map from '../Map';
import Mine from '../Mine';
import VideoPage from '../Video'
import { BaiduMapManager } from 'react-native-baidu-map'
if (Platform.OS == 'ios') {
  BaiduMapManager.initSDK('VHmD6E6p5bXZ7jKLbaGTMh7VIU8uSKAq');
}

interface IState {
  selectedBottomTabId: number
}

class Main extends React.PureComponent<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      selectedBottomTabId: 0
    }
  }

  componentDidMount() {

  }

  onBottomTabPressed = (id: number) => {
    this.setState({
      selectedBottomTabId: id
    })
  }

  render() {
    const { selectedBottomTabId } = this.state;
    return (
      <View style={styles.container}>
        {
          (selectedBottomTabId !== E_BOTTOM_TAB_TYPE.E_BOTTOM_TAB_MAP) && (
            <SafeAreaView style={styles.safeAreaView} />
          )
        }
        <StatusBar barStyle="light-content" backgroundColor='rgba(0,0,0,1)' translucent={false} />
        <View style={{ flex: 1 }}>
          {
            (selectedBottomTabId == E_BOTTOM_TAB_TYPE.E_BOTTOM_TAB_HOME) && (
              <Home />
            )
          }
          {
            (selectedBottomTabId == E_BOTTOM_TAB_TYPE.E_BOTTOM_TAB_MAP) && (
              <Map />
            )
          }
          {
            (selectedBottomTabId == E_BOTTOM_TAB_TYPE.E_BOTTOM_TAB_MINE) && (
              <Mine />
            )
          }
          {
            (selectedBottomTabId == E_BOTTOM_TAB_TYPE.E_BOTTOM_TAB_VIDEO) && (
              <VideoPage />
            )
          }
        </View>
        <CustomBottomTab
          initialRouteName='首页'
          onTabPressed={this.onBottomTabPressed}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeAreaView: {
    backgroundColor: '#007acc'
  }
})

export default Main;