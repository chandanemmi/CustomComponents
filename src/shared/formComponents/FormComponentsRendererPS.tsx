/* eslint-disable no-nested-ternary */
import React, { Suspense, lazy, useState } from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/system';

import TenantCategoryCheckbox from '@/components/profile-setup/brandAddition/TenantCategoryCheckbox';
import TradeMarkApplication from '@/components/profile-setup/brandAddition/TradeMarkApplication';
import MSMEDescription from '@/components/profile-setup/MSMEDescription';
import { Typography } from '@/components/UI';
import DownloadTemplate from '@/shared/downloadTemplate/DownloadTemplate';
import { useStore } from '@/store';
import { getFieldByKey } from '@/utils/utils';

import type { CountrySelectProps } from '@/components/UI/countrySelect/CountrySelect';
import type { WarehouseDetails } from '@/features/profile/profile.type';
import type { ProfileDetails } from '@/store/slices/profile.type';
import type { SellerDetails } from '@/store/slices/registration.slice';
import type { Brand, IBrandDetails } from '@/types/brand.type';
import type { SellerBusinessField } from '@/utils/formData/businessLocation.types';
import type { ProfileFormField, ProfileFormOption } from '@/utils/formData/profileFormData.types';
import type { SelectChangeEvent } from '@mui/material';
import type { ChangeEvent, FocusEvent, ReactNode } from 'react';

const InputComponent = lazy(async () => import('@/components/UI/input/Input'));
const SingleFileUpload = lazy(async () => import('@/components/UI/fileUpload/FileUpload'));
const CustomDatePicker = lazy(async () => import('@/components/UI/datePicker/datePicker'));
const CustomSelect = lazy(async () => import('@/components/UI/select/select'));
const AddHoliday = lazy(
  async () => import('@/components/profile-setup/businessLocations/AddHoliday')
);

type T = ProfileDetails | SellerDetails | WarehouseDetails | IBrandDetails;

