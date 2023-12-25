import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { iSignUpForm } from "types/signup";
import { registrationSchema } from "validation-schema/registrationSchema";

export const RegestierForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      EmployeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: iSignUpForm) => {
    console.log(data);
  };

  return (
    <>
      <form className="auth-form">
        <h1 className="auth-heading">SignUp</h1>

        <Controller
          name="EmployeeId"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.EmployeeId && true}
              {...field}
              autoFocus
              type="text"
              label="Employee Id"
              className="input"
              helperText={errors.EmployeeId ? errors.EmployeeId.message : ""}
            />
          )}
        />

        <div className="grid grid-col-1 gap-x-1 md:grid-cols-2">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ my: 2 }}
                error={errors.firstName && true}
                {...field}
                type="text"
                label="First Name"
                className="input"
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ my: 2 }}
                error={errors.lastName && true}
                {...field}
                type="text"
                label="Last Name"
                className="input"
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.email && true}
              {...field}
              type="text"
              label="Email"
              className="input"
              helperText={errors.email ? errors.email.message : ""}
            />
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.confirmPassword && true}
              {...field}
              type="password"
              label="Confirm Password"
              className="input"
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
          )}
        />

        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={Object.entries(errors).length !== 0 && true}
        >
          SignUp
        </Button>
      </form>
    </>
  );
};
