'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Search from './search';
import SearchResult from './SearchResult';

export default function SearchAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar 
                    sx={{ 
                        backgroundColor: '#8B0000',
                        background: 'linear-gradient(to right, #8B0000, #A52A2A)',
                        padding: '0.5rem 2rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    <div className="container mx-auto flex items-center justify-between relative">
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
                            <div className='w-[300px] relative'>
                               
                                <SearchResult />
                            </div>

                            {/* <Button 
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
                            </Button> */}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
