import { palette } from '@/styles/theme/constant';

import type { SxProps } from '@mui/system';

export const popperSx: SxProps = {
  '& .MuiPaper-root': {
    borderRadius: '24px',
  },
  '& .MuiPickersCalendarHeader-label': {
    color: palette.primary.primary60,
  },
  '& .MuiPickersDay-root': {
    color: palette.primary.primary60,
    fontSize: 16,
    fontWeight: 700,
  },
  '& .MuiPickersDay-root:hover': {
    backgroundColor: palette.primary.primary20,
  },
  '& .MuiDayPicker-weekDayLabel': {
    color: palette.neutral.neutral80,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: '-0.08px',
  },
  '& .MuiPickersDay-root.Mui-selected, & .PrivatePickersYear-yearButton.Mui-selected, & .PrivatePickersMonth-root.Mui-selected':
    {
      color: palette.common.white,
      backgroundColor: palette.primary.main,
      fontSize: 16,
      fontWeight: 700,
    },
  '& .MuiPickersArrowSwitcher-root .MuiIconButton-edgeEnd ': {
    position: 'absolute',
    left: 12,
  },
  '& .MuiPickersCalendarHeader-labelContainer': {
    marginLeft: '26%',
  },
};
