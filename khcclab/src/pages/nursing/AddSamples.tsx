import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { AddSamplesForm } from "Components/Patient/AddSamplesForm";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { onSignOutSuccess } from "services/authService";
import { addSamples, getPatient } from "services/nursing";
import { SHOW_TOAST_MESSAGE } from "utils/constant";
import { getStudyId } from "utils/getStudyId";
import { sampleSchema } from "validation-schema/sampleSchema";

export const AddSamples = () => {
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    getPatientData();
  }, [patientId]);

  const getPatientData = async () => {
    try {
      const patientIdUser = patientId?.replace(/^:(.*)$/, "$1")!;
      await getPatient(patientIdUser);
    } catch (err: any) {
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message:
            err?.response?.data?.message +
              "The session will destroy after 3s" ||
            "Something is going Wrong , Try again later",
          isOpen: true,
          severity: "error",
        },
      });
      setTimeout(() => {
        onSignOutSuccess();
      }, 3000);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(sampleSchema),
    defaultValues: {
      samples: [
        {
          containerType: "",
          drawnAt: "",
          numberOfSamples: "",
          sampleSerial: "",
          sampleType: "",
          storageType: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "samples",
    rules: { minLength: 1 },
  });

  const onSubmit = async (data: any) => {
    let patientIdUser = patientId?.replace(/^:(.*)$/, "$1")!;
    const studyId = getStudyId()._id;
    try {
      setIsSubmitting(true);
      const res = (await addSamples(studyId, patientIdUser, data.samples)) as {
        message: string;
      };
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message: res.message,
          isOpen: true,
          severity: "success",
        },
      });
      reset();
    } catch (err: any) {
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message:
            err?.response?.data?.message ||
            "Something is going Wrong , Try again later",
          isOpen: true,
          severity: "error",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <span className="text-2xl font-bold">Add Samples</span>
      <ScrollableContainer>
        {fields.map((field, index) => (
          <AddSamplesForm
            key={field.id}
            control={control}
            errors={errors}
            index={index}
            onClick={() =>
              append({
                containerType: "",
                drawnAt: "",
                numberOfSamples: "",
                sampleSerial: "",
                sampleType: "",
                storageType: "",
              })
            }
            remove={remove}
            formLength={fields.length}
          />
        ))}
      </ScrollableContainer>

      <Button
        size="large"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <div className="flex gap-2 items-center">
          <span>Add Samples</span>
          {isSubmitting && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
        </div>
      </Button>
    </div>
  );
};
