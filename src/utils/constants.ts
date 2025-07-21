import { Dimensions } from 'react-native';

export { Typography } from './typography';
export { Spacing } from './spacing';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export { HEIGHT, WIDTH };
