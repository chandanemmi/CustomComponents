import React from 'react';

import { Grid } from '@mui/material';
import { styled } from '@mui/system';

import { Typography } from '@/components/UI';
import theme from '@/styles/theme';

interface DownloadTemplateProps {
  templateTitle?: string;
  downloadLink?: string;
  sampleLink?: string;
}

const StyledLink = styled('a')({
  cursor: 'pointer',
  color: theme.palette.primary.main,
  textDecoration: 'underline',
});

// eslint-disable-next-line no-restricted-syntax
const DownloadTemplate: React.FC<DownloadTemplateProps> = ({
  templateTitle,
  downloadLink = '',
  sampleLink,
}) => {

  const handleDownload = () => {
    const downloadLinkArr = downloadLink.split('/');
    fetch(downloadLink)
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', downloadLinkArr[downloadLinkArr.length - 1]);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading zip file:', error);
      });
  };

  return (
    <Grid container mt={7}>
      <Grid
        item
        sx={{
          padding: '0.625rem',
          borderRadius: '0.5rem',
          background: theme.palette.yellow.secondary20,
        }}
      >
        <Typography variant="body-s" color={theme.palette.primary.contrastText}>
          <StyledLink onClick={handleDownload}>
            <Typography variant="body-s" component="a">
              Download
            </Typography>
          </StyledLink>{' '}
          {templateTitle} template
        </Typography>
      </Grid>
      <Grid item mt={3} mb={6} pl={1}>
        {/* <Typography variant="body-s" color={theme.palette.primary.primary80}>
          Check a{' '}
          <StyledLink
            onClick={() =>
              window.open('@assets/brand_authorisation_document/TMAuthorisationSampleFormat.docx')
            }
          >
            <Typography variant="body-s" component="a">
              sample
            </Typography>
          </StyledLink>{' '}
          in case you are not sure how to fill the details.
        </Typography> */}
      </Grid>
    </Grid>
  );
};

export default DownloadTemplate;
