import React, { Fragment, useCallback, useEffect, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress, Grid } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-duplicates
import { Box } from '@mui/system';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-duplicates
import { useTheme } from '@mui/system';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import Image from 'next/image';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDropzone } from 'react-dropzone';

import fileIcon from '@/assets/fileIcon.svg';
import ic_success_colored from '@/assets/ic_success_colored.svg';
import upload from '@/assets/upload.svg';
import {
  CancelIconStyle,
  RejectedFileContainer,
  UploadCard,
} from '@/components/UI/fileUpload/FileUpload.style';
import { Typography } from '@/components/UI/index';

import { useGetSignedUrls, useStartFileUpload } from '../../../features/common/common.hook';

import type { Component } from '@/types';
import type { FileRejection } from 'react-dropzone';
import { palette } from '@/styles/theme/constant';

interface Props {
  className?: string;
  acceptedFileCallback: (files: File[]) => void;
  fileType: string[];
  label: string;
  required: boolean;
  setFieldValue: (key: any, value: any) => void;
  field: any;
  value: any;
  fileSize: number;
  multiple?: boolean;
}

interface RejectedFile {
  file: File;
  errors: string;
}

const SingleFileUpload: Component<Props> = ({
  fileType,
  label,
  required,
  fileSize,
  setFieldValue,
  field,
  value,
  className,
  multiple = false,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);
  const theme = useTheme();
  const { startUploadMutation, relativeUrl, setRelativeUrl, progressFileUpload } =
    useStartFileUpload(files[0]);
  const { mutate: getSignedUrlMutation } = useGetSignedUrls();
  const BYTES = 1024;

  const addFile = (url: any) => {
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    const newFile = new File([], fileName, { type: 'application/pdf' });

    // Add more properties to the newFile if needed
    setFiles([newFile]);
  };
  const [fileChangeFlag, setFileChangeFlag] = useState(false); // track file changes

  useEffect(() => {
    if (relativeUrl) {
      setFieldValue(field.name, {
        documentLink: relativeUrl,
        documentType: field.documentType,
      });
    }
  }, [relativeUrl, fileChangeFlag]);

  useEffect(() => {
    if (value?.documentLink) {
      addFile(value.documentLink);
    }
  }, [value]);

  const debouncedUpload = debounce((acceptedFiles: File[]) => {
    setFileChangeFlag(!fileChangeFlag);
    if (acceptedFiles?.length) {
      setFiles(acceptedFiles);
      setRejected([]);

      const { name, size, type } = acceptedFiles[0];
      // setISUpload(true);
      startUploadMutation({
        namespace: 'test-private',
        body: {
          file_name: name,
          content_type: type,
          size,
        },
      });
    }
  }, 500); // Adjust the debounce delay as needed

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const validatedAcceptedFiles = acceptedFiles.filter(file => {
        const isFileTypeValid = fileType.some(
          type =>
            file.type === `application/${type.toLowerCase()}` ||
            file.name.toLowerCase().endsWith(`.${type.toLowerCase()}`)
        );

        if (!isFileTypeValid) {
          // If the file is not a given fileType, reject it
          setRejected([{ file, errors: 'File type must be PDF, JPEG, JPG.' }]);
          return false;
        }
        return true;
      });

      debouncedUpload(validatedAcceptedFiles);

      if (rejectedFiles?.length) {
        setFiles([]);
        setRejected([
          {
            file: new File([rejectedFiles[0].file], rejectedFiles[0].file.name, {
              type: rejectedFiles[0].file.type,
              lastModified: rejectedFiles[0].file.lastModified,
            }),
            errors: rejectedFiles[0].errors?.[0].code,
          },
        ]);
      }
    },
    [debouncedUpload, fileType]
  );

  type MimeType = `application/${string}`;

  const acceptConfig: Record<MimeType, string[]> = fileType.reduce<Record<MimeType, string[]>>(
    (config, type) => {
      const mimeType: MimeType = `application/${type.toLowerCase()}`;
      config[mimeType] = [`.${type.toLowerCase()}`];
      return config;
    },
    {}
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptConfig,
    maxSize: fileSize,
    maxFiles: 1,
    multiple,
    onDrop,
  });

  const removeFile = (name: string) => {
    setFiles(previousFiles => previousFiles.filter(file => file.name !== name));
    setFieldValue(field.name, {
      documentLink: '',
      documentType: '',
    });
    setRelativeUrl('');
  };

  const removeRejected = (name: string) => {
    setRejected(currentFiles => currentFiles.filter(({ file }) => file.name !== name));
  };

  const previewUploadedFile = () => {
    // TODO: GET doumentLink based on parentKey

    getSignedUrlMutation({
      body: {
        expiry: 1800,
        urls: [value.documentLink],
      },
    });
  };
  const errorCode = 'file-too-large';
  return (
    <Fragment>
      <Typography variant="body-m-bold" m={2}>
        {label}
        {required && <span>*</span>}
      </Typography>
      <Grid
        container
        flexDirection="column"
        sx={{ alignItems: 'stretch', width: '100%' }}
        className={className}
      >
        {!value?.documentLink ? (
          <Grid
            item
            textAlign="center"
            border="1px dashed"
            borderColor={theme.palette.primary.light}
            borderRadius={8}
            container
            sx={{
              width: '100%',
              cursor: 'pointer',
              // pointerEvents: isUpload ? 'none' : 'auto',
              minHeight: '200px',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            {!progressFileUpload && (
              <div {...getRootProps()}>
                <Grid item padding={9.5}>
                  <input {...getInputProps()} />
                  <Image src={upload} alt="drop" />
                  <Typography variant="body-xs" color={theme.palette.primary.main}>
                    {rejected.length ? 'Re-upload the document' : 'Click to upload'}
                  </Typography>
                  <Typography variant="body-xs" mb={2}>
                    or drag and drop files here
                  </Typography>
                  <Typography variant="body-xxs" color={theme.palette.neutral.neutral60}>
                    Only {fileType.join(', ')} files accepted (upto 20MB)
                  </Typography>
                </Grid>
              </div>
            )}
            {progressFileUpload && (
              <CircularProgress
                size={24}
                sx={{
                  color: palette.primary.primary80,
                }}
              />
            )}
          </Grid>
        ) : (
          value?.documentLink && (
            <Grid item sx={{ width: '100%', cursor: 'pointer' }}>
              {files.map(file => (
                <UploadCard key={file.name}>
                  {!field.inputProps.disabled && (
                    <CancelIcon
                      fontSize="small"
                      sx={CancelIconStyle}
                      onClick={() => removeFile(file.name)}
                    />
                  )}

                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    onClick={previewUploadedFile}
                  >
                    <Image src={fileIcon} alt="file" />
                    <div style={{ overflow: 'hidden' }}>
                      <Typography
                        variant="body-xs"
                        ml={4}
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {file.name}
                      </Typography>
                      {/* <Typography variant="body-xs-reg" ml={4} color={theme.palette.success.main}>
                        <Image
                          src={ic_success_colored}
                          alt="upload"
                          width={15}
                          height={15}
                          style={{ marginBottom: theme.spacing(-0.5) }}
                        />
                        <span>Upload Completed</span>
                      </Typography> */}
                    </div>
                  </Box>
                </UploadCard>
              ))}
            </Grid>
          )
        )}
        <Grid item sx={{ width: '100%' }} mb={6}>
          {files.length < 1 &&
            rejected.map(({ file }) => (
              <RejectedFileContainer>
                <Box>
                  <Image src={fileIcon} alt="file" width={50} height={50} />
                </Box>
                <Box display="flex" flexDirection="column" marginLeft={2}>
                  <Typography variant="body-xs-reg">{file.name}</Typography>
                  <Box display="flex" flexDirection="row">
                    <CancelIcon
                      color="error"
                      fontSize="small"
                      sx={{ cursor: 'pointer', marginRight: theme.spacing(2) }}
                      onClick={() => removeRejected(file.name)}
                    />
                    <Typography variant="body-xs-reg" color={theme.palette.error.main}>
                      {rejected[0].errors === errorCode
                        ? `File size larger than ${fileSize / (BYTES * BYTES)}MB is not allowed.`
                        : `File type must be ${fileType.join(',')}.`}
                      <br />
                    </Typography>
                  </Box>
                </Box>
              </RejectedFileContainer>
            ))}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SingleFileUpload;
