import type { Component } from '@/types';
import type { TextFieldProps, TooltipProps } from '@mui/material';

export type UITextFieldProps = TextFieldProps & {
  className?: string;
  id: string;
  tooltip?: string;
  maxLength: number;
  required?: boolean;
  errorText?: string;
  showCounter?: boolean;
  greenTickFlag?: boolean;
  tooltipIcon?: Component;
  value: string;
  handleClearAction: (id: string) => void;
  showCountryCode?: boolean;
  subLabel?: string;
  isGstVerified?: boolean;
  disableCopyPaste?: boolean;
};

export type UIInputLabel = TextFieldProps & {
  required?: boolean;
  id: string;
};
