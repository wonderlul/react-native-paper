import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { ACCESSORY_SIZE, ERROR_ICON_SIZE } from './constants';
import { useInternalTheme } from '../../core/theming';
import type { ThemeProp } from '../../types';
import Icon from '../Icon';

interface TextFieldErrorIconProps {
  style?: StyleProp<ViewStyle>;
  theme?: ThemeProp;
}

const TextFieldErrorIcon = ({
  style: $wrapperStyle,
  theme: themeOverride,
}: TextFieldErrorIconProps) => {
  const theme = useInternalTheme(themeOverride);

  const $circleStyle: ViewStyle = {
    width: ACCESSORY_SIZE,
    height: ACCESSORY_SIZE,
    borderRadius: ACCESSORY_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.error,
  };

  return (
    <View style={$wrapperStyle}>
      <View style={$circleStyle}>
        <Icon
          source="exclamation-thick"
          size={ERROR_ICON_SIZE}
          color={theme.colors.onError}
        />
      </View>
    </View>
  );
};

export default TextFieldErrorIcon;
