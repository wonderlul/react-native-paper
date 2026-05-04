import {
  Animated,
  I18nManager,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {
  INPUT_FONT_SIZE,
  PREFIX_END_PADDING,
  SUFFIX_START_PADDING,
  isWeb,
} from '../constants';
import {
  $counterStyle,
  $disabledStyle,
  $supportingTextStyle,
  $inputStyle,
  $leadingAccessoryStyle,
  $trailingAccessoryStyle,
} from '../styles';
import type { TextFieldProps, TextFieldSharedApi } from '../TextField';
import { getSupportingTextColor, getLabelColor } from '../utils';
import {
  LABEL_START_OFFSET_WITH_ACCESSORY,
  LABEL_START_OFFSET_WITHOUT_ACCESSORY,
  DISABLED_OUTLINE_OPACITY,
} from './constants';
import {
  $containerStyle,
  $fieldStyle,
  $labelTextStyle,
  $labelWrapperStyle,
  $outlineStyle,
} from './styles';
import { getOutlineColor } from './utils';

export const getOutlinedTextFieldData = (
  api: TextFieldSharedApi,
  props: TextFieldProps
) => {
  const {
    labelProps,
    supportingTextProps,
    counterProps,
    style: $inputStyleOverride,
    fieldStyle: $fieldStyleOverride,
    containerStyle: $containerStyleOverride,
    prefixProps,
    suffixProps,
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
    $animatedLabelTextStyle,
  } = api;

  // =======================
  // CONSTANTS
  // =======================

  const { isRTL } = I18nManager.getConstants();

  // =======================
  // THEME TOKENS
  // =======================

  const {
    colors: { background: labelBackgroundColor, onSurface, onSurfaceVariant },
  } = theme;

  const labelColor = getLabelColor({
    theme,
    status: props.status,
    isFocused,
    disabled,
  });

  const outlineColor = getOutlineColor({
    theme,
    disabled,
    isFocused,
    hasError,
  });

  const supportingTextColor = getSupportingTextColor({
    theme,
    status: props.status,
    disabled,
  });

  // =======================
  // STYLES
  // =======================

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

  const $containerStyles: StyleProp<ViewStyle> = [
    $containerStyle,
    $containerStyleOverride,
  ];

  const $supportingTextStyles: StyleProp<TextStyle> = [
    $supportingTextStyle,
    {
      color: supportingTextColor,
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    disabled && $disabledStyle,
    supportingTextProps?.style,
  ];

  const $counterStyles: StyleProp<TextStyle> = [
    $counterStyle,
    {
      color: supportingTextColor,
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    disabled && $disabledStyle,
    counterProps?.style,
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

  const $animatedLabelTextStyles: StyleProp<
    Animated.WithAnimatedObject<TextStyle> | TextStyle
  > = [
    $labelTextStyle,
    {
      color: labelColor,
    },
    $animatedLabelTextStyle,
    disabled && $disabledStyle,
    labelProps?.style,
  ];

  const $inputStyles: StyleProp<TextStyle> = [
    $inputStyle,
    {
      flex: 1,
      color: onSurface,
      fontSize: INPUT_FONT_SIZE,
      textAlign: hasSuffix === isRTL ? 'left' : 'right',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    textInputProps.multiline && {
      height: 'auto' as TextStyle['height'],
    },
    isWeb && {
      outlineStyle: 'none' as TextStyle['outlineStyle'],
    },
    disabled && $disabledStyle,
    $inputStyleOverride,
  ];

  const $prefixStyles: StyleProp<TextStyle> = [
    $inputStyle,
    {
      fontSize: INPUT_FONT_SIZE,
      color: onSurfaceVariant,
      paddingEnd: PREFIX_END_PADDING,
    },
    disabled && $disabledStyle,
    prefixProps?.style,
  ];

  const $suffixStyles: StyleProp<TextStyle> = [
    $inputStyle,
    {
      fontSize: INPUT_FONT_SIZE,
      color: onSurfaceVariant,
      paddingStart: SUFFIX_START_PADDING,
    },
    disabled && $disabledStyle,
    suffixProps?.style,
  ];

  const $leadingAccessoryStyles = [
    $leadingAccessoryStyle,
    disabled && $disabledStyle,
  ];

  const $trailingAccessoryStyles = [
    $trailingAccessoryStyle,
    disabled && $disabledStyle,
  ];

  return {
    input,
    disabled,
    hasError,
    hasSuffix,
    $animatedLabelWrapperStyles,
    $animatedLabelTextStyles,
    $fieldStyles,
    $disabledBackgroundStyles: undefined,
    $outlineStyles,
    $containerStyles,
    $supportingTextStyles,
    $counterStyles,
    $inputStyles,
    $prefixStyles,
    $suffixStyles,
    $leadingAccessoryStyles,
    $trailingAccessoryStyles,
  };
};
