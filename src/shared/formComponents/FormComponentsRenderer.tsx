import React, { Fragment, Suspense, lazy } from 'react';

import { Button, Grid } from '@mui/material';

import CountrySelect from '@/components/UI/countrySelect/CountrySelect';

import type { RegistrationFormProps } from '@/components/leadForm/registrationForm/registrationForm.type';
import type { CountrySelectProps } from '@/components/UI/countrySelect/CountrySelect';
import type { SellerDetails } from '@/store/slices/registration.slice';
import type { FocusEvent } from 'react';

// Lazy-loaded import for all components
const InputComponent = lazy(async () => import('@/components/UI/input/Input'));

// Mapping of component types to React components
// eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<any>> = {
  text: InputComponent,
  button: Button,
  dropdown: CountrySelect,
};
// Mapping of form field keys to grid column configuration
const columnMapping: Record<string, { xs: number; sm: number }> = {
  gstin: { xs: 12, sm: 12 },
  businessName: { xs: 12, sm: 6 },
  businessType: { xs: 12, sm: 6 },
};

// Mapping of form field keys to additional component props
const additionalPropsMapping: Record<string, Record<string, unknown>> = {
  gstNumber: { showCounter: true, greenTickFlag: true },
  businessPhoneNumber: { showCountryCode: true },
};

interface FormField {
  key: string;
  label: string;
  value?: string;
  tooltip?: string;
  inputProps?: {
    name: string;
    required?: boolean;
    maxLength?: number;
    readOnly?: boolean;
    disabled?: boolean;
  };
  type: string;
  error?: boolean;
  helperText?: string;
}

interface BrandDetails {
  _id?: string | undefined;
  name?: string;
  tenants?: string[];
  categories?: string[];
  brandLogo?: {
    documentLink: string;
    documentType: string;
  };
  supportingDocumentType?: string;
  trademarkInfo?: {
    appliedForTrademark: boolean;
    applicationInfo: {
      applicationNumber: string;
      signature: string;
    };
  };
  supportingDocumentLink?: string;
  [key: string]: any;
}

interface CategoryTenantMap {
  tenants: string[];
  categories: string[];
  [key: string]: any;
}

interface MyFormProps extends CountrySelectProps, RegistrationFormProps {
  formFields: FormField[];

  handleBlur: (e: FocusEvent<unknown>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClearAction: (id: any) => void;
  isGstVerified: boolean;
}

// eslint-disable-next-line no-restricted-syntax
const FormComponentsRenderer: React.FC<MyFormProps> = ({
  formFields,
  formik,
  handleBlur,
  isGstVerified,
  handleClearAction,
  title,
  value,
  onChange,
  countries,
  error,
  ...props
}) => {
  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-explicit-any
  const handleChange = async (field: FormField, e: React.ChangeEvent<any>) => {
    const newValue = e.target.value;

    // Update field value in Formik
    formik.handleChange(field?.inputProps?.name)(newValue);

    // Check if the current field is 'businessPhoneNumber'
    if (field?.key === 'businessPhoneNumber') {
      // Validate the field
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        await formik.validateField(field?.inputProps?.name!);

        // If validation succeeds, clear the error
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        formik.setFieldError(field?.inputProps?.name!, '');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // If validation fails, set the error message
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        formik.setFieldError(field?.inputProps?.name!, err.message || 'Validation failed');
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      formik.setFieldTouched(field?.inputProps?.name!, true);
    }
  };

  return (
    <Grid container spacing={2}>
      {formFields.map((field, index) => {
        const Component = componentMap[field.type];

        if (!Component) {
          console.error(`Unsupported component type: ${field.type}`);
          return null;
        }

        // Get xs and sm values based on formField key or use default values if not found
        const { xs = 12, sm = 12 } = columnMapping[field.key] || {};
        const additionalProps = additionalPropsMapping[field.key] || {};

        if (field.type === 'button') {
          return (
            <Grid item key={field.key} xs={xs} sm={sm}>
              <Button {...additionalProps} disabled={!formik.isValid} onClick={formik.submitForm}>
                {field.label}
              </Button>
            </Grid>
          );
        }
        if (field.type === 'dropdown') {
          return (
            <CountrySelect
              value={value}
              onChange={onChange}
              countries={countries}
              title={title}
              error={error}
              tooltip={field.tooltip}
            />
          );
        }
        return (
          <Grid item key={field.key} xs={xs} sm={sm} width="100%">
            <Suspense fallback={<div>Loading...</div>}>
              <Component
                {...field}
                {...field.inputProps}
                {...additionalProps}
                id={field.key}
                value={formik.values[field.key as keyof typeof formik.values]}
                handleClearAction={handleClearAction}
                // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                // onChange={async (e: any) => handleChange(field, e)}
                onChange={formik.handleChange}
                onBlur={handleBlur}
                isGstVerified={isGstVerified}
                error={
                  formik.touched[field.key as keyof typeof formik.touched] &&
                  Boolean(formik.errors[field.key as keyof typeof formik.touched])
                }
                helperText={
                  formik.touched[field.key as keyof typeof formik.touched]
                    ? formik.errors[field.key as keyof typeof formik.touched]
                    : undefined
                }
                errorText={formik.errors[field.key as keyof typeof formik.errors]}
              />
            </Suspense>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default FormComponentsRenderer;
