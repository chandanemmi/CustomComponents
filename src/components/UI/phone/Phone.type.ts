import type { Component } from '@/types';
import type { PhoneInputProps } from 'react-phone-input-2';

export interface UIPhoneInputProps extends PhoneInputProps {
  className?: string;
  id: string;
  tooltip?: string;
  required?: boolean;
  tooltipIcon?: Component;
  label: string;
}
