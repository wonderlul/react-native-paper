import { useImperativeHandle, useRef, useState } from 'react';
import {
  BlurEvent,
  FocusEvent,
  I18nManager,
  StyleProp,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { AnimatedStyle } from 'react-native-reanimated';

import {
  ACTIVE_LABEL_FONT_SIZE,
  ANIMATION_DURATION_MS,
  INACTIVE_LABEL_FONT_SIZE,
  INACTIVE_LABEL_TOP_POSITION,
} from './constants';
import { ACTIVE_LABEL_TOP_POSITION as FILLED_ACTIVE_LABEL_TOP } from './filled/constants';
import { getFilledTextFieldData } from './filled/logic';
import {
  LABEL_TRANSLATE_X_WITHOUT_ACCESSORY,
  LABEL_TRANSLATE_X_WITH_ACCESSORY,
  ACTIVE_LABEL_TOP_POSITION as OUTLINED_ACTIVE_LABEL_TOP,
} from './outlined/constants';
import { getOutlinedTextFieldData } from './outlined/logic';
import type { TextFieldProps, TextFieldSharedApi } from './TextField';
import { getAccentColors, parseStatus } from './utils';
import { useInternalTheme } from '../../core/theming';

export const useTextField = (props: TextFieldProps) => {
  const {
    ref,
    variant = 'filled',
    theme: themeOverride,
    onFocus,
    onBlur,
  } = props;

  // =======================
  // HOOKS
  // =======================

  const input = useRef<TextInput>(null);

  const theme = useInternalTheme(themeOverride);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  useImperativeHandle(ref, () => input.current as TextInput);

  // =======================
  // CONSTANTS
  // =======================

  const { isRTL } = I18nManager.getConstants();
  const { hasError, disabled: isDisabled } = parseStatus(props.status);
  const disabled = props.editable === false || isDisabled;
  const isFloating = isFocused || !!props.value;
  const hasAccessory = isRTL ? !!props.EndAccessory : !!props.StartAccessory;
  const hasPrefix = !!props.prefix && isFloating;
  const hasSuffix = !!props.suffix && isFloating;
  const hasCounter = props.counter && !!props.maxLength;

  // =======================
  // THEME TOKENS
  // =======================

  const { selectionColor: $selectionColor, cursorColor: $cursorColor } =
    getAccentColors({ theme, hasError });

  const $placeholderTextColor =
    props.placeholderTextColor ?? theme.colors.onSurfaceVariant;

  // =======================
  // LABEL ANIMATION
  // =======================

  const {
    $animatedLabelWrapperStyle,
    $animatedLabelTextStyle,
    $animatedActiveOutlineStyle,
    $animatedContainerStyle,
  } = useTextFieldAnimation({
    variant,
    isFloating,
    isFocused,
    hasAccessory,
  });

  // =======================
  // HANDLERS
  // =======================

  const onFocusHandler = (e: FocusEvent) => {
    onFocus?.(e);
    setIsFocused(true);
  };

  const onBlurHandler = (e: BlurEvent) => {
    onBlur?.(e);
    setIsFocused(false);
  };

  const focusInput = () => {
    if (disabled) return;
    input.current?.focus();
  };

  // =======================
  // SHARED API
  // =======================

  const api: TextFieldSharedApi = {
    input,
    theme,
    isFocused,
    disabled,
    hasAccessory,
    hasError,
    hasSuffix,
    $animatedLabelWrapperStyle,
    $animatedLabelTextStyle,
    $animatedActiveOutlineStyle,
  };

  // =======================
  // COMPONENTS
  // =======================

  const LeadingAccessory = isRTL ? props.EndAccessory : props.StartAccessory;
  const TrailingAccessory = isRTL ? props.StartAccessory : props.EndAccessory;
  // https://github.com/facebook/react-native/issues/31573
  const placeholder = isFocused ? props.placeholder : ' ';
  const counterText = `${props.value?.length ?? 0}/${props.maxLength}`;

  // =======================
  // STYLES
  // =======================

  const data = {
    hasPrefix,
    hasCounter,
    $placeholderTextColor,
    $selectionColor,
    $cursorColor,
    $animatedActiveOutlineStyles: undefined,
    $animatedContainerStyle,
    placeholder,
    counterText,
    LeadingAccessory,
    TrailingAccessory,
    onFocusHandler,
    onBlurHandler,
    focusInput,
  };

  if (variant === 'filled') {
    return {
      ...data,
      ...getFilledTextFieldData(api, props),
    };
  }

  return {
    ...data,
    ...getOutlinedTextFieldData(api, props),
  };
};

const useTextFieldAnimation = ({
  variant,
  isFloating,
  isFocused,
  hasAccessory,
}: {
  variant: 'filled' | 'outlined';
  isFloating: boolean;
  isFocused: boolean;
  hasAccessory: boolean;
}): {
  $animatedLabelWrapperStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  $animatedLabelTextStyle: StyleProp<AnimatedStyle<StyleProp<TextStyle>>>;
  $animatedContainerStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  $animatedActiveOutlineStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
} => {
  const activeTop =
    variant === 'filled' ? FILLED_ACTIVE_LABEL_TOP : OUTLINED_ACTIVE_LABEL_TOP;

  const top = isFloating ? activeTop : INACTIVE_LABEL_TOP_POSITION;
  const fontSize = isFloating
    ? ACTIVE_LABEL_FONT_SIZE
    : INACTIVE_LABEL_FONT_SIZE;

  const $animatedContainerStyle: StyleProp<
    AnimatedStyle<StyleProp<ViewStyle>>
  > = {
    opacity: isFloating ? 1 : 0,
    transitionProperty: 'opacity',
    transitionDuration: ANIMATION_DURATION_MS,
  };

  if (variant === 'filled') {
    return {
      $animatedLabelWrapperStyle: {
        top,
        transitionProperty: 'top',
        transitionDuration: ANIMATION_DURATION_MS,
      },
      $animatedLabelTextStyle: {
        fontSize,
        transitionProperty: 'fontSize',
        transitionDuration: ANIMATION_DURATION_MS,
      },
      $animatedActiveOutlineStyle: {
        transform: [{ scaleX: isFocused ? 1 : 0 }],
        transitionProperty: 'transform',
        transitionDuration: ANIMATION_DURATION_MS,
      },
      $animatedContainerStyle,
    };
  }

  const translateXEnd = hasAccessory
    ? LABEL_TRANSLATE_X_WITH_ACCESSORY
    : LABEL_TRANSLATE_X_WITHOUT_ACCESSORY;

  return {
    $animatedLabelWrapperStyle: {
      top,
      transform: [{ translateX: isFloating ? translateXEnd : 0 }],
      transitionProperty: ['top', 'transform'],
      transitionDuration: ANIMATION_DURATION_MS,
    },
    $animatedLabelTextStyle: {
      fontSize,
      transitionProperty: 'fontSize',
      transitionDuration: ANIMATION_DURATION_MS,
    },
    $animatedContainerStyle,
  };
};
