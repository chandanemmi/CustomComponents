import { jioType } from '@/styles/font';

export const breakpoints = {
  values: {
    xs: 400,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

export const general = {
  siteFontFamily: jioType.style.fontFamily,
} as const;

export const palette = {
  mode: 'light',
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: '#9999FF',
    main: '#3535F3',
    contrastText: '#141414',
    primary20: '#E8E8FC',
    primary60: '#000093',
    primary80: '#000000A6',
  },
  success: {
    main: '#25AB21',
    success40: '#E9F7E9',
    success80: '#135610',
    contrastText: '#fff',
  },
  error: {
    main: '#F50031',
    error40: '#FEE6EA',
    error80: '#660014',
    contrastText: '#fff',
  },
  neutral: {
    neutral20: '#F5F5F5',
    neutral40: '#E0E0E0',
    neutral60: '#B5B5B5',
    neutral80: '#595959',
    neutral100: '#141414',
  },
  warning: {
    main: '#F06D10',
    warning40: '#FEEFE7',
    warning80: '#7D2F09',
  },
  sky: {
    sky70: '#00364E',
  },
  yellow: {
    secondary20: '#FEF7E9',
  },
  global: {
    black: '#141414',
  },
  custom: {},
} as const;
