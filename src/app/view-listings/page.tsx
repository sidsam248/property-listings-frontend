"use client";

import { useEffect, useState } from 'react';
import { Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import ImageGrid from '../ui/image-grid/image-grid';

export default function Page() {

  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [propertyNames, setPropertyNames] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');

  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedPropertyName, setSelectedPropertyName] = useState<string>('');

  const handleClear = () => {
    setSelectedPropertyType('');
    setSelectedLocation('');
    setSelectedPropertyName('');
    setLocations([]);
    setPropertyNames([]);
    setImages([]);
    setNotes('');
  };

  let domain_name = 'https://property-listings-backend-e7b1819abdc9.herokuapp.com/';

  const handleDelete = () => {
    axios
      .post(`${domain_name}/delete_listing.json?property_type=${selectedPropertyType}&location_name=${selectedLocation}&property_name=${selectedPropertyName}`)
      .then((response) => {
        // Handle success
        handleClear();
      })
      .catch((error) => {
        // Handle error
        console.error('Error deleting property:', error);
      });
  };

  useEffect(() => {
    axios
      .get(`${domain_name}/get_listings.json`)
      .then((response) => {
        setPropertyTypes(response.data.property_types);
      })
      .catch((error) => {
        console.error('Error fetching property_types:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedPropertyType) {
      axios
        .get(`${domain_name}/get_listings.json?property_type=${selectedPropertyType}`)
        .then((response) => {
          setLocations(response.data.locations);
        })
        .catch((error) => {
          console.error('Error fetching locations:', error);
        });
    }
  }, [selectedPropertyType]);

  useEffect(() => {
    if (selectedLocation) {
      axios
        .get(`${domain_name}/get_listings.json?property_type=${selectedPropertyType}&location_name=${selectedLocation}`)
        .then((response) => {
          setPropertyNames(response.data.property_names);
        })
        .catch((error) => {
          console.error('Error fetching property_names:', error);
        });
    }
  }, [selectedLocation, selectedPropertyType]);

  useEffect(() => {
    if (selectedPropertyName) {
      axios
        .get(`${domain_name}/get_listings.json?property_type=${selectedPropertyType}&location_name=${selectedLocation}&property_name=${selectedPropertyName}`)
        .then((response) => {
          setImages(response.data.images);
          setNotes(response.data.notes);
        })
        .catch((error) => {
          console.error('Error fetching images:', error);
        });
    }
  }, [selectedPropertyName, selectedLocation, selectedPropertyType]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id = "property-type-select">Property Type</InputLabel>
            <Select
              value={selectedPropertyType}
              labelId = "property-type-select"
              placeholder="Select Property Type"
              label="Property Type"
              onChange={(e) => setSelectedPropertyType(e.target.value as string)}
            >
              {propertyTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {selectedPropertyType && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id = "location-select">Select Location</InputLabel>
              <Select
                value={selectedLocation}
                labelId="location-select"
                label="Select Location"
                placeholder="Select Location"
                onChange={(e) => setSelectedLocation(e.target.value as string)}
              >
                {locations.map((location, index) => (
                  <MenuItem key={index} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {selectedLocation && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id = "property-name-select">Property Name</InputLabel>
              <Select
                value={selectedPropertyName}
                labelId="property-name-select"
                placeholder="Select Property Name"
                label="Property Name"
                onChange={(e) => setSelectedPropertyName(e.target.value as string)}
              >
                {propertyNames.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {selectedPropertyName && (
          <Grid item xs={12}>
            <TextareaAutosize
              readOnly
              aria-label="Notes"
              placeholder={notes}
              style={{ width: '100%' }}
            />
          </Grid>
        )}
        {(selectedPropertyType || selectedLocation || selectedPropertyName) && (
          <Grid item xs={12}>
            <Button fullWidth onClick={handleClear} color="error">
              Clear
            </Button>
          </Grid>
        )}
        {images.length > 0 && (
          <Grid item xs={12}>
            <Button fullWidth color="warning" onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
        )}
        {selectedPropertyName && (
          <ImageGrid images = {images}/>
        )}
      </Grid>
    </Container>
  );
}
