'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
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
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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

export default function SearchAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar 
                    sx={{ 
                        backgroundColor: '#8B0000', // Dark red color
                        background: 'linear-gradient(to right, #8B0000, #A52A2A)', // Subtle gradient
                        padding: '0.5rem 2rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ 
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            display: { xs: 'none', sm: 'block' },
                            color: 'rgba(255, 255, 255, 0.95)'
                        }}
                    >
                        AAU Campus Navigator
                    </Typography>

                    <div className='flex items-center gap-4'>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search locations..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <Button 
                            variant="outlined" 
                            sx={{ 
                                color: 'rgba(255, 255, 255, 0.95)',
                                borderColor: 'rgba(255, 255, 255, 0.7)',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.9)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                },
                                textTransform: 'none',
                                fontWeight: 500,
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            Category
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
