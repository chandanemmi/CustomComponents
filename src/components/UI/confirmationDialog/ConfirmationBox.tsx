import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import theme from '@/styles/theme';

import type { Component } from '@/types';

interface ConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  handleApiCall: () => void;
  content: string;
}

const CustomConfirmationDialog: Component<ConfirmationDialogProps> = ({
  open,
  handleClose,
  handleApiCall,
  content,
}) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { borderRadius: '20px' } }}
    >
      {/* <DialogTitle id="responsive-dialog-title"></DialogTitle> */}
      <DialogContent sx={{ width: '30rem' }}>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 13,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            color: 'rgba(0, 0, 147, 1)',
            border: '1px solid rgba(181, 181, 181, 1)',
          }}
        >
          No
        </Button>
        <Button onClick={handleApiCall} autoFocus variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmationDialog;
