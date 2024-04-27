import React from 'react';

import { Typography as MuiTypography } from '@mui/material';
import clsx from 'clsx';

import { typographyStyle } from '@/components/UI/typography/Typography.style';

import type { UITypographyProps } from '@/components/UI/typography/Typography.type';
import type { Component } from '@/types';

const DEFAULT_VARIANT = 'heading-xl';

const Typography: Component<UITypographyProps> = props => {
  const { className = '', variant = DEFAULT_VARIANT, ...rest } = props;

  return (
    <MuiTypography
      {...rest}
      sx={typographyStyle}
      className={clsx('ui-typography', className, `ui-typography-${variant}`)}
    />
  );
};

export default Typography;
