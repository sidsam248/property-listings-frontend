"use client";

import { useEffect, useState } from 'react';
import { Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import ImageGrid from '../ui/image-grid/image-grid';
import Loading from '../ui/loading/loading';
import SuccessAlert from '../ui/success-alert/success-alert';
import ErrorAlert from '../ui/error-alert/error-alert';

export default function Page() {

  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [propertyNames, setPropertyNames] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');

  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedPropertyName, setSelectedPropertyName] = useState<string>('');

  const [successMsg, setSuccessMsg] = useState<string>('');
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

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
        handleClear();
        setSuccessMsg(response.data.message);
        setShowSuccessMsg(true);
        setLoading(false);
  
        setTimeout(() => {
          setShowSuccessMsg(false);
        }, 3000);
      })
      .catch((error) => {
        setErrorMsg(error?.response?.data?.message);
        setShowErrorMsg(true);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 3000);
      });
  };

  useEffect(() => {
    axios
      .get(`${domain_name}/get_listings.json`)
      .then((response) => {
        setPropertyTypes(response.data.property_types);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setShowErrorMsg(true);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 3000);
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
          setErrorMsg(error.response.data.message);
          setShowErrorMsg(true);
          setTimeout(() => {
            setShowErrorMsg(false);
          }, 3000);
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
          setErrorMsg(error.response.data.message);
          setShowErrorMsg(true);
          setTimeout(() => {
            setShowErrorMsg(false);
          }, 3000);
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
          setErrorMsg(error.response.data.message);
          setShowErrorMsg(true);
          setTimeout(() => {
            setShowErrorMsg(false);
          }, 3000);
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
        {showSuccessMsg && <SuccessAlert message = {successMsg} />}
        {showErrorMsg ? <ErrorAlert message = {errorMsg} /> : null}
        {loading && <Loading />}
      </Grid>
    </Container>
  );
}
