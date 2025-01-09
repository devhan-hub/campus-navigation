"use client";
import React, { useState } from "react";
import Fuse from "fuse.js";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchComponent({ setSelectedLocation, allLocations }) {

  const [searchQuery, setSearchQuery] = React.useState("");


  const fuse = new Fuse(allLocations, {
      keys: ["name", "category"],
      threshold: 0.3,
      distance: 100, 
      ignoreLocation: true,
      useExtendedSearch: true, 
  });

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log(query , 'query')
    console.log(allLocations , 'allLocations')

    if (query.trim()) {
        const results = fuse.search(query);
        const filteredResults = results.map((result) => result.item);
        setSelectedLocation(filteredResults);
    } else {
      setSelectedLocation([]);
    }
};

  return (
    <div>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
    />
  </div>

  );
}
