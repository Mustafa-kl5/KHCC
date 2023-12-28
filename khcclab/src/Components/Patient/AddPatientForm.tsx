import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { iAddPatient } from "types/addPatient";

import { addPatientSchema } from "validation-schema/addPatientSchema";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

export const AddPatientForm = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const onSubmit = async (data: iAddPatient) => {
    let o = Object.fromEntries(
      Object.entries(data.patientIdentity).filter(([_, v]) => v !== "")
    );
    data.patientIdentity = o;
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(addPatientSchema),
    defaultValues: {
      patientName: "",
      patientIdentity: { mrn: "", ssn: "" },
      dayCode: "",
      researchId: "",
      birthDate: "",
      admitionRecDate: "",
      gender: "",
      sampleDrawing: "",
    },
    mode: "onChange",
  });
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Controller
              name={index === 0 ? "patientIdentity.mrn" : "patientIdentity.ssn"}
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.patientIdentity?.ssn && true}
                  {...field}
                  label={index === 0 ? "MRN" : "SSN"}
                  className="w-full"
                  helperText={
                    errors.patientIdentity?.ssn &&
                    errors.patientIdentity?.ssn.message
                  }
                />
              )}
            />
          </Box>
        )}
      </Typography>
    );
  }
  return (
    <>
      <form>
        <div className="flex items-center flex-col-reverse lg:flex-row gap-5 px-5">
          <Controller
            name="patientName"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.patientName && true}
                {...field}
                autoFocus
                label="Patient Name"
                className="w-full self-end"
                helperText={errors.patientName && errors.patientName.message}
              />
            )}
          />
          <Box
            sx={{
              bgcolor: "background.paper",
              position: "relative",
              minWidth: 300,
              maxWidth: "100%",
            }}
          >
            <Tabs
              className="mb-3"
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="MRN" {...a11yProps(0)} />
              <Tab label="SSN" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}></TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
          </Box>
        </div>

        <div className="flex gap-5 flex-col-reverse md:flex-row justify-between p-5">
          <div className="flex-1">
            <Controller
              name="dayCode"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.dayCode && true}
                  {...field}
                  label="Day Code"
                  className="w-full "
                  helperText={(errors.dayCode && errors.dayCode.message) || " "}
                />
              )}
            />
            <Controller
              name="researchId"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.researchId && true}
                  {...field}
                  label="Research Id"
                  className="w-full "
                  helperText={
                    (errors.researchId && errors.researchId.message) || " "
                  }
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    sx={{ flexDirection: "row" }}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className=" flex flex-col gap-y-5 ">
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label="Birth Date"
                  value={undefined}
                  onChange={(newValue) => {
                    onChange(newValue);
                  }}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="admitionRecDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    label="Admition Received"
                    value={undefined}
                    onChange={onChange}
                  />
                )}
              />
            </LocalizationProvider>
            <Controller
              name="sampleDrawing"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Sample Drawing"
                  value={undefined}
                  onChange={(newValue) => {
                    onChange(newValue);
                  }}
                />
              )}
            />
          </div>
        </div>

        <Button
          className="w-full m-auto sm:w-auto"
          size="large"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <div className="flex gap-2 items-center">
            <span>Add Patient</span>
          </div>
        </Button>
      </form>
    </>
  );
};
