'use client'

import { Box, styled } from '@mui/material';
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HouseIcon from '@mui/icons-material/House';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import * as React from 'react';
import { useRouter } from 'next/navigation';

const BottomNavigation = styled(MuiBottomNavigation)(`
  background-color: black;
`);

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: white;
`);

export default function GlobalBottomNav() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  return (
    <>
    <Box className="fixed bottom-0 w-full">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        } }
      >
        <BottomNavigationAction onClick = {() => router.push('/view-listings')} label="View Listings" icon={<HouseIcon />} />
        <BottomNavigationAction onClick = {() => router.push('/create-listing')} label="New Property" icon={<HolidayVillageIcon />} />
        <BottomNavigationAction label="New Client" icon={<PersonAddAltIcon />} />
        <BottomNavigationAction label="View Clients" icon={<VisibilityIcon />} />
      </BottomNavigation>
    </Box>
    </>
  );
}