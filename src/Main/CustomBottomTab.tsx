import React from 'react';
import {
  View, StyleSheet
} from 'react-native';
import { BottomTabs, IBottomTab } from '../Module/data';
import TabButton from './TabButton';

interface IProps {
  initialRouteName: string;
  onTabPressed?: (id: number) => void;
}
interface IStates {
  selectedId: number;
}

class CustomBottomTab extends React.PureComponent<IProps, IStates> {

  constructor(props: IProps) {
    super(props);
    let defaultId: number = 0;
    for (let i = 0; i < BottomTabs.length; ++i) {
      if (BottomTabs[i].title === props.initialRouteName) {
        defaultId = BottomTabs[i].id;
        break;
      }
    }
    this.state = {
      selectedId: defaultId
    }
    if (props.onTabPressed) {
      props.onTabPressed(defaultId);
    }
  }

  onTabPressed = (id: number) => {
    this.setState({
      selectedId: id
    })
    if (this.props.onTabPressed) {
      this.props.onTabPressed(id)
    }
  }

  renderBottomTab = (item: IBottomTab) => {
    return (
      <TabButton
        key={item.id}
        id={item.id}
        title={item.title}
        iconNormal={item.iconNormal}
        iconSelected={item.iconSelected}
        activeTintColor="#2dceff"
        inactiveTintColor="#8a8a8a"
        focused={this.state.selectedId === item.id}
        onPressed={this.onTabPressed}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {
          BottomTabs.map(this.renderBottomTab)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopColor: '#DCDCDC',
    borderTopWidth: StyleSheet.hairlineWidth,
    //height: 60,
  }
})

export default CustomBottomTab;