import { ImageSourcePropType } from "react-native";

export interface INewsItem {
  id: number,
  msg: string,
  date: string
}

export interface IBottomTab {
  id: number;
  title: string;
  iconNormal: ImageSourcePropType;
  iconSelected: ImageSourcePropType;
}

export enum E_BOTTOM_TAB_TYPE {
  E_BOTTOM_TAB_HOME = 1,
  E_BOTTOM_TAB_MAP = 2,
  E_BOTTOM_TAB_MINE = 3,
}

const BottomTabs: IBottomTab[] = [
  {
    id: E_BOTTOM_TAB_TYPE.E_BOTTOM_TAB_HOME,
    title: '首页',
    iconNormal: require('../assert/home.png'),
    iconSelected: require('../assert/home_selected.png')
  },
  {
    id: E_BOTTOM_TAB_TYPE.E_BOTTOM_TAB_MAP,
    title: '地图',
    iconNormal: require('../assert/map.png'),
    iconSelected: require('../assert/map_selected.png')
  },
  {
    id: E_BOTTOM_TAB_TYPE.E_BOTTOM_TAB_MINE,
    title: '我的',
    iconNormal: require('../assert/mine.png'),
    iconSelected: require('../assert/mine_selected.png')
  },
]

class CNewsData {
  private static _newsList: INewsItem[] = [];
  static GetNews = (): INewsItem[] => {
    let news = CNewsData._newsList;
    if (news.length == 0) {
      for (let i = 0; i < 20; i++) {
        let n = {
          id: i,
          msg: `新闻标题${i + 1}`,
          date: '2021-02-10: 00:00:00'
        }
        news.push(n);
      }
    }
    return news;
  }
}

export {
  CNewsData,
  BottomTabs
}