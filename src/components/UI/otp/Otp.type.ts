export interface ValidationUpdate {
  validationState?: string;
  validationLabel?: string;
  hideValidation?: boolean;
  request_id?: string;
  timer?: boolean;
}

export interface OTPInputProps {
  codeId: string;
  label: string;
  sublabel: string;
  codeType: string;
  getCode: (ele: string) => void;
  verifyCode: (codeId: string) => void;
  value: string | undefined;
  validation: ValidationUpdate;
  setValidation: (updatedValidation: ValidationUpdate) => void;
}
