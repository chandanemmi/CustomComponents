import { Card } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';

import type { SX } from '@/types';

export const UploadCard = styled(Card)`
  background: ${({ theme }) => theme.palette.neutral.neutral20};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(5)};
  position: relative;
  border-radius: ${({ theme }) => theme.spacing(2)};
`;

export const RejectedFileContainer = styled(Card)`
  background: ${({ theme }) => theme.palette.neutral.neutral20};
  border-radius: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(5)};
  height: ${({ theme }) => theme.spacing(20)};
`;

export const CancelIconStyle: SX = theme => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  cursor: 'pointer',
});
