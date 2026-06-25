import { NavigatorScreenParams } from '@react-navigation/native';
import { RootStackParamList, TabParamList } from '../types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
