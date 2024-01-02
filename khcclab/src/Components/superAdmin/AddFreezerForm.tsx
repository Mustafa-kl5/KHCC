import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { addFreezer } from "services/superAdmin";
import { freezerSchema } from "validation-schema/freezerSchema";

const dummyMenu = [{ id: 1, name: "test" }];

export const AddFreezerForm = () => {
  const [massageDetails, setMassageDetails] = useState<{
    err: Boolean;
    open: Boolean;
    massage: string;
  }>({ err: false, open: false, massage: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: {
    freezerName: string;
    freezerModel: string;
    freezerLocation: string;
    freezerType: string;
    NumberOfShelves: number;
    BoxesPerShelf: number;
  }) => {
    const {
      freezerName,
      freezerModel,
      freezerLocation,
      freezerType,
      NumberOfShelves,
      BoxesPerShelf,
    } = data;
    try {
      const res = (await addFreezer(
        freezerName,
        freezerModel,
        freezerLocation,
        freezerType,
        NumberOfShelves,
        BoxesPerShelf
      )) as { message: string };
      setMassageDetails({ err: false, open: true, massage: res.message });
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
  } = useForm({
    resolver: yupResolver(freezerSchema),
    defaultValues: {
      freezerName: "",
      freezerModel: "",
      freezerLocation: "",
      freezerType: "",
      NumberOfShelves: undefined,
      BoxesPerShelf: undefined,
    },
    mode: "onChange",
  });
  return (
    <>
      <ScrollableContainer>
        <form className="flex flex-col gap-5 pt-3 px-3">
          <Controller
            name="freezerName"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.freezerName && true}
                {...field}
                autoFocus
                label="Freezer Name"
                className="input"
                helperText={errors.freezerName && errors.freezerName.message}
              />
            )}
          />
          <Controller
            name="freezerModel"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.freezerModel && true}
                {...field}
                label="Freezer Model"
                className="input"
                helperText={errors.freezerModel && errors.freezerModel.message}
              />
            )}
          />
          <Controller
            name="freezerLocation"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.freezerLocation && true}
                {...field}
                label="Freezer Location"
                className="input"
                helperText={
                  errors.freezerLocation && errors.freezerLocation.message
                }
              />
            )}
          />
          <Controller
            name="freezerType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Freezer Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="Freezer Type"
                  onChange={onChange}
                >
                  {dummyMenu.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="NumberOfShelves"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                min={0}
                value={undefined}
                onChange={(e) => {
                  onChange(parseInt(e.target.value));
                }}
                type="number"
                className=" outline-none text-base ring-1 ring-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:ring-2 block w-full py-[15.5px] px-[14px]"
                placeholder="Number of Shelves"
              />
            )}
          />
          <Controller
            name="BoxesPerShelf"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                min={0}
                value={undefined}
                onChange={(e) => {
                  onChange(parseInt(e.target.value));
                }}
                type="number"
                className=" outline-none text-base ring-1 ring-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:ring-2 block w-full py-[15.5px] px-[14px]"
                placeholder="Boxes per Shelf"
              />
            )}
          />
        </form>
      </ScrollableContainer>
      <Button
        className=""
        variant="contained"
        size="large"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || isSubmitting}
      >
        <div className="flex gap-2 items-center">
          <span>Add Freezer</span>
          {isSubmitting && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
        </div>
      </Button>
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
