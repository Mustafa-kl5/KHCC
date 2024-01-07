import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addPatient } from "services/nursing";
import { iPatient } from "types/Patient";
import { getStudyId } from "utils/getStudyId";

import { addPatientSchema } from "validation-schema/addPatientSchema";

export const AddPatientForm = () => {
  const [index, setIndex] = useState<0 | 1>(0);
  const navigate = useNavigate();

  const [massageDetails, setMassageDetails] = useState<{
    err: Boolean;
    open: Boolean;
    massage: string;
  }>({ err: false, open: false, massage: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (event: unknown, newValue: 0 | 1) => {
    setValue("ssn", "");
    setValue("mrn", "");
    setIndex(newValue);
  };

  const onSubmit = async (data: iPatient | any) => {
    const {
      patientName,
      ssn,
      mrn,
      dayCode,
      researchId,
      birthDate,
      admitionRecDate,
      gender,
      sampleDrawing,
    } = data;
    try {
      setIsSubmitting(true);
      const studyId = getStudyId()._id
      const res = (await addPatient(
        studyId,
        patientName,
        ssn,
        mrn,
        dayCode,
        researchId,
        birthDate,
        admitionRecDate,
        gender,
        sampleDrawing
      )) as { message: string };
      setMassageDetails({ err: false, open: true, massage: res.message });
      navigate("/");
    } catch (err: any) {
      setMassageDetails({
        err: true,
        open: true,
        massage: err?.response.data?.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(addPatientSchema),
    defaultValues: {
      patientName: "",
      mrn: "",
      ssn: "",
      dayCode: "",
      researchId: "",
      birthDate: "",
      admitionRecDate: "",
      gender: "",
      sampleDrawing: "",
    },
    mode: "onChange",
  });

  function a11yProps(index: any) {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  }

  function TabPanel(props: any) {
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
              name={index === 0 ? "mrn" : "ssn"}
              control={control}
              render={({ field }) => (
                <TextField
                  error={(errors.ssn && true) || (errors.mrn && true)}
                  {...field}
                  label={index === 0 ? "MRN" : "SSN"}
                  className="w-full"
                  helperText={
                    (errors.ssn && errors.ssn.message) ||
                    (errors.mrn && errors.mrn.message) ||
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
              minWidth: 300,
              maxWidth: "100%",
            }}
          >
            <Tabs
              className="mb-3"
              value={index}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="MRN" {...a11yProps(0)} />
              <Tab label="SSN" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={index} index={0}></TabPanel>
            <TabPanel value={index} index={1}></TabPanel>
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
          disabled={!isValid || isSubmitting}
        >
          <div className="flex gap-2 items-center">
            <span>Add Patient</span>
            {isSubmitting && (
              <CircularProgress className="!w-[1rem] !h-[1rem]" />
            )}
          </div>
        </Button>
      </form>
      <Snackbar
        open={massageDetails.open && true}
        autoHideDuration={3000}
        onClose={() => {
          setMassageDetails({ err: false, open: false, massage: "" });
        }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Alert
          severity={massageDetails.err ? "error" : "success"}
          onClose={() => {
            setMassageDetails({ err: false, open: false, massage: "" });
          }}
        >
          {massageDetails.massage}
        </Alert>
      </Snackbar>
    </>
  );
};
