import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import CommonToasts from "../common/Toasts";
import axios from "axios";
import urls from "../common/Urls";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/AuthenticationService";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(2, 0, 3),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Personal Details', 'Other Details'];

export default function Checkout() {
  const classes = useStyles();
  const user1 = AuthService.getCurrentUser();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {},
    otherDetails: {}
  });

  const handlePersonalDetailsChange = (data) => {
    console.log("Data", data)
    setFormData(prevState => ({
      ...prevState,
      personalDetails: data,
    }));
  };

  const handleOtherDetailsChanges = (data) => {
    console.log("other details", data)
    setFormData(prevState => ({
        ...prevState,
        otherDetails: data,
    }))
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    
    console.log("Combined ",formData);
    let submitValues = {
        firstName: formData.personalDetails.firstName,
        lastName: formData.personalDetails.lastName,
        otherName: formData.personalDetails.otherName,
        dateOfBirth: formData.personalDetails.dateOfBirth,
        primaryContact: formData.personalDetails.primaryContact,
        secondaryContact: formData.personalDetails.secondaryContact,
        nic: formData.personalDetails.nic,
        gender: formData.personalDetails.gender,
        email: formData.personalDetails.email,
        address: formData.otherDetails.address,
        joinedDate: formData.otherDetails.joinedDate,
        agency: formData.otherDetails.agency,
        epf: formData.otherDetails.epf,
        department: formData.otherDetails.department,
        designation: formData.otherDetails.designation,
        designationLevel: formData.otherDetails.designationLevel

    }
    console.log("submit values : ", submitValues)
    axios({

        method: "post",
        url: urls.CREATE_USER,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: submitValues,
  
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
  
        if (res.status == 200) {
          CommonToasts.basicToast("User Created Successfully");
          navigate("/employees")
        } else {
          CommonToasts.errorToast("Error while creating user");
        }
        console.log("Response",res.data);
      });
    // For now, let's just move to the next step
    handleNext();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm onPersonalDetailsChange={handlePersonalDetailsChange} />;
      case 1:
        return <PaymentForm onOtherDetailsChanges={handleOtherDetailsChanges} />;
      default:
        throw new Error('Unknown step');
    }
  }
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            New User
          </Typography>
        
          <React.Fragment>
            
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
