import theme from '@/styles/theme';

import type { SX } from '@/types';

export const inputStyle: SX = () => ({
  marginTop: '0px !important',
  // '& .MuiInputBase-input': {
  //   height: '14px', 
  // },
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#E0E0E0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E0E0E0',
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.neutral.neutral20,
    },
  },
});
