import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

function Touchable({children, onPress, ...props}) {
  const Component =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Component useForeground {...props} onPress={onPress}>
      <View {...props}>{children}</View>
    </Component>
  );
}

export default Touchable;
