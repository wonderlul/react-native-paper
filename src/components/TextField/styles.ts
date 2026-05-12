import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import {
  ACCESSORY_SIZE,
  SUPPORTING_TEXT_FONT_SIZE,
  SUPPORTING_TEXT_MARGIN_TOP,
  TEXT_FIELD_ACCESSORY_MARGIN_HORIZONTAL,
  TEXT_FIELD_HEIGHT,
  TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL,
  TEXT_FIELD_PADDING_VERTICAL,
} from './constants';
import { tokens } from '../../styles/themes/v3/tokens';

export const $inputStyle: StyleProp<TextStyle> = {
  paddingVertical: 0,
  paddingHorizontal: 0,
  includeFontPadding: false,
  fontWeight: '400',
};

export const $fieldStyle: ViewStyle = {
  flexDirection: 'row',
  minHeight: TEXT_FIELD_HEIGHT,
  paddingVertical: TEXT_FIELD_PADDING_VERTICAL,
};

export const $addendumStyle: ViewStyle = {
  flexDirection: 'row',
};

export const $supportingTextStyle: TextStyle = {
  flex: 1,
  marginTop: SUPPORTING_TEXT_MARGIN_TOP,
  paddingHorizontal: TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL,
  fontSize: SUPPORTING_TEXT_FONT_SIZE,
  fontWeight: '400',
  textAlign: 'left',
};

export const $counterStyle: TextStyle = {
  marginTop: SUPPORTING_TEXT_MARGIN_TOP,
  marginStart: 'auto',
  paddingHorizontal: TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL,
  fontSize: SUPPORTING_TEXT_FONT_SIZE,
  fontWeight: '400',
  textAlign: 'right',
};

export const $trailingAccessoryStyle: ViewStyle = {
  width: ACCESSORY_SIZE,
  height: ACCESSORY_SIZE,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginEnd: TEXT_FIELD_ACCESSORY_MARGIN_HORIZONTAL,
};

export const $leadingAccessoryStyle: ViewStyle = {
  width: ACCESSORY_SIZE,
  height: ACCESSORY_SIZE,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginStart: TEXT_FIELD_ACCESSORY_MARGIN_HORIZONTAL,
};

export const $disabledStyle: ViewStyle = {
  opacity: tokens.md.ref.stateOpacity.disabled,
};

export const $iconWrapperStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const $iconStyle: ViewStyle = {
  margin: 0,
};
