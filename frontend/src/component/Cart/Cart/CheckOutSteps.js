import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import "./CheckOutStep.css";

const CheckOutSteps = (props) => {
  const steps = [
    {
      lable: <Typography>Shipping Details</Typography>,
      icon: <LocalShipping />,
    },
    {
      lable: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      lable: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper
        alternativeLabel
        activeStep={props.activeStep}
        style={stepStyles}
      >
        {steps.map((item, index) => {
          return (
            <Step
              key={index}
              active={props.activeStep === index ? true : false}
              completed={props.activeStep >= index ? true : false}
            >
              <StepLabel
                icon={item.icon}
                style={{
                  color:
                    props.activeStep >= index ? "tomato" : "rgba(0 ,0, 0, 0.649)",
                }}
              >
                {item.lable}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Fragment>
  );
};

export default CheckOutSteps;
