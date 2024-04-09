import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function PaymentForm({ onOtherDetailsChanges }) {

  const handleBlur = () => {

    onOtherDetailsChanges({
        address: {
            addressLine1: document.getElementById('addressLine1').value,
            addressLine2: document.getElementById('addressLine2').value,
            city: document.getElementById('city').value,
        },
        joinedDate: document.getElementById('joinedDate').value,
        agency: document.getElementById('agency').value,
        epf: document.getElementById('epf').value,
        department: document.getElementById('department').value,
        designation: document.getElementById('designation').value,
        designationLevel: document.getElementById('designationLevel').value

    });
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Other Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
            required 
            id="addressLine1" 
            label="Address Line 1" 
            fullWidth 
            autoComplete="cc-name" 
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="addressLine2"
            label="Address Line 2"
            fullWidth
            autoComplete="cc-number"
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            required 
            id="joinedDate" 
            label="Joined Date" 
            fullWidth 
            autoComplete="cc-exp" 
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="agency" 
            name="agency" 
            label="Agency" 
            fullWidth 
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="epf"
            name="epf"
            label="EPF Number"
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="department"
            name="department"
            label="Department"
            fullWidth
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="designation"
            name="designation"
            label="Designation"
            fullWidth
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="designationLevel"
            name="designationLevel"
            label="Designation Level"
            fullWidth
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
