import React from 'react';

import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';


import type { TooltipProps } from '@mui/material/Tooltip';

interface CustomTooltipProps extends TooltipProps {
  // eslint-disable-next-line no-restricted-syntax
  children: React.ReactElement;
}

const CustomToolTip = styled((props: CustomTooltipProps) => (
  <Tooltip {...props} classes={{ popper: props.className }} />
))({
  '& .MuiTooltip-tooltip': {
    backgroundColor: "grey",
    color: '#000000A6',
    boxShadow: '0px 4px 4px 0px #9E9E9E40',
    fontSize: '12px',
    borderRadius: '8px',
    padding: '8px 16px',
    flexWrap: 'wrap',
    display: 'flex',
    width: '229px',
    lineHeight: '16px',
    '& .MuiTooltip-arrow': {
      backgroundColor: '#f5f5f5',
      boxShadow: '0px 4px 4px 0px #9E9E9E40',
    },
  },
});

export default CustomToolTip;
