import { styled } from '@mui/material/styles';

import type { SX } from '@/types';

export const PhoneWrapper = styled('div')(({ theme }) => ({
  fontSize: '16px',
  marginBottom: '20px',
  '.react-tel-input': {
    height: '48px',
    '& .flag-dropdown': {
      backgroundColor: 'white',
      borderStyle: 'none',
    },
  },

  //   '& .form-control': {
  //     height: '48px',
  //     paddingLeft: '62px',
  //     borderRadius: '16px',
  //     width: '100%',
  //   },

  //   'input' : {
  //     '&:: placeholder' : {

  //     }
  //   }

  //   input::placeholder {
  //     font-weight: bold;
  //     font-size: 16px;
  //   }
}));

// export const inputStyle: SX = theme => ({
//   marginTop: '0px !important',
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '16px',
//     '& fieldset': {
//       borderColor: '#E0E0E0',
//     },
//     '&:hover fieldset': {
//       borderColor: '#E0E0E0',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#E0E0E0',
//     },
//   },
//   '& .MuiInputAdornment-root': {
//     position: 'absolute',
//     top: '-20px',
//     right: '15px',
//     transform: 'translateY(-50%)',
//   },
// });
