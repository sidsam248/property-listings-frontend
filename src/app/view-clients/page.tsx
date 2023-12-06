'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import axios from 'axios';

interface Client {
    id: number;
    name: string;
    phone_no: string;
    purchase_preference: string;
    location_preferences: string;
    client_status: string;
}

export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchParams, setSearchParams] = useState({
    name: '',
    phone_no: '',
    location_preferences: '',
    purchase_preference: '',
    client_status: '',
  });

  let domain_name = 'https://property-listings-backend-e7b1819abdc9.herokuapp.com';

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${domain_name}/view_clients.json`, {
        params: searchParams,
      });
      setClients(response.data.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleClearInputs = () => {
    setSearchParams({
      name: '',
      phone_no: '',
      location_preferences: '',
      purchase_preference: '',
      client_status: '',
    });
  };

  useEffect(() => {
    fetchClients();
  }, [searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleClientStatusChange = (event: SelectChangeEvent<string>) => {
    setSearchParams({ ...searchParams, ["client_status"]: event.target.value });
  };

  const handlePurchasePreferenceChange = (event: SelectChangeEvent<string>) => {
    setSearchParams({ ...searchParams, ["purchase_preference"]: event.target.value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Client Search
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
            name="name"
            label="Name"
            value={searchParams.name}
            onChange={handleInputChange}
            fullWidth
            />
        </Grid>

        <Grid item xs={12}>
            <TextField
            name="phone_no"
            label="Phone No"
            value={searchParams.phone_no}
            onChange={handleInputChange}
            fullWidth
            />
        </Grid>

        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id = "purchase-preference-select">Purchase Preference</InputLabel>
            <Select
              value={searchParams.purchase_preference}
              labelId = "purchase-preference-select"
              placeholder="Select Purchase Preference"
              label="Purchase Preference"
              onChange={handlePurchasePreferenceChange}
            >
              {["BUY", "SELL", "RENT", "LEASE"].map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
            <TextField
            name="location_preferences"
            label="Location Preference"
            value={searchParams.location_preferences}
            onChange={handleInputChange}
            fullWidth
            />
        </Grid>

        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id = "client-status-select">Client Status</InputLabel>
            <Select
              value={searchParams.client_status}
              labelId = "client-status-select"
              placeholder="Select Client Status"
              label="Client Status"
              onChange={handleClientStatusChange}
            >
              {["Signed", "Searching", "Potential"].map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            color = "error"
            onClick={handleClearInputs}
          >
            Clear
          </Button>
        </Grid>
      </Grid>

      <Grid>
        <Typography sx = {{marginTop: "10px"}} variant="h3" gutterBottom>
              Client List
        </Typography>
        <List sx = {{maxHeight: "125px", "overflowY": "scroll"}}>
          {clients && clients.map((client, index) => (
            <React.Fragment key={client.id}>
              <ListItem button>
                <ListItemText
                  primary={client.name}
                  secondary={client.phone_no}
                />
              </ListItem>
              {index < clients.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Grid>
    </Container>
  );
}
