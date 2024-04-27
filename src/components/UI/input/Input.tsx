/* eslint-disable @next/next/no-img-element */
import React, { FC, ReactEventHandler } from 'react';

import { CheckCircleOutline } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField as MuiTextField,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import Image from 'next/image';

import toolTipIcon from '@/assets/ic_help.svg';
import { inputStyle } from '@/components/UI/input/Input.style';
import Typography from '@/components/UI/typography/Typography';
import CustomToolTip from '@/shared/customToolTip';
import theme from '@/styles/theme';
import { palette } from '@/styles/theme/constant';

import type { UIInputLabel, UITextFieldProps } from '@/components/UI/input/Input.type';
import type { TooltipProps } from '@mui/material';

const LabelWithTooltip = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const CustomInputLabel: FC<UIInputLabel> = ({ id, label, required }) => (
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
      color: theme.palette.primary.primary80,
      '&.Mui-focused': {
        color: '#000',
      },
    }}
    tabIndex={-1}
  >
    {label}
    {required && <span>*</span>}
  </InputLabel>
);
const UIInput: Component<UITextFieldProps> = props => {
  const {
    label,
    subLabel,
    id,
    className,
    required,
    disabled,
    tooltip,
    tooltipIcon: TooltipIcon = HelpIcon,
    value,
    onChange,
    maxLength,
    showCounter,
    greenTickFlag,
    error,
    helperText,
    errorText,
    handleClearAction,
    showCountryCode,
    isGstVerified,
    disableCopyPaste,
    ...restProps
  } = props;
  const handleCopyPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    // Prevent the default copy and paste behavior
    disableCopyPaste && event.preventDefault();
  };
  let adornment;
  if (greenTickFlag && isGstVerified && value) {
    adornment = (
      <InputAdornment position="start">
        <Grid
          item
          sx={{
            display: 'flex',
            padding: '0.5rem 0rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            marginLeft: '0.5rem',
          }}
        >
          <img src={tick.src} alt="tick" />
          <Typography variant="body-s-reg">Verified</Typography>
        </Grid>
      </InputAdornment>
    );
  } else if (greenTickFlag && value && disabled) {
    adornment = (
      <InputAdornment position="start" key={id}>
        <Grid
          item
          sx={{
            display: 'flex',
            padding: '0.5rem 0rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            marginLeft: '0.5rem',
          }}
        >
          <img src={tick.src} alt="tick" />
          <Typography variant="body-s-reg">Verified</Typography>
        </Grid>
      </InputAdornment>
    );
  }

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
      <FormControl variant="standard" fullWidth sx={{ position: 'relative', mt: 2 }}>
        <LabelWithTooltip>
          <CustomInputLabel id={id} label={label} required={required} />
          {tooltip && (
            <CustomToolTip title={tooltip} placement="top" arrow tabIndex={-1}>
              <IconButton size="small" style={{ marginLeft: '4px' }}>
                <Image src={toolTipIcon} alt="svg" width={20} height={20} />
              </IconButton>
            </CustomToolTip>
          )}
        </LabelWithTooltip>
        <MuiTextField
          id={id}
          // autoComplete="off"
          autoComplete={id}
          // autoComplete="new password"
          // autoComplete="on"
          // autoFocus
          variant="outlined"
          fullWidth
          margin="normal"
          sx={inputStyle}
          required={required}
          disabled={disabled}
          defaultValue={value}
          value={value}
          onChange={onChange}
          InputProps={{
            startAdornment: showCountryCode ? (
              <InputAdornment position="start">
              </InputAdornment>
            ) : null,
            endAdornment: (
              <React.Fragment>
                {adornment}
                {showCounter && value ? (
                  <InputAdornment position="end">
                    <Typography
                      style={{
                        position: 'absolute',
                        top: '-11px',
                        right: '15px',
                        transform: 'translateY(-50%)',
                        color: theme.palette.primary.primary80,
                      }}
                      variant="body-xs-reg"
                    >{`${value.length}/${maxLength}`}</Typography>
                  </InputAdornment>
                ) : null}
                {value && !(greenTickFlag && isGstVerified) && !disabled && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClearAction(id)}>
                      <Image src={""} alt="svg" width={24} height={24} tabIndex={-1} />
                    </IconButton>
                  </InputAdornment>
                )}
              </React.Fragment>
            ),
          }}
          helperText={error ? '' : helperText}
          error={error}
          // InputLabelProps={{ shrink: false }}
          className={clsx('MuiOutlinedInput-root', className)}
          {...restProps}
          onCopy={handleCopyPaste}
          onPaste={handleCopyPaste}
        />
        <CustomInputLabel id={id} label={subLabel} required={false} />
        {error && (
          <FormHelperText
            sx={{ display: 'flex', alignItems: 'center', color: palette.error.error80 }}
          >
            <CancelIcon color="error" fontSize="small" sx={{ mr: 1 }} />
            {errorText}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default UIInput;
