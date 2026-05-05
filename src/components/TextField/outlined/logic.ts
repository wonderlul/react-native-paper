import { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native';

import {
  INPUT_FONT_SIZE,
  LABEL_START_OFFSET_WITHOUT_ACCESSORY,
  isWeb,
} from '../constants';
import { $disabledStyle, $inputStyle } from '../styles';
import type { TextFieldProps, TextFieldSharedApi } from '../TextField';
import { getSharedTextFieldStyleData } from '../utils';
import {
  LABEL_START_OFFSET_WITH_ACCESSORY,
  DISABLED_OUTLINE_OPACITY,
} from './constants';
import {
  $containerStyle,
  $fieldStyle,
  $labelWrapperStyle,
  $outlineStyle,
} from './styles';
import { getOutlineColor } from './utils';

export const getOutlinedTextFieldData = (
  api: TextFieldSharedApi,
  props: TextFieldProps
) => {
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

  const $fieldStyles = [$fieldStyle, $fieldStyleOverride];

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
    Animated.WithAnimatedObject<ViewStyle> | ViewStyle
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
      height: 'auto' as TextStyle['height'],
    },
    isWeb && {
      outlineStyle: 'none' as TextStyle['outlineStyle'],
    },
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
