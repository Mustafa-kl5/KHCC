import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { registrationSchema } from "validation-schema/registrationSchema";

type SignUpForm = {
  EmployeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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

  const [confirmPass, setConfirmPass] = useState(false);

  const onSubmit = async (data: any) => {
    if (data.password === data.confirmPassword) {
      setConfirmPass(false);
      console.log(data);
    } else {
      setConfirmPass(true);
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="auth-heading">SignUp</h1>
        <div>
          <label htmlFor="Employee_id" className="label">
            Employee Id
          </label>

          <Controller
            name="EmployeeId"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                autoFocus
                type="text"
                id="Employee_id"
                className="input"
                placeholder="Employee Id"
              />
            )}
          />
          {errors.EmployeeId && (
            <p className="text-red-500">{errors.EmployeeId.message}</p>
          )}
        </div>
        <div className="grid grid-col-1 gap-x-1 md:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="label">
              First Name
            </label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="first_name"
                  className="input"
                  placeholder="First Name"
                />
              )}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="last_name" className="label">
              Last Name
            </label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="last_name"
                  className="input"
                  placeholder="Last Name"
                />
              )}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="email"
                className="input"
                placeholder="Email"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-2xl">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="password"
                className="input"
                placeholder="Password"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="Confirm " className="block text-2xl">
            Confirm Password
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="Confirm "
                className="input"
                placeholder="Confirm Password"
              />
            )}
          />
          {confirmPass && (
            <p className="text-red-500">Password does not match!</p>
          )}
        </div>
        <button type="submit" className="submit-btn">
          SignUp
        </button>
      </form>
    </>
  );
};
