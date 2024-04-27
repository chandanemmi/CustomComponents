import React from 'react';

import clsx from 'clsx';

import { StyledImage } from '@/components/UI/image/Image.styled';

import type { Component } from '@/types';
import type { ImageProps } from 'next/image';

type UIImageProps = ImageProps;

const Image: Component<UIImageProps> = ({ className, ...props }) => (
  <StyledImage {...props} className={clsx('ui-image', className)} />
);

export default Image;
