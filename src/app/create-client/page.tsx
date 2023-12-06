'use client'
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import SuccessAlert from '../ui/success-alert/success-alert';
import Loading from '../ui/loading/loading';
import ErrorAlert from '../ui/error-alert/error-alert';

export default function CreateClient() {
  const [name, setName] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [locationPreferences, setLocationPreferences] = useState<string>('');
  const [purchasePreference, setPurchasePreference] = useState<string>('');
  const [clientStatus, setClientStatus] = useState<string>('');

  const [successMsg, setSuccessMsg] = useState<string>('');
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleClearInputs = () => {
    setName('');
    setPhoneNo('');
    setLocationPreferences('');
    setPurchasePreference('');
    setClientStatus('');
    setShowSuccessMsg(false);
    setSuccessMsg('');
  };

  let domain_name = 'https://property-listings-backend-e7b1819abdc9.herokuapp.com';

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(event.target.value);
  };

  const handleLocationPreferencesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationPreferences(event.target.value);
  };

  const handlePurchasePreferenceChange = (event: SelectChangeEvent<string>) => {
    setPurchasePreference(event.target.value);
  };

  const handleClientStatusChange = (event: SelectChangeEvent<string>) => {
    setClientStatus(event.target.value);
  };

  const handleCreateClient = () => {
    setLoading(true);

    axios.post(`${domain_name}/create_client.json`, {
      name,
      phone_no: phoneNo,
      location_preferences: locationPreferences,
      purchase_preference: purchasePreference,
      status: clientStatus,
    })
    .then((response) => {
      setSuccessMsg(response.data.message);
      setShowSuccessMsg(true);
      setLoading(false);
      handleClearInputs();
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 3000);
    })
    .catch((error) => {
      setErrorMsg(error?.response?.data?.message || 'Error creating client');
      setShowErrorMsg(true);
      setLoading(false);

      setTimeout(() => {
        setShowErrorMsg(false);
      }, 3000);
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Client
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            value={phoneNo}
            onChange={handlePhoneNoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location Preferences"
            value={locationPreferences}
            onChange={handleLocationPreferencesChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id = "purchase-preference-select">Purchase Preference</InputLabel>
            <Select
              value={purchasePreference}
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
        <FormControl fullWidth>
            <InputLabel id = "client-status-select">Client Status</InputLabel>
            <Select
              value={clientStatus}
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
            variant="contained"
            onClick={handleCreateClient}
          >
            Create Client
          </Button>
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
        {showSuccessMsg && <SuccessAlert message={successMsg} />}
        {showErrorMsg && <ErrorAlert message={errorMsg} />}
        {loading && <Loading />}
      </Grid>
    </Container>
  );
}
