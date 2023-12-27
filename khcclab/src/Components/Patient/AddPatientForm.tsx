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

  const onSubmit = async (data: any) => {
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
      admitionRecDate: "",
      birthDate: "",
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
                  error={errors.patientIdentity?.mrn && true}
                  {...field}
                  label={index === 0 ? "MRN" : "SSN"}
                  className="w-full"
                  helperText={
                    (errors.patientIdentity?.mrn &&
                      errors.patientIdentity?.mrn.message) ||
                    " "
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
        <div className="flex items-center gap-5 px-5">
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
                helperText={
                  (errors.patientName && errors.patientName.message) || " "
                }
              />
            )}
          />
          <Box
            sx={{
              bgcolor: "background.paper",
              position: "relative",
              minWidth: 350,
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

        <div className="flex gap-5 justify-between p-5">
          <div className="flex-1">
            <Controller
              name="dayCode"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.patientName && true}
                  {...field}
                  label="Day Code"
                  className="w-full "
                  helperText={
                    (errors.patientName && errors.patientName.message) || " "
                  }
                />
              )}
            />
            <Controller
              name="researchId"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.patientName && true}
                  {...field}
                  label="Research Id"
                  className="w-full "
                  helperText={
                    (errors.patientName && errors.patientName.message) || " "
                  }
                />
              )}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                sx={{ flexDirection: "row" }}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
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
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <Controller
                name="admitionRecDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    label="Admition Received"
                    value={undefined}
                    onChange={(newValue) => {
                      onChange(newValue);
                    }}
                  />
                )}
              />
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
          </LocalizationProvider>
        </div>

        <Button
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
