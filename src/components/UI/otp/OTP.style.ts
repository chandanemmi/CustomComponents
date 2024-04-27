import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { palette } from '@/styles/theme/constant';

export const CodeInputContainer = styled('div')(({ theme }) => ({
  '.code-input': {
    '.verify': {
      fontSize: theme.spacing(4),
      marginTop: theme.spacing(2),
      '&[disabled]': {
        cursor: 'not-allowed',
      },
    },
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      '.css-tccdxk': {
        gap: '8px',
      },
    },
    [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
      '.verify-button': {
        textAlignLast: 'end !important',
        width: '100% !important',
      },
    },
  },
  '.resend-otp': {
    fontSize: theme.spacing(3),
    fontStyle: 'normal',
    fontWeight: 400,
  },
  [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
    '.resend-otp': {
      marginTop: theme.spacing(-10),
    },
  },
  ' .css-1tq8nf4-MuiFormControl-root-MuiTextField-root input': {
    borderRadius: '16px',
  },
  '.common-class': {
    display: 'flex',
  },
  /* styles for the success state */
  '.success-class': {
    color: palette.success.success80,
    ' .css-1tq8nf4-MuiFormControl-root-MuiTextField-root input': {
      borderColor: `${theme.palette.success.main} !important`,
      border: '1px solid',
    },
  },
  /* styles for the error state */
  '.error-class': {
    color: palette.error.error80,
    ' .css-1tq8nf4-MuiFormControl-root-MuiTextField-root input': {
      borderColor: `${theme.palette.error.main} !important`,
      border: '1px solid',
    },
  },
  /* styles for the warning state */
  '.warning-class': {
    color: '#8a6d3b',
  },

  /* mobile version */
  '@media only screen and (min-width: 1200px)': {
    '.code-input': {
      '.otp': {
        minWidth: '370px',
      },
      '.verify-button': {
        maxWidth: '200px !important',
      },
    },
  },
}));

export const StyledLabel = styled(Typography)({
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
});

export const StyledButton = styled(Button)({
  fontSize: '14px',
  marginRight: '10px',
  cursor: 'pointer',
});
