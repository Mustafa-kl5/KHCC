import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "validation-schema/loginSchema";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const studyArr = [
  { id: 1, study: "logistics" },
  { id: 2, study: "math" },
  { id: 3, study: "sports" },
];

export const LoginForm = () => {
  const onSubmit = async (data: {
    email: string;
    study: string;
    password: string;
  }) => {
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      study: "",
      password: "",
    },
    mode: "onChange",
  });
  return (
    <>
      <form className="auth-form">
        <h1 className="auth-heading">Login</h1>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.email && true}
              {...field}
              autoFocus
              label="Email"
              className="input"
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />

        <Controller
          name="study"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl error={errors.study && true} fullWidth>
              <InputLabel id="demo-simple-select-label">Study</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="study"
                value={value}
                onChange={onChange}
              >
                {studyArr.map((study) => (
                  <MenuItem key={study.id} value={study.study}>
                    {study.study}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.study ? errors.study.message : ""}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.password && true}
              {...field}
              type="password"
              label="Password"
              className="input"
              helperText={errors.password ? errors.password.message : ""}
            />
          )}
        />

        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={Object.entries(errors).length !== 0 && true}
        >
          Join
        </Button>
      </form>
    </>
  );
};
