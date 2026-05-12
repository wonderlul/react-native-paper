import { I18nManager, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { AnimatedStyle } from 'react-native-reanimated';

import {
  INPUT_FONT_SIZE,
  PREFIX_END_PADDING,
  SUFFIX_START_PADDING,
} from './constants';
import {
  $counterStyle,
  $disabledStyle,
  $inputStyle,
  $leadingAccessoryStyle,
  $supportingTextStyle,
  $trailingAccessoryStyle,
} from './styles';
import type {
  TextFieldProps,
  TextFieldSharedApi,
  SharedTextFieldStyleData,
} from './TextField';
import type { InternalTheme } from '../../types';

export const getAccentColors = ({
  theme,
  hasError,
}: {
  theme: InternalTheme;
  hasError: boolean;
}) => {
  const color = hasError ? theme.colors.error : theme.colors.primary;

  return {
    selectionColor: color,
    cursorColor: color,
  };
};

export const getLabelColor = ({
  theme,
  hasError,
  isFocused,
  disabled,
}: {
  theme: InternalTheme;
  isFocused: boolean;
  hasError: boolean;
  disabled: boolean;
}) => {
  const {
    colors: { error, primary, onSurface, onSurfaceVariant },
  } = theme;

  if (hasError) {
    return error;
  }
  if (disabled) {
    return onSurface;
  }
  if (isFocused) {
    return primary;
  }
  return onSurfaceVariant;
};

export const getSupportingTextColor = ({
  theme,
  hasError,
  disabled,
}: {
  theme: InternalTheme;
  hasError: boolean;
  disabled: boolean;
}) => {
  const {
    colors: { error, onSurface, onSurfaceVariant },
  } = theme;

  if (hasError) {
    return error;
  }
  if (disabled) {
    return onSurface;
  }
  return onSurfaceVariant;
};

/**
 * Returns the solid background color for the filled field container, or
 * `undefined` when disabled. The disabled tint is rendered
 * as a separate overlay View whose alpha is applied via the `opacity` style;
 * keeping the alpha out of the color string is what makes the component safe
 * to use with `PlatformColor` values on Android.
 */
export const getFieldBackgroundColor = ({
  theme,
  disabled,
}: {
  theme: InternalTheme;
  disabled: boolean;
}): string | undefined => {
  if (disabled) {
    return undefined;
  }

  return theme.colors.surfaceContainerHighest;
};

export const getIconColor = ({
  theme,
  color,
  hasError,
  disabled,
}: {
  theme: InternalTheme;
  color?: string;
  hasError: boolean;
  disabled: boolean;
}) => {
  if (color) return color;
  if (hasError) return theme.colors.error;
  if (disabled) return theme.colors.onSurface;
  return theme.colors.onSurfaceVariant;
};

/**
 * Computes the style arrays that are identical across the filled and outlined
 * variants. Each variant logic function calls this and then only computes its
 * own variant-specific styles on top.
 *
 * Returns `isRTL` as well so callers can use it when building `$inputStyles`,
 * which is variant-specific (filled adds `MULTILINE_PADDING_TOP`).
 */
export const getSharedTextFieldStyleData = (
  api: TextFieldSharedApi,
  props: TextFieldProps
): SharedTextFieldStyleData => {
  const { isRTL } = I18nManager.getConstants();

  const { theme, disabled, hasError, isFocused, $animatedLabelTextStyle } = api;
  const {
    labelProps,
    supportingTextProps,
    counterProps,
    prefixProps,
    suffixProps,
  } = props;

  const labelColor = getLabelColor({ theme, hasError, isFocused, disabled });
  const supportingTextColor = getSupportingTextColor({
    theme,
    hasError,
    disabled,
  });
  const {
    colors: { onSurfaceVariant },
  } = theme;

  const $animatedLabelTextStyles: StyleProp<
    AnimatedStyle<StyleProp<TextStyle>>
  > = [
    $inputStyle,
    { color: labelColor },
    $animatedLabelTextStyle,
    disabled && $disabledStyle,
    labelProps?.style,
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

  const $leadingAccessoryStyles: StyleProp<ViewStyle> = [
    $leadingAccessoryStyle,
    disabled && $disabledStyle,
  ];

  const $trailingAccessoryStyles: StyleProp<ViewStyle> = [
    $trailingAccessoryStyle,
    disabled && $disabledStyle,
  ];

  return {
    isRTL,
    $animatedLabelTextStyles,
    $supportingTextStyles,
    $counterStyles,
    $prefixStyles,
    $suffixStyles,
    $leadingAccessoryStyles,
    $trailingAccessoryStyles,
  };
};
