import React from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import HelpIcon from "@mui/icons-material/Help";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
  TextField as MuiTextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

import clearIcon from "../../assets/ic_close_remove.svg"
import toolTipIcon from "../../assets/ic_help.svg";
import tick from "../../assets/ic_success_colored.svg";

import type {
  UIInputLabel,
  UITextFieldProps,
} from "../Input/Input.type";
import type { Component } from "../../types";

const LabelWithTooltip = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const CustomInputLabel: Component<UIInputLabel> = ({ id, label, required }) => (
  <InputLabel
    htmlFor={id}
    sx={{
      position: "relative",
      top: "1px",
      left: "9px",
      zIndex: 1,
      padding: "0 5px",
      fontSize: "14px",
      transform: "none",
      color: "grey",
      "&.Mui-focused": {
        color: "#000",
      },
    }}
    tabIndex={-1}
  >
    {label}
    {required && <span>*</span>}
  </InputLabel>
);
const UIInput: Component<UITextFieldProps> = (props) => {
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
            display: "flex",
            padding: "0.5rem 0rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginLeft: "0.5rem",
          }}
        >
          <img src={tick.src} alt="tick" />
          <Typography>Verified</Typography>
        </Grid>
      </InputAdornment>
    );
  } else if (greenTickFlag && value && disabled) {
    adornment = (
      <InputAdornment position="start" key={id}>
        <Grid
          item
          sx={{
            display: "flex",
            padding: "0.5rem 0rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginLeft: "0.5rem",
          }}
        >
          <img src={tick.src} alt="tick" />
          <Typography>Verified</Typography>
        </Grid>
      </InputAdornment>
    );
  }

  return (
    <Grid sx={{ display: "flex", flexDirection: "row" }}>
      <FormControl
        variant="standard"
        fullWidth
        sx={{ position: "relative", mt: 2 }}
      >
        <LabelWithTooltip>
          <CustomInputLabel id={id} label={label} required={required} />
          {tooltip && (
            // <CustomToolTip title={tooltip} placement="top" arrow tabIndex={-1}>
              <IconButton size="small" style={{ marginLeft: "4px" }}>
                <img src={toolTipIcon} alt="svg" width={20} height={20} />
              </IconButton>
            // </CustomToolTip>
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
          sx={}
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
                        position: "absolute",
                        top: "-11px",
                        right: "15px",
                        transform: "translateY(-50%)",
                        color: "grey",
                      }}
                      variant="body-xs-reg"
                    >{`${value.length}/${maxLength}`}</Typography>
                  </InputAdornment>
                ) : null}
                {value && !(greenTickFlag && isGstVerified) && !disabled && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClearAction(id)}>
                      <img
                        src={clearIcon}
                        alt="svg"
                        width={24}
                        height={24}
                        tabIndex={-1}
                      />
                    </IconButton>
                  </InputAdornment>
                )}
              </React.Fragment>
            ),
          }}
          helperText={error ? "" : helperText}
          error={error}
          // InputLabelProps={{ shrink: false }}
          className={clsx("MuiOutlinedInput-root", className)}
          {...restProps}
          onCopy={handleCopyPaste}
          onPaste={handleCopyPaste}
        />
        <CustomInputLabel id={id} label={subLabel} required={false} />
        {error && (
          <FormHelperText
            sx={{
              display: "flex",
              alignItems: "center",
              color: "palegoldenrod",
            }}
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
