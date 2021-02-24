import React from 'react';
import {
  View,
  Text,
  Image,
  ColorValue,
  ImageSourcePropType,
  TouchableOpacity
} from 'react-native';

interface IProps {
  id: number;
  title: string;
  focused: boolean;
  activeTintColor: ColorValue;
  inactiveTintColor: ColorValue;
  iconNormal?: ImageSourcePropType;
  iconSelected?: ImageSourcePropType;
  iconSize?: number;
  onPressed?: (id: number) => void;
}

class TabButton extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  pressed = () => {
    const { id, onPressed } = this.props;
    if (onPressed) {
      onPressed(id);
    }
  }

  render() {
    const {
      title,
      focused,
      activeTintColor,
      inactiveTintColor,
      iconNormal,
      iconSelected,
      iconSize = 25
    } = this.props;
    return (
      <View style={{ flexDirection: 'column', paddingTop: 9, paddingBottom: 9, width: 50 }}>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.pressed} activeOpacity={0.9}>
          {
            (iconNormal && iconSelected) && <Image source={focused ? iconSelected : iconNormal} resizeMode='contain' style={{ width: iconSize, height: iconSize }} />
          }
          <Text style={{ fontSize: 12, color: focused ? activeTintColor : inactiveTintColor }}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default TabButton;