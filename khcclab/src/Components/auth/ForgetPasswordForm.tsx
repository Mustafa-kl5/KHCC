import { Modal, Button } from "@mui/material";
import { resetPasswordSchema } from "validation-schema/resertPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
export const ForgetPasswordForm = ({
  open,
  closeModel,
}: {
  closeModel: () => void;
  open: boolean;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const steps = [
    {
      label: "Enter Your Email",
      item: (
        <div className="flex flex-col gap-3 w-2/3">
          <span>
            Please Enter Your Email to send
            <b> OTP</b>
          </span>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.email && true}
                {...field}
                type="email"
                label="Email"
                className="input"
                helperText={errors.email && errors.email.message}
              />
            )}
          />
        </div>
      ),
    },
    {
      label: "Verify OTP Code",
      item: (
        <div className="flex flex-col gap-3 w-2/3">
          <span>
            Please Enter <b> OTP</b>
          </span>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <div></div>}
          />
        </div>
      ),
    },
    { label: "Reset Password", item: <>3</> },
  ];
  return (
    <Modal
      open={open}
      onClose={() => {
        setActiveStep(0);
        closeModel();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center   "
    >
      <div className="bg-white p-4 flex flex-col gap-3 rounded-xl w-1/2">
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label.label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {steps[activeStep].item}
        <div className="w-full flex gap-3">
          <Button
            className="w-1/2"
            onClick={() => {
              setActiveStep(0);
              closeModel();
            }}
            variant="outlined"
            size="medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStep(activeStep + 1)}
            variant="contained"
            size="medium"
            className="w-1/2"
          >
            {activeStep === 2 ? (
              <span className="pe-2">Reset</span>
            ) : (
              <span className="pe-2">Next</span>
            )}

            {isSubmitting && (
              <CircularProgress className="!w-[1rem] !h-[1rem]" />
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
