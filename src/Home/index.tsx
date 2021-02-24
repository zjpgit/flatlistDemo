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
}

class Home extends React.PureComponent<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      newsList: [],
      txtPull: ''
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
        newsList: CNewsData.GetNews()
      })
      clearTimeout(timeOutId);
      resolve();
    }, 3000)
  }

  topIndicatorRender = (pulling: boolean, pullok: boolean, pullrelease: boolean) => {
    console.log('pulling: ', pulling, 'pullok: ', pullok, 'pullrelease: ', pullrelease);
    let txt = '';
    if (pulling) {
      txt = '下拉刷新...'
    } else if (pullok) {
      txt = '松开刷新...'
    } else if (pullrelease) {
      txt = '玩命加载中...'
    }
    this.setState({
      txtPull: txt
    })
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60 }}>
        <ActivityIndicator size='small' color='#2CB044' />
        <Text style={{ color: '#666' }}>{this.state.txtPull}</Text>
      </View >
    )
  }

  render() {
    const { newsList } = this.state;
    return (
      <View style={styles.container}>
        <PullView onPullRelease={this.onRefresh} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}>
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
    flex: 1
  }
})

export default Home;