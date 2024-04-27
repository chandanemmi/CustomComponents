import HelpIcon from '@mui/icons-material/Help';
import { Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';

import type { SX } from '@/types';

export const StyledSelectLabel = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.primary80};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.07px;
  line-height: 20px;
  padding: 0 0px 0px 10px;
  display: flex;
  align-items: center;
`;

export const StyledSelectHelpIcon = styled(HelpIcon)`
  color: ${({ theme }) => theme.palette.neutral.neutral60};
  margin-left: 4px;
  cursor: pointer;
`;

export const selectStyle: SX = theme => ({
  '.css-av774z-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
    padding: theme.spacing(3),
    width: '376px',
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.neutral.neutral40,
  },
});
