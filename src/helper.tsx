import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Platform, Dimensions} from 'react-native';

export function hp(value: number, max?: number): number {
  const height = heightPercentageToDP(value);
  if (max != undefined) {
    return height > max ? max : height;
  }
  return height;
}

export function wp(value: number, max?: number): number {
  let width = widthPercentageToDP(value);
  if (max != undefined) {
    return width > max ? max : width;
  }
  return width;
}

export function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}
function isAndroid() {
  return Platform.OS === 'android';
}
export const fontSize = (size: number): number => {
  // Precalculate Device Dimensions for better performance
  const x = Dimensions.get('window').width;

  // Calculating ratio from iPhone breakpoints
  let ratioX = x < 375 ? (x < 320 ? 0.55 : 0.8) : 1;

  // TODO: Need research
  // Extend ratio for android
  if (isAndroid) {
    if (x >= 360) {
      ratioX = 1;
    }
    if (x >= 420) {
      ratioX = 1.25;
    }
  }

  // We're simulating EM by changing font size according to Ratio
  const unit = size * ratioX;

  return unit;
};
