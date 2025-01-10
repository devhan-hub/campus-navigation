"use client";
import React from "react";
import { Search as SearchIcon, X as XIcon } from "lucide-react";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useData } from "../utiles/mapDataContext";

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: '3rem',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

export default function Search() {
  const { searchItemHandeler, resetList } = useData();

  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon size={20} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search campus locations..."
        onChange={(e) => searchItemHandeler(e.target.value)}
      />
      <div 
        onClick={resetList}
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          padding: '4px'
        }}
      >
        <XIcon size={20} />
      </div>
    </SearchWrapper>
  );
}