import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { studySchema } from "validation-schema/studySchema";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export const AddStudyForm = () => {
  const [files, setFiles] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(studySchema),
    defaultValues: {
      piName: "",
      studyInitDate: undefined,
      studyKeywords: "",
      studyName: "",
      studyNumber: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="w-full h-full flex flex-wrap  gap-x-3">
      <Controller
        name="studyName"
        control={control}
        render={({ field }) => (
          <TextField
            error={errors.studyName && true}
            {...field}
            label="Study Name"
            className="input"
            helperText={errors.studyName && errors.studyName.message}
          />
        )}
      />

      <Controller
        name="piName"
        control={control}
        render={({ field }) => (
          <TextField
            error={errors.piName && true}
            {...field}
            label="Pi Name"
            className="input"
            helperText={errors.piName && errors.piName.message}
          />
        )}
      />
      <Controller
        name="studyNumber"
        control={control}
        render={({ field }) => (
          <TextField
            error={errors.studyNumber && true}
            {...field}
            label="Study Number"
            className="input"
            helperText={errors.studyNumber && errors.studyNumber.message}
          />
        )}
      />

      <Controller
        name="studyKeywords"
        control={control}
        render={({ field }) => (
          <TextField
            error={errors.studyKeywords && true}
            {...field}
            label="Study Keywords"
            className="input"
            helperText={errors.studyKeywords && errors.studyKeywords.message}
          />
        )}
      />
      <Controller
        name="studyInitDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Initiate study date"
            value={undefined}
            onChange={field.onChange}
          />
        )}
      />
      <Button
        size="large"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        //   disabled={!isValid || isSubmitting}
      >
        <div className="flex gap-2 items-center">
          <span>Join</span>
          {/* {isSubmitting && (
              <CircularProgress className="!w-[1rem] !h-[1rem]" />
            )} */}
        </div>
      </Button>
    </div>
  );
};
