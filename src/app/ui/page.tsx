'use client';

import React, { useState } from 'react';

import { Grid, MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';

import { DatePicker, Input, Phone, Select, Typography } from '@/components/UI';
import CountrySelect from '@/components/UI/countrySelect/CountrySelect';
import SingleFileUpload from '@/components/UI/fileUpload/FileUpload';
import theme from '@/styles/theme';

import type { Country } from '@/components/UI/countrySelect/CountrySelect';
import type { SelectChangeEvent } from '@mui/material';
import type { Dayjs } from 'dayjs';
import type { ChangeEvent, FC, ReactNode, SetStateAction } from 'react';

const UI : FC = () => {
  // const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [countriesData, setCountriesData] = useState<Country[]>([
    {
      value: 'india',
      label: 'India',
      flag: '🇮🇳',
    },
  ]);
  const [selectedCountry, setSelectedCountry] = useState({
    value: 'india',
    label: 'India',
    flag: '🇮🇳',
  });

  const [dateValue, setDateValue] = useState<Dayjs | null | unknown>(null);
  // const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState<SetStateAction<File[]>>([]);

  const [age, setAge] = useState<string | unknown>('');

  const handleSelectChange = (event: SelectChangeEvent<unknown>, _child?: ReactNode) => {
    setAge(event.target.value);
  };

  /*
   * Commented out the code fetching countries data and setting default country temporarily.
   * This block is using fixed values for now. Uncomment when moving to internationalization.
   */
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const countries = fetchCountriesData();
  //     setCountriesData(countries);

  //     const defaultCountry = countries.find(country => country.value === 'IN') || null;
  //     setSelectedCountry(defaultCountry);
  //   };

  //   fetchData();
  // }, []);

  // eslint-disable-next-line prettier/prettier
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {};

  const handleAcceptedFiles = (files: File[]) => {
    setAcceptedFiles(files);
  };
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item sx={{ padding: `${theme.spacing(10)} ${theme.spacing(10)}`, width: '100%' }}>
        <Typography variant="heading-s">Demo Components</Typography>
      </Grid>
      <Grid
        container
        sx={{ padding: `0 ${theme.spacing(10)}`, width: '100%' }}
        flexDirection="row"
        flexWrap="wrap"
      >
        <Grid
          item
          xs={6}
          sx={{ paddingTop: `${theme.spacing(4)}`, paddingRight: `${theme.spacing(10)}` }}
        >
          <Typography variant="body-m">Input Cases</Typography>
          <br />
          <Input 
            label="GST Number"
            placeholder="Placeholder"
            value={value}
            onChange={handleChange}
            required
            maxLength={15}
            helperText="Helper Text"
            tooltip="A GST number is required to sell products with Reliance."
            showCounter
            id="gst"
          />
          <br />
          <Input
            label="GST Number"
            placeholder="Placeholder"
            value={value}
            onChange={handleChange}
            required
            maxLength={15}
            helperText="Error Text"
            tooltip="A GST number is required to sell products with Reliance."
            showCounter
            error
            errorText="Error Text"
            id=""
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ paddingTop: `${theme.spacing(4)}`, paddingRight: `${theme.spacing(10)}` }}
        >
          <Typography variant="body-m">Button Variants</Typography>
          <Grid item style={{ paddingTop: theme.spacing(4) }}>
            <Button variant="contained" size="medium">
              Contained Button
            </Button>
          </Grid>
          <Grid item style={{ paddingTop: theme.spacing(2) }}>
            <Button variant="contained" size="large" disabled>
              {' '}
              Contained & disabled{' '}
            </Button>
          </Grid>
          <Grid item style={{ paddingTop: theme.spacing(2) }}>
            <Button variant="text">Text Button</Button>
          </Grid>
          <Grid item style={{ paddingTop: theme.spacing(2) }}>
            <Button variant="text" disabled>
              Text Button disabled
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ paddingTop: `${theme.spacing(4)}`, paddingRight: `${theme.spacing(10)}` }}
        >
          <Typography variant="body-m">Country of business*</Typography>
          <br />
          {/* <CountrySelect
            value={selectedCountry}
            onChange={setSelectedCountry}
            countries={countriesData}
          /> */}
          <br />
          <p>Selected Country: {selectedCountry?.label || 'None'}</p>
          <Button variant="contained">Continue</Button>
          <Button variant="contained" disabled>
            Continue
          </Button>
        </Grid>
        {/* <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
          <DatePicker />
        </DemoItem> */}
        <Grid
          item
          xs={6}
          sx={{ paddingTop: `${theme.spacing(4)}`, paddingRight: `${theme.spacing(10)}` }}
        >
          <Typography variant="body-m">Select Demo</Typography>
          <br />
          {/* <Select
            id="age"
            helperText="Select Age"
            label="Select Age"
            value={age}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ paddingTop: `${theme.spacing(4)}`, paddingRight: `${theme.spacing(10)}` }}
        >
          {/* <DatePicker
            displayLabel="Date Picker"
            views={['month', 'year']}
            value={dateValue}
            renderInput={props => <TextField {...props} />}
            onChange={newValue => setDateValue(newValue)}
          /> */}

          <Grid item style={{ marginTop: theme.spacing(4) }}>
            <Typography variant="body-m"> Upload File</Typography>
            <br />
            {/* It takes FileType,classname and callback to set file into state */}
            {/* <Typography variant="body-m"> PDF File</Typography>
            <SingleFileUpload fileType="pdf" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> SVG File</Typography>

            <SingleFileUpload fileType="svg" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> DOC File</Typography>

            <SingleFileUpload fileType="docx" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> PNG File</Typography>

            <SingleFileUpload fileType="png" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> JPG File</Typography>

            <SingleFileUpload fileType="jpg" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> Text File</Typography>

            <SingleFileUpload fileType="txt" acceptedFileCallback={handleAcceptedFiles} /> */}
          </Grid>
          {/* <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
          <DatePicker />
        </DemoItem> */}
          <Grid
            item
            xs={6}
            sx={{ paddingTop: `${theme.spacing(4)}`, paddingRight: `${theme.spacing(10)}` }}
          >
            <Typography variant="body-m">Select Demo</Typography>
            <br />
            {/* <Select
              id="age"
              helperText="Select Age"
              label="Select Age"
              value={age}
              onChange={handleSelectChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ paddingTop: `${theme.spacing(4)}`, paddingRight: `${theme.spacing(10)}` }}
          >
            {/* <DatePicker
              displayLabel="Date Picker"
              value={dateValue}
              renderInput={props => <TextField {...props} />}
              onChange={newValue => setDateValue(newValue)}
            /> */}
          </Grid>

          <Grid item style={{ marginTop: theme.spacing(4) }}>
            <Typography variant="body-m"> Upload File</Typography>
            <br />
            {/* It takes FileType,classname and callback to set file into state */}
            {/* <Typography variant="body-m"> PDF File</Typography>
            <SingleFileUpload fileType="pdf" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> SVG File</Typography>

            <SingleFileUpload fileType="svg" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> DOC File</Typography>

            <SingleFileUpload fileType="docx" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> PNG File</Typography>

            <SingleFileUpload fileType="png" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> JPG File</Typography>

            <SingleFileUpload fileType="jpg" acceptedFileCallback={handleAcceptedFiles} />
            <Typography variant="body-m"> Text File</Typography>

            <SingleFileUpload fileType="txt" acceptedFileCallback={handleAcceptedFiles} /> */}
          </Grid>
        </Grid>
        <br />
        <Phone
          country="in"
          placeholder="Enter Phone Number"
          value={value}
          onChange={setPhone}
          inputProps={{
            name: 'business-phone',
            required: true,
            autoFocus: true,
          }}
          id="phone"
          tooltip="A GST number is required to sell products with Reliance."
          required
          label="Business phone number"
        />
      </Grid>
      {/* </StyledInputBox> */}
    </Grid>
  );
};

export default UI;
