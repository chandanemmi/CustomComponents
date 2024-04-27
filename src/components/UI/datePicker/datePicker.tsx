/* eslint-disable prettier/prettier */
import React, {useRef} from 'react';

import { FormHelperText, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers';

import { popperSx } from '@/components/UI/datePicker/datePicker.style';
import { StyledSelectLabel } from '@/components/UI/select/select.style';

import type { Component } from '@/types';
import type { TextFieldProps } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { palette } from '@/styles/theme/constant';

interface CustomDatePickerProps<TInputDate = unknown, TDate = unknown>
  extends Omit<DatePickerProps<TInputDate, TDate>, 'renderInput'> {
  displayLabel?: string;
  // eslint-disable-next-line no-restricted-syntax
  renderInput?: (props: TextFieldProps) => React.ReactElement;
  width?: string;
  maxWidth?: string;
  required?: boolean;
  restrictFutureDates?: boolean;
  errorText?: string;
  error?: boolean;
  onBlur?: () => void; 
  disablePast?:boolean
}

const CustomDatePicker: Component<CustomDatePickerProps> = ({
  displayLabel,
  onChange,
  value,
  renderInput,
  maxWidth,
  required,
  restrictFutureDates,
  error,
  errorText,
  disablePast=false,
  ...datePickerProps
}): React.JSX.Element => {
  const datePickerRef = useRef<HTMLInputElement | null>(null);

  // const handleBlur = () => {
  //   if (onBlur) {
  //     onBlur();
  //   }
  // };
  return (
  <FormControl fullWidth sx={{ maxWidth }}>
    {displayLabel && (
      <StyledSelectLabel>
        {displayLabel}
        {required && <span>*</span>}
      </StyledSelectLabel>
    )}
    <DatePicker
      disablePast={disablePast}
      ref={datePickerRef}
      views={['year', 'month', 'day']}
      className="custom-datepicker"
      onChange={onChange}
      value={value || ''}
      inputFormat="DD/MM/YYYY"
      renderInput={renderInput ?? ((props: TextFieldProps) => <TextField {...props} />)}
      PopperProps={{
        sx: popperSx,
      }}
      //onBlur={handleBlur}
      maxDate={restrictFutureDates && new Date()}
      {...datePickerProps}
    />
    {error && (
      <FormHelperText sx={{ display: 'flex', alignItems: 'center', color: palette.error.error80 }}>
        <CancelIcon color="error" fontSize="small" sx={{ mr: 1 }} />
        {errorText}
      </FormHelperText>
    )}
  </FormControl>
)};
export default CustomDatePicker;
