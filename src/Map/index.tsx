import React from 'react';
import {
  View, 
  StyleSheet, 
  StatusBar,
  SafeAreaView
} from 'react-native';
import { MapView } from 'react-native-baidu-map';

class Map extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={'dark-content'} //两个参数 dark-content 和 light-content,请根据实际情况设置
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0)" />
        <MapView
          style={StyleSheet.absoluteFill}
          center={{
            latitude: 31.231706,
            longitude: 121.472644
          }}
        />
      </View>
    )
  }
}

export default Map;