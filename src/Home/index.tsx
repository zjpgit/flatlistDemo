import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { INewsItem, CNewsData } from '../Module/data';
import NewsItem from './subpages/NewsItem';
import { PullView } from 'react-native-pull';

interface IState {
  newsList: INewsItem[];
  txtPull: string;
  refreshing: boolean;
}

class Home extends React.PureComponent<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      newsList: [],
      txtPull: '',
      refreshing: false
    }
  }

  componentDidMount() {
    this.refreshNews();
  }

  refreshNews = () => {
    let news = CNewsData.GetNews();
    this.setState({
      newsList: news
    })
  }

  renderNews = (item: INewsItem) => {
    return (
      <NewsItem
        key={item.id}
        id={item.id}
        msg={item.msg}
        date={item.date}
      />
    )
  }

  onRefresh = (resolve: Function) => {

    const timeOutId = setTimeout(() => {
      this.setState({
        newsList: CNewsData.GetNews(),
        refreshing: false
      })
      clearTimeout(timeOutId);
      resolve();
    }, 3000)
  }

  topIndicatorRender = (pulling: boolean, pullok: boolean, pullrelease: boolean) => {
    console.log('pulling: ', pulling, 'pullok: ', pullok, 'pullrelease: ', pullrelease);
    let txt = '';
    if (pulling) {
      this.setState({
        refreshing: true,
      })
      this.txtPulling && this.txtPulling.setNativeProps({style: {display: 'flex'}});
      this.txtPullok && this.txtPullok.setNativeProps({style: {display: 'none'}});
      this.txtPullrelease && this.txtPullrelease.setNativeProps({style: {display: 'none'}});
    } else if (pullok) {
      txt = '松开刷新...';
      this.txtPulling && this.txtPulling.setNativeProps({style: {display: 'none'}});
      this.txtPullok && this.txtPullok.setNativeProps({style: {display: 'flex'}});
      this.txtPullrelease && this.txtPullrelease.setNativeProps({style: {display: 'none'}});
    } else if (pullrelease) {
      txt = '玩命加载中...'
      this.txtPulling && this.txtPulling.setNativeProps({style: {display: 'none'}});
      this.txtPullok && this.txtPullok.setNativeProps({style: {display: 'none'}});
      this.txtPullrelease && this.txtPullrelease.setNativeProps({style: {display: 'flex'}});
    }
    
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60 }}>
        {
          (this.state.refreshing) && (
            <ActivityIndicator size='small' color='#2CB044'/>
          )
        }
        <Text ref={c=>this.txtPulling=c} style={{ color: '#666', display: 'flex'}}>下拉刷新...</Text>
        <Text ref={c=>this.txtPullok=c} style={{ color: '#666', display: 'flex'}}>松开刷新...</Text>
        <Text ref={c=>this.txtPullrelease=c} style={{ color: '#666', display: 'flex'}}>玩命加载中...</Text>
      </View >
    )
  }

  render() {
    const { newsList } = this.state;
    return (
      <View style={styles.container}>
        <PullView onPullRelease={this.onRefresh} topIndicatorRender={this.topIndicatorRender.bind(this)}>
          {
            newsList.map(this.renderNews)
          }
        </PullView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  }
})

export default Home;