// DialogComponent.tsx
import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image';

import Background from '@/assets/backdrop.svg';
import theme from '@/styles/theme';

import Typography from '../typography/Typography';

import type { Component } from '@/types';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonLabel?: string;
  useBackgroundImage?: boolean;
}

const CustomDialog: Component<CustomDialogProps> = ({
  open,
  onClose,
  title,
  description,
  buttonLabel = 'Okay',
  useBackgroundImage = false,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        borderRadius: '32px',
        minWidth: '500px',
        ...(useBackgroundImage && {
          backgroundImage: `url(${Background.src})`,
          backgroundSize: '50%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }),
      },
    }}
  >
    <DialogTitle>
      <Typography variant="body-m-bold" color={theme.palette.primary.contrastText} pt={2}>
        {title}
      </Typography>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <Typography variant="body-xs">{description}</Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ padding: '12px 35px 42px 8px' }}>
      <Button onClick={onClose} variant="contained" color="primary">
        {buttonLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CustomDialog;
