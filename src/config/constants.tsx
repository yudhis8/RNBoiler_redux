import configJson from '../../config';
const generalConfig = configJson.general;

const modeConfig = __DEV__
  ? true
  : false
  ? configJson.development
  : configJson.production;

export const config = Object.assign({}, generalConfig, modeConfig);
