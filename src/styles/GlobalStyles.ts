import type { GlobalStylesProps } from '@mui/material';

const globalStyles: GlobalStylesProps['styles'] = () => ({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
});

export default globalStyles;
