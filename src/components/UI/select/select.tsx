/* eslint-disable prettier/prettier */
// CustomSelect.tsx

import React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import { FormHelperText, IconButton, MenuItem, Tooltip } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Image from 'next/image';

import toolTipIcon from '@/assets/ic_help.svg';
import {
  StyledSelectHelpIcon,
  StyledSelectLabel,
  selectStyle,
} from '@/components/UI/select/select.style';
import CustomToolTip from '@/shared/customToolTip';
import { palette } from '@/styles/theme/constant';

import type { Component } from '@/types';
import type { SelectProps } from '@mui/material/Select';
import type { ReactNode } from 'react';

type CustomSelectProps = SelectProps & {
  label?: string;
  helperText?: string; // tooltip text
  children?: ReactNode;
  isLoading?: boolean;
  emptyOptionsText?: string;
  errorText?: string;
  tooltip?: string;
  defaultValue?: string | number;
  variant?: 'outlined' | 'filled' | 'standard'; // Add variant here
  // onChange?: (SelectChangeEvent<unknown>, child: React.ReactNode) => void;
};

const CustomSelect: Component<CustomSelectProps> = ({
  label,
  required,
  helperText,
  error,
  errorText,
  tooltip,
  children,
  isLoading,
  className,
  onChange,
  emptyOptionsText = 'Loading options...',
  defaultValue = '',
  variant = 'outlined', // Assign a default value or make it optional
  ...selectProps
}): React.JSX.Element => (<FormControl fullWidth className={className} error={error}>
    {label && (
      <StyledSelectLabel>
        {label}
        {required && <span>*</span>}
        {tooltip && (
          <CustomToolTip title={tooltip} placement="top" arrow tabIndex={-1}>
            <IconButton size="small" style={{ marginLeft: '4px' }}>
              <Image src={toolTipIcon} alt="svg" width={20} height={20} />
            </IconButton>
          </CustomToolTip>
        )}
        {/* {tooltip && (
          <Tooltip title={tooltip} sx={{ width: '20px', height: '20px' }}>
            <StyledSelectHelpIcon fontSize="small" />
          </Tooltip>
        )} */}
      </StyledSelectLabel>
    )}
    <Select
      sx={selectStyle}
      {...selectProps}
      name={selectProps.id}
      onChange={onChange}
      value={selectProps.value ?? defaultValue}
      displayEmpty
      variant={variant}
    >
      <MenuItem value="" disabled>Select</MenuItem>
      {isLoading ? <MenuItem disabled>{emptyOptionsText}</MenuItem> : children}
    </Select>
    {error && (
      <FormHelperText sx={{ display: 'flex', alignItems: 'center',
      '&.Mui-error': {
        color: palette.error.error80
      },
      marginLeft: 0,
      }}>
        <CancelIcon color="error" fontSize="small" sx={{ mr: 1 }} />
        {errorText}
      </FormHelperText>
    )}
  </FormControl>);
export default CustomSelect;
