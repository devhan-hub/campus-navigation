'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { X, Navigation, Bookmark, Share, Phone, Globe, MapPin, Star } from 'lucide-react';
import { Typography, Button } from '@mui/material';
import { useData } from '../utiles/mapDataContext';

const ActionButton = ({ icon: Icon, label }) => (
  <Button
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#1a73e8',
      textTransform: 'none',
      gap: '4px',
      flex: 1,
      minWidth: 0,
    }}
  >
    <Icon size={24} />
    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
      {label}
    </Typography>
  </Button>
);

export default function SideNav({ open, setOpen }) {
  const {targetItem} = useData()
  if (!targetItem) return null;

  const actions = [
    { icon: Navigation, label: 'Directions' },
    { icon: Bookmark, label: 'Save' },
    { icon: Share, label: 'Share' },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          width: '400px',
          maxWidth: '90vw',
        },
      }}
    >
      <Box sx={{ height: '100%', overflow: 'auto' }}>
        {/* Header */}
        <Box sx={{ p: 2, position: 'relative' }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <X />
          </IconButton>
          
          {/* Main Image */}
          <Box
            component="img"
            src={targetItem.pictureUrl}
            alt={targetItem.name}
            sx={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: 1,
              mb: 2,
            }}
          />

          {/* Title and Rating */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            {targetItem.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Star fill="#FFD700" stroke="#FFD700" size={20} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              4.1 (87 reviews)
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            University • Wheelchair accessible
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ px: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {actions.map((action, index) => (
              <ActionButton key={index} {...action} />
            ))}
          </Box>
        </Box>

        <Divider />

        {/* Contact Information */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MapPin size={20} style={{ marginRight: 12, color: '#5f6368' }} />
            <Typography variant="body1">
              2QR7+584, King George VI St, Addis Ababa 1000, Ethiopia
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Globe size={20} style={{ marginRight: 12, color: '#5f6368' }} />
            <Typography
              variant="body1"
              component="a"
              href="https://aau.edu.et"
              sx={{ color: '#1a73e8', textDecoration: 'none' }}
            >
              aau.edu.et
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Phone size={20} style={{ marginRight: 12, color: '#5f6368' }} />
            <Typography
              variant="body1"
              component="a"
              href="tel:+251111232435"
              sx={{ color: '#1a73e8', textDecoration: 'none' }}
            >
              +251 11 123 2435
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Description */}
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">
            {targetItem.description}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
