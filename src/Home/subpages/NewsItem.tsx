import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

interface IProps {
  id: number;
  msg: string;
  date: string;
}

class NewsItem extends React.PureComponent<IProps> {
  render() {
    const { msg, date } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{msg}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#DCDCDC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10
  },
  title: {
    color: '#666',
    fontSize: 15,
    fontWeight: 'bold'
  },
  date: {
    color: '#ccc',
    fontSize: 13
  }
})

export default NewsItem;