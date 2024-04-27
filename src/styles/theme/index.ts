import { createTheme } from '@mui/material';

import { breakpoints, general, palette } from '@/styles/theme/constant';

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface Palette {
    custom: typeof palette.custom;
    yellow: typeof palette.yellow;
    neutral: typeof palette.neutral;
  }
  interface PaletteColor {
    primary20?: string;
    primary60?: string;
    primary80?: string;
    success40?: string;
    success80?: string;
    error40?: string;
    error80?: string;
    neutral20?: string;
    neutral40?: string;
    neutral60?: string;
    neutral80?: string;
    neutral100?: string;
    warning40?: string;
    warning80?: string;
    sky70?: string;
    secondary20?: string;
  }
}

const theme = createTheme({
  breakpoints,
  palette,
  spacing: (factor: number) => `${4 * factor}px`, // Set the base spacing value to 4px
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: '250px',
          color: `${palette.common.white}`,
          '&.MuiButton-contained.Mui-disabled': {
            backgroundColor: `${palette.primary.main}`,
            opacity: 0.3,
            color: `${palette.common.white}`,
          },
        },
        text: {
          color: palette.primary.main,
          // '&:hover': {
          //   backgroundColor: 'transparent',
          // },
          ':disabled': { color: palette.primary.light },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, white',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontSize: '16px',
          fontWeight: 500,
          letterSpacing: '-0.08px',
          lineHeight: '24px',
          maxWidth: '376px',
          width: 'auto',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '16px', // Adjust the value as needed
          boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.16)',
        },
      },
    },
  },
  typography: {
    fontFamily: general.siteFontFamily,
  },
});

export default theme;
