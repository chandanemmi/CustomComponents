import React, { useEffect, useState } from 'react';

import { Button, Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MuiOtpInput } from 'mui-one-time-password-input';
import Image from 'next/image';

import icSuccessColored from '@/assets/ic_success_colored.svg';
import icError from '@/assets/Icon.svg';
import { Typography } from '@/components/UI';
import { CodeInputContainer, StyledLabel } from '@/components/UI/otp/OTP.style';
import { useSendEmailOTP, useSendMobileOtp } from '@/features/common/common.hook';
import { useStore } from '@/store';

import type { OTPInputProps } from '@/components/UI/otp/Otp.type';
import type { Component } from '@/types/index';

const OTPInput: Component<OTPInputProps> = ({
  codeId,
  label,
  sublabel,
  codeType,
  getCode,
  verifyCode,
  value,
  validation,
  setValidation,
}) => {
  const theme = useTheme();
  const [timer, setTimer] = useState(1 * 19);
  // eslint-disable-next-line no-restricted-syntax
  type SvgComponentType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
  const { mutate: sendMobileOtpMutation, isError: mobileSentOtpError } = useSendMobileOtp();
  const { mutate: sendEmailOtpMutation, isError: mailSentOtpError } = useSendEmailOTP();
  const { sellerDetails } = useStore(state => state);

  const svgComponents: Record<string, SvgComponentType> = {
    success: icSuccessColored,
    error: icError,
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (validation.timer) {
      interval = setInterval(() => {
        setTimer(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          setValidation({ timer: false });
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [setValidation, validation]);

  const resendOTP = () => {
    setValidation({ timer: true });
    setTimer(1 * 19); // Reset the timer
    // Additional logic for resending OTP if needed

    if (codeId === 'mail') {
      sendEmailOtpMutation({
        emailId: sellerDetails.businessEmailAddress,
      });
    } else {
      sendMobileOtpMutation({
        mobileNumber: sellerDetails.businessPhoneNumber,
        countryCode: sellerDetails.countryCode,
      });
    }
  };

  const dynamicClasses: Record<string, string> = {
    success: 'success-class',
    error: 'error-class',
    warning: 'warning-class',
  };
  return (
    <CodeInputContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="otp-info">
            <StyledLabel>{label}</StyledLabel>
            <Typography variant="body-s-bold" mt={1.5}>
              {codeId === 'mobileno' ? `+91${codeType}` : codeType}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="heading-xxs">{sublabel}</Typography>
          <Grid container className="code-input" flexDirection="row">
            <Grid item xs={12} md={6} lg={4.5} className="otp">
              <MuiOtpInput
                length={6}
                TextFieldsProps={{ placeholder: '0' }}
                value={value?.toString()}
                onChange={event => {
                  setValidation({ hideValidation: true, validationState: '' });
                  const numericValue = event.replace(/[^0-9]/g, '');
                  getCode(numericValue);
                }}
                className={clsx({
                  'success-class': validation.validationState === 'success',
                  'error-class': validation.validationState === 'error',
                })}
              />
              {!validation.hideValidation && (
                <div
                  style={{ fontSize: theme.spacing(3.4), marginTop: theme.spacing(1.2) }}
                  // className={clsx({
                  //   [dynamicClasses[validation?.validationState || '']]: validation.validationState,
                  //   'common-class': true,
                  // })}
                  className={clsx({
                    [dynamicClasses[validation?.validationState ?? '']]:
                      validation?.validationState,
                    'common-class': true,
                  })}
                >
                  {/*
                  // todo fixed the src type issue
                   <Image /
                    src={svgComponents[validation.validationState]}
                    alt="svg"
                    width={15}
                    height={15}
                    style={{ marginRight: theme.spacing(1) }}
                  /> */}
                  {validation.validationLabel}
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={5} lg={6} ml={2} className="verify-button">
              {validation.hideValidation && (
                <Button
                  variant="text"
                  onClick={() => verifyCode(codeId)}
                  disabled={value === undefined || value.toString().length !== 6}
                  className="verify"
                >
                  Verify
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        {validation.hideValidation && (
          <Grid item xs={12} className="resend-otp">
            <Typography
              variant="body-xs-reg"
              style={{
                color: validation.timer
                  ? theme.palette.neutral.neutral80
                  : theme.palette.primary.main,
              }}
              // todo fixed type issue
              // disabled={validation.timer}
            >
              {validation.timer ? (
                'Resend OTP in'
              ) : (
                <Button onClick={resendOTP}>
                  <span style={{ textDecoration: 'none', cursor: 'pointer' }}> Resend OTP</span>
                </Button>
              )}
              <span style={{ margin: '5px' }}>
                {validation.timer && (
                  <React.Fragment>
                    00:
                    {timer < 10 ? `0${timer}` : timer}
                  </React.Fragment>
                )}
              </span>
            </Typography>
          </Grid>
        )}
      </Grid>
    </CodeInputContainer>
  );
};

export default OTPInput;
