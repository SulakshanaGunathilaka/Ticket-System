import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, MenuItem } from '@material-ui/core';

export default function AddressForm({ onPersonalDetailsChange }) {

    const handleBlur = () => {
        // Call parent component callback function with form data
        onPersonalDetailsChange({
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            otherName: document.getElementById('otherName').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            primaryContact: document.getElementById('primaryContact').value,
            secondaryContact: document.getElementById('secondaryContact').value,
            nic: document.getElementById('nic').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value
        });
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Personal Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={4} sm={6}>
                    <TextField
                        required
                        id="otherName"
                        name="otherName"
                        label="Other names"
                        fullWidth
                        autoComplete="given-name"
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="dateOfBirth"
                        name="dateOfBirth"
                        label="Date Of Birth"
                        fullWidth
                        type='date'
                        defaultValue="2020-01-01" // Example default date
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="primaryContact"
                        name="primaryContact"
                        label="Primary Contact"
                        fullWidth
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="secondaryContact"
                        name="secondaryContact"
                        label="Secondary Contact"
                        fullWidth
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="nic"
                        name="nic"
                        label="NIC"
                        fullWidth
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="gender"
                        name="gender"
                        label="Gender"
                        fullWidth
                        onBlur={handleBlur}
                        select // indicates that this TextField will be a select input
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        onBlur={handleBlur}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
