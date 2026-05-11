import { ViewStyle } from 'react-native';

import { TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL } from '../constants';
import { DISABLED_CONTAINER_OPACITY } from './constants';

export const $outlineStyle: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
};

export const $containerStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-end',
  paddingHorizontal: TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL,
};

export const $labelWrapperStyle: ViewStyle = {
  position: 'absolute',
};

export const $disabledBackgroundStyle: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: DISABLED_CONTAINER_OPACITY,
};
