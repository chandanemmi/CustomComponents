import type { SX } from '@/types';

export const typographyStyle: SX = theme => ({
  '&.ui-typography': {
    '&-heading-l': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '900',
      fontSize: '64px',
      lineHeight: '64px',
      letterSpacing: '-2.64px',

      [theme.breakpoints.down('xs')]: {
        fontSize: '48px',
        lineHeight: '48px',
        letterSpacing: '-1.44px',
      },
    },

    '&-heading-xl': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '900',
      fontSize: '88px',
      lineHeight: '88px',
      letterSpacing: '-2.64px',

      [theme.breakpoints.down('xs')]: {
        fontSize: '64px',
        lineHeight: '64px',
        letterSpacing: '-1.92px',
      },
    },

    '&-heading-m': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '900',
      fontSize: '40px',
      lineHeight: '40px',
      letterSpacing: '-2.64px',
    },

    '&-heading-s': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '900',
      fontSize: '32px',
      lineHeight: '32px',
      letterSpacing: '-0.96px',
    },

    '&-heading-xs': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '900',
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '-0.72px',
    },

    '&-heading-xss': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '900',
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '-2.64px',
    },

    '&-overline': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '-0.06px',
      textTransform: 'uppercase',
    },

    '&-body-l': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.12px',
    },

    '&-body-l-bold': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.12px',
    },

    '&-body-l-link': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.12px',
      textDecorationLine: 'none',
    },

    '&-body-m': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '-0.09px',
    },

    '&-body-m-reg': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '-0.09px',
    },

    '&-body-m-bold': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '-0.09px',
    },

    '&-body-m-link': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '-0.09px',
      textDecorationLine: 'none',
    },

    '&-body-s': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.08px',
    },

    '&-body-s-reg': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.08px',
    },

    '&-body-s-bold': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.08px',
    },

    '&-body-s-link': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.08px',
      textDecorationLine: 'none',
    },

    '&-body-xs': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.07px',
    },

    '&-body-xs-reg': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.07px',
    },

    '&-body-xs-bold': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.07px',
    },

    '&-body-xs-link': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.07px',
      textDecorationLine: 'none',
    },

    '&-body-xxs': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '-0.06px',
    },

    '&-body-xxs-reg': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '-0.06px',
    },

    '&-body-xxs-bold': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '-0.06px',
    },

    '&-body-xxs-link': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '-0.06px',
      textDecorationLine: 'none',
    },

    '&-list-title': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '-0.08px',
    },

    '&-button': {
      // fontFamily: 'jioType',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.08px',
    },

    '&-body-checkbox': {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '-0.08px',
    },
  },
});
