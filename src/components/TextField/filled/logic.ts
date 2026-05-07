import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { AnimatedStyle } from 'react-native-reanimated';

import {
  ACTIVE_INDICATOR_SIZE,
  INACTIVE_INDICATOR_SIZE,
  INPUT_FONT_SIZE,
  LABEL_START_OFFSET_WITHOUT_ACCESSORY,
  isWeb,
} from '../constants';
import { $disabledStyle, $inputStyle } from '../styles';
import type { TextFieldProps, TextFieldSharedApi } from '../TextField';
import { getFieldBackgroundColor, getSharedTextFieldStyleData } from '../utils';
import {
  LABEL_START_OFFSET_WITH_ACCESSORY,
  MULTILINE_PADDING_TOP,
} from './constants';
import {
  $containerStyle,
  $fieldStyle,
  $labelWrapperStyle,
  $disabledBackgroundStyle,
  $outlineStyle,
} from './styles';
import { getOutlineColor } from './utils';

export const getFilledTextFieldData = (
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
    hasSuffix,
    disabled,
    hasAccessory,
    hasError,
    $animatedLabelWrapperStyle,
    $animatedActiveOutlineStyle,
  } = api;

  // =======================
  // THEME TOKENS
  // =======================

  const {
    colors: { onSurface },
  } = theme;

  const outlineColor = getOutlineColor({
    theme,
    hasError,
    isFocused: false,
    disabled,
  });

  const activeOutlineColor = getOutlineColor({
    theme,
    hasError,
    isFocused: true,
    disabled,
  });

  const fieldBackgroundColor = getFieldBackgroundColor({ theme, disabled });

  // =======================
  // SHARED STYLES
  // =======================

  const shared = getSharedTextFieldStyleData(api, props);

  // =======================
  // VARIANT-SPECIFIC STYLES
  // =======================

  const $animatedLabelWrapperStyles: StyleProp<
    AnimatedStyle<StyleProp<ViewStyle>>
  > = [
    $labelWrapperStyle,
    {
      left: hasAccessory
        ? LABEL_START_OFFSET_WITH_ACCESSORY
        : LABEL_START_OFFSET_WITHOUT_ACCESSORY,
    },
    $animatedLabelWrapperStyle,
  ];

  const $containerStyles: StyleProp<ViewStyle> = [
    $containerStyle,
    disabled && $disabledStyle,
    $containerStyleOverride,
  ];

  const $fieldStyles: StyleProp<ViewStyle> = [
    $fieldStyle,
    {
      backgroundColor: fieldBackgroundColor,
    },
    $fieldStyleOverride,
  ];

  /* Disabled tint (DISABLED_CONTAINER_OPACITY) is rendered as a childless overlay so its
     alpha can be applied via the `opacity` style without leaking onto the label
     and input. The View accepts `PlatformColor` directly. */
  const $disabledBackgroundStyles: StyleProp<ViewStyle> = disabled
    ? [
        $disabledBackgroundStyle,
        {
          backgroundColor: onSurface,
        },
      ]
    : undefined;

  const $outlineStyles = [
    $outlineStyle,
    {
      height: INACTIVE_INDICATOR_SIZE,
      backgroundColor: outlineColor,
    },
    disabled && $disabledStyle,
  ];

  const $animatedActiveOutlineStyles: StyleProp<
    AnimatedStyle<StyleProp<ViewStyle>>
  > = [
    $outlineStyle,
    {
      height: ACTIVE_INDICATOR_SIZE,
      backgroundColor: activeOutlineColor,
    },
    disabled && $disabledStyle,
    $animatedActiveOutlineStyle,
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
    $disabledBackgroundStyles,
    $outlineStyles,
    $animatedActiveOutlineStyles,
    $inputStyles,
    ...shared,
  };
};
