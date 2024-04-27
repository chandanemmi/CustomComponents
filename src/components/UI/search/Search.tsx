import React, { useEffect, useRef, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { debounce } from 'lodash';

import {
  ListItemContainer,
  StyledListItem,
  StyledListItemButton,
  StyledTextField,
} from '@/components/UI/search/Search.styled';
import { palette } from '@/styles/theme/constant';

import type { Component } from '@/types';

interface SearchComponentProps {
  onUpdateSelectedBrand: (item: Brand) => void;
  stylingForPopover?: string;
  stylingForOuterGrid?: string;
}

const Search: Component<SearchComponentProps> = ({
  onUpdateSelectedBrand,
  stylingForPopover = '',
  stylingForOuterGrid = '',
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const registerSlice = useStore(state => state);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [addNewBrand, setAddNewBrand] = useState(false);
  const [loading, setLoading] = useState(false);


  const debouncedFetchBrands = useRef(
    debounce(() => {
      const newSearchTerm = inputRef.current?.value.trim() ?? '';
      if (newSearchTerm.length >= 1) {
        // Call API only if the search term has at least 2 characters
        fetchBrands(newSearchTerm, page, pageSize);
      } else {
        // If the search term is empty, setAllBrands to an empty array
        registerSlice.setAllBrands([]);
      }
    }, 500) // 1-second delay
  ).current;

  const previousSearchTermRef = useRef<string | null>(null);

  const handleSearchChange = () => {
    const currentSearchTerm = inputRef.current?.value.trim() ?? '';
    const previousSearchTerm = previousSearchTermRef.current ?? '';

    // Trigger the debounced fetchBrands if the search term has changed
    if (currentSearchTerm !== previousSearchTerm) {
      debouncedFetchBrands();
    } else {
      // If the search term is empty, setAllBrands to an empty array
      registerSlice.setAllBrands([]);
    }

    if (currentSearchTerm.length === 0) {
      registerSlice.setAllBrands([]);
    }

    // Update the previous search term
    previousSearchTermRef.current = currentSearchTerm;
  };

  // ... (existing code)

  useEffect(() => {
    const newSearchTerm = inputRef.current?.value.trim() ?? '';

    const hasMatch = !registerSlice.allBrands.some(
      item => item.name.toLowerCase() === newSearchTerm.toLowerCase()
    );
    setAddNewBrand(hasMatch);
  }, [registerSlice.allBrands, inputRef]);

  // const listContainerRef = useRef<HTMLDivElement | null>(null);
  // const [hasMore, setHasMore] = useState(true);

  // const handleScroll = () => {
  //   const container = listContainerRef.current;
  //   if (container) {
  //     const bottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100; // Adjust the threshold as needed

  //     if (bottom && hasMore && !loading) {
  //       setLoading(true);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const container = listContainerRef.current;
  //   if (container) {
  //     container.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, [listContainerRef, hasMore, loading, handleScroll]);

  return (
    <Grid container spacing={2} className="stylingForOuterGrid">
      <Grid item xs={12} style={{ width: '100%' }}>
        <StyledTextField
          variant="outlined"
          fullWidth
          label=""
          placeholder="Search for a brand and select"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="search-field"
          inputRef={inputRef}
          onChange={handleSearchChange}
        />
      </Grid>
      {inputRef.current?.value && inputRef.current?.value.trim().length > 0 && (
        <Grid item xs={12} className={stylingForPopover}>
          <ListItemContainer
          // ref={listContainerRef}
          //  onScroll={handleScroll}
          >
            {registerSlice.allBrands.map((item, index) => (
              <StyledListItem key={item._id}>
                <StyledListItemButton
                  onClick={() => onUpdateSelectedBrand(item)}
                  style={{ color: palette.primary.contrastText }}
                >
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={item.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography style={{ color: `${palette.primary.contrastText} !important` }}>
                        {item.name}
                      </Typography>
                    }
                  />
                </StyledListItemButton>
              </StyledListItem>
            ))}
            {addNewBrand && (
              <ListItem>
                <ListItemText primary={`No Results for "${inputRef.current.value}"`} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const newBrand: Brand = {
                      name: inputRef.current?.value ?? '',
                      _id: inputRef.current?.value ?? '',
                      type: '',
                      displayName: '',
                      imageUrl: '',
                    };
                    onUpdateSelectedBrand(newBrand);
                  }}
                >
                  + Add this brand
                </Button>
              </ListItem>
            )}
          </ListItemContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default Search;
