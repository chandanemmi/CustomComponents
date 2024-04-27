import React from 'react';

import HelpIcon from '@mui/icons-material/Help';
import { IconButton, InputLabel, Tooltip, styled } from '@mui/material';
import clsx from 'clsx';
import PhoneInput from 'react-phone-input-2';

import { PhoneWrapper } from '@/components/UI/phone/Phone.style';

import type { UIPhoneInputProps } from '@/components/UI/phone/Phone.type';
import type { Component } from '@/types';
import type { TooltipProps } from '@mui/material';

const LabelWithTooltip = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  '& .MuiTooltip-tooltip': {
    backgroundColor: '#f5f5f5',
    color: '#000',
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

const UIPhoneInput: Component<UIPhoneInputProps> = props => {
  const {
    className,
    id,
    label,
    required,
    tooltip,
    tooltipIcon: TooltipIcon = HelpIcon,
    ...restProps
  } = props;

  return (
    <PhoneWrapper className={clsx('ui-phone', className)}>
      <LabelWithTooltip>
        <InputLabel
          htmlFor={id}
          sx={{
            position: 'relative',
            top: '1px',
            left: '9px',
            zIndex: 1,
            padding: '0 5px',
            fontSize: '14px',
            transform: 'none',
            '&.Mui-focused': {
              color: '#000',
            },
          }}
        >
          {label}
          {required && <span>*</span>}
        </InputLabel>
        {tooltip && (
          <CustomTooltip title={tooltip} placement="top" arrow>
            <IconButton size="small">
              <TooltipIcon fontSize="small" />
            </IconButton>
          </CustomTooltip>
        )}
      </LabelWithTooltip>
      <PhoneInput
        {...restProps}
        inputStyle={{
          borderRadius: '0 5px 5px 0',
          border: 'none',
        }}
        containerStyle={{
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '16px',
          padding: '10px 12px',
          fontSize: '16px',
        }}
        dropdownStyle={{
          borderRadius: '5px 0 0 5px',
        }}
      />
    </PhoneWrapper>
  );
};

export default UIPhoneInput;
