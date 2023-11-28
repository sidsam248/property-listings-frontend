"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import ImageGrid from '../ui/image-grid/image-grid';

export default function Page() {
  const [availablePropertyTypes, setAvailablePropertyTypes] = useState<string[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [propertyType, setPropertyType] = useState<string>('');
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [propertyName, setPropertyName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const cameraInput = useRef(null as any);

  const handlePropertyTypeChange = (event: SelectChangeEvent<string>) => {
    setPropertyType(event.target.value);
  };

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    setLocation(event.target.value);
  };

  const handleNewLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation(event.target.value);
  };

  const handlePropertyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyName(event.target.value);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  const handleOpenCamera = () => {
    cameraInput.current?.click();
  };

  const handleClearInputs = () => {
    setPropertyType('');
    setLocation('');
    setNewLocation('');
    setPropertyName('');
    setNotes('');
    setImages([]);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const newImages = [...images, base64String]
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  let domain_name = 'https://property-listings-backend-e7b1819abdc9.herokuapp.com/';

  const getUpdatedData = async () => {
    axios.get(`${domain_name}/get_initial_data.json`)
    .then((response) => {
      setAvailablePropertyTypes(response.data.property_types);
      setAvailableLocations(response.data.locations);
    })
    .catch((error) => {
    });
  }

  const createPropertyListing = async () => {

    let locationToSend = newLocation || location;

    axios.post(`${domain_name}/create_listing.json`, {
      property_type: propertyType,
      location_name: locationToSend,
      property_name: propertyName,
      notes: notes,
      images: images
    })
    .then((response) => {
      handleClearInputs();
      getUpdatedData();
      console.log("SUCCESSFUL");
    })
    .catch((error) => {
        console.log(error);
    });
  };

  useEffect(() => {
    getUpdatedData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        New Property Listing
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id = "property-type-select">Property Type</InputLabel>
            <Select
              labelId = "property-type-select"
              label = "Property Type"
              value={propertyType}
              onChange={handlePropertyTypeChange}
            >
              {availablePropertyTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id = "location-select">Location</InputLabel>
            <Select
              value={location}
              label = "Location"
              labelId = "location-select"
              onChange={handleLocationChange}
            >
              {availableLocations.map((loc, index) => (
                <MenuItem key={index} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="New Location"
            value={newLocation}
            onChange={handleNewLocationChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Property Name"
            value={propertyName}
            onChange={handlePropertyNameChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            value={notes}
            onChange={handleNotesChange}
            fullWidth
          />
        </Grid>
        <input onChange = {handleFileInputChange} ref = {cameraInput} type="file" hidden accept="image/*" capture="environment"></input>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenCamera}
            disabled={!propertyType || !(location || newLocation) || !propertyName}
          >
            Open Camera
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={createPropertyListing}
          >
            Save and Exit
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
        <ImageGrid images={images}/>
      </Grid>
    </Container>
  );
}
