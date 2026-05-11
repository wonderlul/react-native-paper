import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { AnimatedStyle } from 'react-native-reanimated';

import {
  INPUT_FONT_SIZE,
  LABEL_START_OFFSET_WITHOUT_ACCESSORY,
  TEXT_FIELD_BORDER_RADIUS,
  isWeb,
} from '../constants';
import { $disabledStyle, $fieldStyle, $inputStyle } from '../styles';
import type {
  OutlinedTextFieldHookData,
  TextFieldProps,
  TextFieldSharedApi,
} from '../TextField';
import { getSharedTextFieldStyleData } from '../utils';
import {
  DISABLED_OUTLINE_OPACITY,
  LABEL_START_OFFSET_WITH_ACCESSORY,
  MULTILINE_PADDING_TOP,
} from './constants';
import { $containerStyle, $labelWrapperStyle, $outlineStyle } from './styles';
import { getOutlineColor } from './utils';

export const getOutlinedTextFieldData = (
  api: TextFieldSharedApi,
  props: TextFieldProps
): OutlinedTextFieldHookData => {
  const {
    style: $inputStyleOverride,
    fieldStyle: $fieldStyleOverride,
    containerStyle: $containerStyleOverride,
    ...textInputProps
  } = props;

  const {
    input,
    theme,
    isFocused,
    disabled,
    hasAccessory,
    hasError,
    hasSuffix,
    $animatedLabelWrapperStyle,
  } = api;

  // =======================
  // THEME TOKENS
  // =======================

  const {
    colors: { background: labelBackgroundColor, onSurface },
  } = theme;

  const outlineColor = getOutlineColor({
    theme,
    disabled,
    isFocused,
    hasError,
  });

  // =======================
  // SHARED STYLES
  // =======================

  const shared = getSharedTextFieldStyleData(api, props);

  // =======================
  // VARIANT-SPECIFIC STYLES
  // =======================

  const $containerStyles: StyleProp<ViewStyle> = [
    $containerStyle,
    disabled && $disabledStyle,
    $containerStyleOverride,
  ];

  const $fieldStyles: StyleProp<ViewStyle> = [
    $fieldStyle,
    {
      borderRadius: TEXT_FIELD_BORDER_RADIUS,
    },
    textInputProps.multiline && { alignItems: 'flex-start' },
    $fieldStyleOverride,
  ];

  /* The outline is a childless absolutely-positioned View, so applying
     `opacity` here is safe and lets us pass `outlineColor` through unchanged
     (including PlatformColor values on Android). */
  const $outlineStyles = [
    $outlineStyle,
    {
      borderWidth: isFocused ? 2 : 1,
      borderColor: outlineColor,
    },
    disabled && { opacity: DISABLED_OUTLINE_OPACITY },
    $fieldStyleOverride,
  ];

  const $animatedLabelWrapperStyles: StyleProp<
    AnimatedStyle<StyleProp<ViewStyle>>
  > = [
    $labelWrapperStyle,
    {
      left: hasAccessory
        ? LABEL_START_OFFSET_WITH_ACCESSORY
        : LABEL_START_OFFSET_WITHOUT_ACCESSORY,
      backgroundColor: labelBackgroundColor,
    },
    $animatedLabelWrapperStyle,
  ];

  const $inputStyles: StyleProp<TextStyle> = [
    $inputStyle,
    {
      flex: 1,
      color: onSurface,
      fontSize: INPUT_FONT_SIZE,
      textAlign: hasSuffix === shared.isRTL ? 'left' : 'right',
      writingDirection: shared.isRTL ? 'rtl' : 'ltr',
    },
    textInputProps.multiline && {
      height: 'auto',
      textAlignVertical: 'top',
      paddingTop: MULTILINE_PADDING_TOP,
    },
    isWeb && {
      outlineStyle: 'none' as TextStyle['outlineStyle'],
    },
    disabled && $disabledStyle,
    $inputStyleOverride,
  ];

  return {
    input,
    disabled,
    hasError,
    hasSuffix,
    $animatedLabelWrapperStyles,
    $containerStyles,
    $fieldStyles,
    $disabledBackgroundStyles: undefined,
    $outlineStyles,
    $inputStyles,
    ...shared,
  };
};
