import { ViewStyle } from 'react-native';

import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL,
} from '../constants';
import { LABEL_PADDING_HORIZONTAL } from './constants';

export const $outlineStyle: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  borderRadius: TEXT_FIELD_BORDER_RADIUS,
};

export const $containerStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL,
};

export const $labelWrapperStyle: ViewStyle = {
  position: 'absolute',
  paddingHorizontal: LABEL_PADDING_HORIZONTAL,
};