interface MyFormProps<T extends ProfileDetails | SellerDetails | WarehouseDetails | IBrandDetails>
  extends Partial<CountrySelectProps> {
  formFields: ProfileFormField[] | SellerBusinessField[] | undefined;
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (e: ChangeEvent<unknown>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
  isBtnDisabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClearAction?: (id: any) => void;
  isGstVerified?: boolean;
  handleCheckboxAction?: (
    e: ChangeEvent<HTMLInputElement>,
    key: string,
    field?: ProfileFormField
  ) => void;
  holiday?: [];
  setFieldValue?: (key: any, value: any) => void;
  setFieldTouched?: (key: any, value: any) => void;
  trademarkAgreementCheckbox?: boolean;
  tenantCategoryConfig?: Brand[];
  brandDetails?: IBrandDetails;
  // selectedStep: string
}

// Mapping of form field keys to grid column configuration
const columnMapping: Record<string, { xs: number; sm: number; md?: number; lg?: number }> = {
  msmeDescription: { xs: 12, sm: 12 },
  isUdyamRegistered: { xs: 12, sm: 12 },
  udyamNumber: { xs: 12, sm: 12 },
  taxDetailSub: { xs: 12, sm: 12 },
  gstin: { xs: 12, sm: 12 },
  businessName: { xs: 12, sm: 4 },
  businessType: { xs: 12, sm: 4 },
  panNumber: { xs: 12, sm: 4 },
  countryOfBusiness: { xs: 12, sm: 12 },
  fullName: { xs: 12, sm: 12 },
  businessPhoneNumber: { xs: 12, sm: 12 },
  businessEmailAddress: { xs: 12, sm: 12 },
  basicDetails: { xs: 12, sm: 12 },
  holidayList: { xs: 12, sm: 12 },
  weeklyHolidays: { xs: 12, sm: 12 },
  addHoliday: { xs: 12, sm: 12 },
  bankDetails: { xs: 12, sm: 12 },
  invoiceDetails: { xs: 12, sm: 12 },
  invoicePrefix: { xs: 12, sm: 12 },
  sameAsProfile: { xs: 12, sm: 12 },
  sameAsRegAddr: { xs: 12, sm: 12 },
  sameAsPickupAddr: { xs: 12, sm: 12 },
  returnAddress: { xs: 12, sm: 12 },
  taxDetails: { xs: 12, sm: 12 },
  name: { xs: 12, sm: 12 },
  tenants: { xs: 12, sm: 12 },
  categories: { xs: 12, sm: 12 },
  supportingDocument: { xs: 12, sm: 12 },
  returnAddressProofForPickupAddress: { xs: 12, sm: 12 },
  gstNumber: { xs: 12, sm: 12 },
  holidayCalendar: { xs: 12, sm: 12 },
  isStateSameAsRegAddr: { xs: 12, sm: 12 },
  resgisteredAddress: { xs: 12, sm: 12 },
  msmeDesc: { xs: 12, sm: 12 },
  documentNumber: { xs: 12, sm: 12 },
  uploadAddressProofForReturnAddressDetails: { xs: 12, sm: 12 },
  downloadMSMETemplate: { xs: 12, sm: 12 },
  tenantCategoryCheckbox: { xs: 12, sm: 12 },
  trademarkApplication: { xs: 12, sm: 12, md: 12, lg: 12 },
  brandAuthorisationLetter: { xs: 12, sm: 12, md: 12, lg: 12 },
};

// Mapping of form field keys to additional component props
const additionalPropsMapping: Record<string, Record<string, unknown>> = {
  gstNumber: { showCounter: true, greenTickFlag: true },
  businessPhoneNumber: { showCountryCode: true },
};

// eslint-disable-next-line no-restricted-syntax
const FormComponentsRenderer: React.FC<MyFormProps<T>> = props => {
  const theme = useTheme();
  const { profileStepData } = useStore(state => state);

  const {
    formFields,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    onButtonClick,
    isBtnDisabled,
    isGstVerified,
    handleClearAction,
    handleCheckboxAction,
    setFieldValue,
    trademarkAgreementCheckbox,
    setFieldTouched,
    tenantCategoryConfig,
    brandDetails,
    // selectedStep
  } = props;

  type NestedObject = Record<string, any>; // You might want to replace 'any' with a more specific type if possible

  const getValue = (field: { name?: string }, initialValue: any): any => {
    if (!field) {
      return;
    }
    // Check if field.name is defined and a non-empty string
    if (field.name && typeof field.name === 'string') {
      return field.name
        .split('.')
        .reduce(
          (obj: NestedObject | undefined, key: string) =>
            obj && obj[key] !== 'undefined' ? obj[key] : undefined,
          initialValue
        );
    }
    return initialValue;
  };

  // Render a Button
  const renderButton = (field: any) => (
    <Button disabled={isBtnDisabled} onClick={onButtonClick}>
      {field.label}
    </Button>
  );
  // Render a single checkbox
  const renderCheckbox = (option: ProfileFormOption, field: ProfileFormField) => {
    let isChecked;
    // if (typeof values[field.key as keyof typeof values] === 'object')
    //   isChecked = values[field.key as keyof typeof values]?.some(
    //     (item: any) => item.value.toLowerCase() === option.value
    //   );
    if (typeof values[field.key as keyof typeof values] === 'object') {
      const fieldValues = values[field.key as keyof typeof values] as any[];
      isChecked = fieldValues.some(
        (item: any) => item.value.toLowerCase() === option.value.toLowerCase()
      );
    } else isChecked = getValue(field, values);
    return (
      <FormControlLabel
        className={field.className}
        key={option.value}
        control={
          <Checkbox
            checked={isChecked}
            onChange={e => handleCheckboxAction && handleCheckboxAction(e, field.key, field)}
            name={option.value}
          />
        }
        label={option.label}
        sx={{
          '& .MuiFormControlLabel-label': {
            color: theme.palette.primary.primary80,
          },
        }}
      />
    );
  };

  const renderCheckboxGroup = (field: ProfileFormField) => (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend" className={field.className} style={{ color: 'black' }}>
        {field.label}
      </FormLabel>
      <FormGroup style={{ flexDirection: 'row' }}>
        {field.options?.map(option => renderCheckbox(option, field))}
      </FormGroup>
    </FormControl>
  );

  const renderRadioGroup = (field: ProfileFormField) => (
    <FormControl component="fieldset" className={field?.className}>
      <FormLabel component="legend" style={{ color: 'black' }}>
        <Typography variant="body-s-bold" className="radioLabel">
          {field.label}
        </Typography>
      </FormLabel>
      {field?.subLabel && <Typography variant="body-xxs-reg">{field.subLabel}</Typography>}
      <RadioGroup
        aria-label={field.label}
        name={field.name}
        value={getValue(field, values)}
        onChange={handleChange}
        style={{ flexDirection: 'row' }}
      >
        {field.options?.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={field.inputProps?.disabled}
            sx={{
              '& .MuiFormControlLabel-label': {
                color: theme.palette.primary.primary80,
              },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );

  // Render radio dependant radio fields
  const renderRadioFields = (field: ProfileFormField) =>
    field.options!.map(option => {
      if (String(getValue(field, values)) === option.value && option.fields) {
        return <FormComponentsRenderer key={option.value} {...props} formFields={option.fields} />;
      }
      return null;
    });

  // Render Radio button and dependant radio fields
  const renderRadio = (field: ProfileFormField) => (
    <React.Fragment>
      {renderRadioGroup(field)}
      {renderRadioFields(field)}
    </React.Fragment>
  );

  const renderFileUpload = (field: any) => {
    const { key, ...rest } = field;

    return (
      <React.Fragment>
        {/* Render for all keys except 'trademarkCertificate' unconditionally */}

        <SingleFileUpload
          {...rest}
          {...rest.inputProps}
          className={field.className}
          fileType={rest.inputProps?.fileType}
          fileSize={rest.inputProps?.fileSize}
          id={field.name}
          value={getValue(field, values)}
          setFieldValue={setFieldValue}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getValue(field, touched) && !!getValue(field, errors)}
          helperText={getValue(field, touched) ? getValue(field, errors) : undefined}
          errorText={getValue(field, errors)}
          field={field}
        />
      </React.Fragment>
    );
  };

  // Render Custom DatePicker
  const renderCustomDatePicker = (field: ProfileFormField) => (
    <CustomDatePicker
      {...field.inputProps}
      displayLabel={field.label}
      value={getValue(field, values)}
      onChange={newValue => {
        handleChange({
          target: { value: newValue, name: field.name },
        } as ChangeEvent<HTMLInputElement>);
        // if (setFieldTouched) {
        //   setFieldTouched(field.name, true);
        // }
      }}
      // onBlur={() => {
      //   setFieldTouched(field.name, true); // Update touched state
      // }}
      renderInput={props => <TextField {...props} error={false} />}
      error={getValue(field, touched) && !!getValue(field, errors)}
      errorText={getValue(field, errors)}
    />
  );

  // Render Typography
  const renderTypography = (field: ProfileFormField) => (
    <Typography variant={field.variant} {...field} className={field.className}>
      {field.value}
    </Typography>
  );
  // const renderTypography = (field: ProfileFormField) => {
  //   // Ensure that field.variant is a valid string literal or undefined
  //   const variant: TypographyProps['variant'] = field.variant && field.variant as TypographyProps['variant'];

  //   return (
  //     <Typography variant={variant || 'body1'} {...field}>
  //       {field.value}
  //     </Typography>
  //   );
  // };

  // Render Typography pair
  const renderTypographyPair = (field: ProfileFormField) => (
    <Grid className={field.className}>
      <Typography variant="body-xs-reg" color={theme.palette.primary.primary80}>
        {field.heading}
      </Typography>
      <Typography variant="body-m" color={theme.palette.primary.contrastText}>
        {getValue(field, values)}
      </Typography>
    </Grid>
  );

  // Render Custom Select
  const renderCustomSelect = (field: ProfileFormField) => (
    <CustomSelect
      id={field.name}
      label={field.label}
      tooltip={field.tooltip}
      value={getValue(field, values)}
      onChange={(event: SelectChangeEvent<unknown>) => {
        handleChange(event as ChangeEvent<unknown>);
      }}
      onBlur={handleBlur}
      helperText={getValue(field, touched) ? getValue(field, errors) : undefined}
      error={getValue(field, touched) && !!getValue(field, errors)}
      errorText={getValue(field, errors)}
      isLoading={!field.options || field.options.length === 0}
      emptyOptionsText="Loading options..." // You can customize this message
      className={field.className}
      variant="outlined"
      {...field.inputProps}
    >
      {field.options?.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </CustomSelect>
  );
  // Render Input Component
  const renderInputComponent = (field: any) => (
    <InputComponent
      {...field}
      {...field.inputProps}
      {...additionalPropsMapping[field.key]}
      id={field.name}
      value={getValue(field, values)}
      handleClearAction={handleClearAction}
      onChange={handleChange}
      onBlur={handleBlur}
      isGstVerified={isGstVerified}
      error={getValue(field, touched) && !!getValue(field, errors)}
      helperText={getValue(field, touched) ? getValue(field, errors) : undefined}
      errorText={getValue(field, errors)}
      className={field?.className}
    />
  );

  const customComponentProps = {
    downloadMSMETemplate: {
      templateTitle: 'Udyam certificate',
      downloadLink: '',
      sampleLink: '',
    },

    brandAuthorisationTemplate: {
      templateTitle: 'Brand Authorisation Letter',
      downloadLink: '/Brand_authorisation_document.zip',
      sampleLink: '',
    },
    // TODO: other custom components props handling
  };

  const customComponentMap = {
    addHoliday: AddHoliday,
    msmeDesc: MSMEDescription,
    downloadMSMETemplate: DownloadTemplate,
    tenantCategoryCheckbox: TenantCategoryCheckbox,
    trademarkApplication: TradeMarkApplication,
    brandAuthorisationTemplate: DownloadTemplate,
    // ... add other custom components here
  };

  // Render Custom Component
  const renderCustomComponent = (field: ProfileFormField) => {
    const CustomComponent = customComponentMap[field.customType as keyof typeof customComponentMap];
    const additionalProps =
      customComponentProps[field.key as keyof typeof customComponentProps] || {};
    if (field.key === 'addHoliday') {
      if ('holidayCalendar' in values) {
        // Assuming 'addHoliday' specifically expects 'holidayCalendar' property
        return <CustomComponent data={values} setFieldValue={setFieldValue} />;
      }
    }
    if (field.key === 'tenantCategoryCheckbox') {
      return <TenantCategoryCheckbox data={tenantCategoryConfig} brandDetails={brandDetails} />;
    }

    return <CustomComponent {...additionalProps} />;
  };

  type FieldRenderer = (field: ProfileFormField) => ReactNode;

  type FieldRenderers = Record<string, FieldRenderer>;

  const fieldRenderers: FieldRenderers = {
    text: renderInputComponent,
    password: renderInputComponent,
    typography: renderTypography,
    button: renderButton,
    radio: renderRadio,
    date: renderCustomDatePicker,
    dropdown: renderCustomSelect,
    'typography-pair': renderTypographyPair,
    'checkbox-group': renderCheckboxGroup,
    'file-upload': renderFileUpload,
    customComponent: renderCustomComponent,
  };

  const renderField = (field: ProfileFormField) => {
    const renderer = fieldRenderers[field.type];
    if (field.key === 'cinNumber' || field.key === 'cinProof') {
      if (!('taxDetails' in values) || values.taxDetails.businessType !== 'Company') return null;
    }
    if ((field.key === 'panNumber' || field.key === 'businessType') && !getValue(field, values)) {
      return null;
    }
    // trademark application number and e-signature should be available only if applied for Trademark
    if (field.key === 'trademarkApplication' || field.key === 'trademarkCertificate') {
      const targetField = getFieldByKey(formFields, 'appliedForTrademark');
      if (targetField !== null) {
        if (
          (field.key === 'trademarkApplication' && !getValue(targetField, values)) ||
          (field.key === 'trademarkCertificate' && getValue(targetField, values))
        ) {
          return null;
        }
      }
    }
    return renderer?.(field);
  };

  // Main rendering logic
  return (
    <Grid container spacing={2}>
      {formFields?.map(field => {
        const gridProps = {
          xs: field.key in columnMapping ? columnMapping[field.key].xs : 12,
          sm: field.key in columnMapping ? columnMapping[field.key].sm : 12,
          md: field.key in columnMapping ? columnMapping[field.key].md : 6,
        };
        return (
          <Grid item {...gridProps} key={field.key}>
            <Suspense fallback={<div>Loading...</div>}>{renderField(field)}</Suspense>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FormComponentsRenderer;
