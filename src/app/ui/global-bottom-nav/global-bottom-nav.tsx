'use client';

import { Box, styled } from '@mui/material';
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HouseIcon from '@mui/icons-material/House';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

const BottomNavigation = styled(MuiBottomNavigation)(`
  background-color: black;
`);

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: white;
`);

type RouteParams = {
  [key: string]: number;
}

export default function GlobalBottomNav() {
  const routeValues: RouteParams = {
    "/view-listings": 0,
    "/create-listing": 1,
    "/create-client": 2,
    "/view-clients": 3
  }
  const pathname: string = usePathname()
  const [value, setValue] = React.useState(routeValues[pathname] as keyof RouteParams);
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
        <BottomNavigationAction onClick = {() => router.push('/create-client')} label="New Client" icon={<PersonAddAltIcon />} />
        <BottomNavigationAction onClick = {() => router.push('/view-clients')} label="View Clients" icon={<VisibilityIcon />} />
      </BottomNavigation>
    </Box>
    </>
  );
}