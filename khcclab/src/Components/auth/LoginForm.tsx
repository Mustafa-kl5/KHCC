import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "validation-schema/loginSchema";

export const LoginForm = () => {
  const onSubmit = async (data: { email: string; password: string }) => {
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
      password: "",
    },
    mode: "onChange",
  });
  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="auth-heading">Login</h1>
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
                autoFocus
                type="text"
                id={field.name}
                placeholder={field.name}
                className="input"
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
                id={field.name}
                placeholder={field.name}
                className="input"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Join
        </button>
      </form>
    </>
  );
};
