import type { SystemStyleObject, Theme } from '@mui/system';
import type { FC, ReactNode } from 'react';

interface Children {
  children: ReactNode;
}

export type Component<E = unknown> = FC<E>;

export type Layout<E = unknown> = FC<Children & E>;

export interface GlobalErrorType {
  error: Error & { digest?: string };
  reset: () => void;
}

export type SX = SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);
