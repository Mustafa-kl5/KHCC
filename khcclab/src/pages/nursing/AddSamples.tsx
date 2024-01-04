import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Snackbar } from "@mui/material";
import { AddSamplesForm } from "Components/Patient/AddSamplesForm";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addSamples } from "services/nursing";
import { getStudyId } from "utils/getStudyId";
import { sampleSchema } from "validation-schema/sampleSchema";
import CircularProgress from "@mui/material/CircularProgress";

export const AddSamples = () => {
    const { patientId } = useParams()
    const [message, setMessage] = useState<string>();
    const [massageType, setMessageType] = useState<string>("error");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [openMassage, setOpenMassage] = useState<boolean>(false);
    const [formsData, setFormsData] = useState<Array<any>>([
        {
            containerType: "",
            drawnAt: "",
            numberOfSamples: "",
            sampleSerial: "",
            sampleType: "",
            storageType: ""
        },
    ]);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(sampleSchema),
        defaultValues: {
            samples: [...formsData],
        },
    });

    const handleAddForm = () => {
        const newFormData = {
            containerType: "",
            drawnAt: "",
            numberOfSamples: "",
            sampleSerial: "",
            sampleType: "",
            storageType: ""
        };
        setFormsData([...formsData, newFormData]);
        const currentDefaultValues = getValues();
        const currentSamples = currentDefaultValues.samples as
            | {
                sampleType: string;
                containerType: string;
                numberOfSamples: string;
                drawnAt: string;
                sampleSerial: string;
                storageType: string
            }[]
            | undefined;
        setValue("samples", [...(currentSamples || []), newFormData]);
    };

    const onSubmit = async (data: any) => {
        let patientIdUser = patientId?.replace(/^:(.*)$/, '$1')!;
        const studyId = getStudyId()._id
        try {
            setIsSubmitting(true);
            const res = (await addSamples(studyId, patientIdUser, data.samples)) as {
                message: string;
            };
            setMessageType("success");
            setOpenMassage(true);
            setMessage(res.message);
            setFormsData([
                {
                    containerType: "",
                    drawnAt: "",
                    numberOfSamples: "",
                    sampleSerial: "",
                    sampleType: "",
                    storageType: ""
                },
            ])
            reset({ samples: [...formsData] })
        } catch (err: any) {
            setOpenMassage(true);
            setMessage(err?.response.data?.message);
        } finally {
            setIsSubmitting(false);
        }

    };
    const handleDeleteForm = (index: number) => {
        console.log(index);
        console.log(formsData);
        const updatedFormsData = formsData.filter((_, i) => i !== index);
        console.log(updatedFormsData);
        setFormsData(updatedFormsData);
        const currentDefaultValues = getValues();
        console.log(currentDefaultValues);
        const updatedFormsDefault = currentDefaultValues.samples?.filter((_, i) => i !== index);
        console.log(updatedFormsDefault);
        setValue("samples", updatedFormsDefault);
    };

    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col gap-3">
                <span className="text-2xl font-bold">Add Samples</span>
                <ScrollableContainer>
                    {formsData.map((_, index: number) => {
                        return (
                            <AddSamplesForm
                                key={index}
                                control={control}
                                errors={errors}
                                index={index}
                                onClick={handleAddForm}
                                remove={handleDeleteForm}
                                formLength={formsData.length}
                            />
                        );
                    })}
                </ScrollableContainer>

                <Button
                    size="large"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isValid}
                >
                    <div className="flex gap-2 items-center">
                        <span>Add Samples</span>
                        {isSubmitting && (
                            <CircularProgress className="!w-[1rem] !h-[1rem]" />
                        )}
                    </div>
                </Button>
                <Snackbar
                    open={openMassage}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenMassage(false);
                    }}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                    <Alert
                        severity={massageType as "error" | "success"}
                        onClose={() => {
                            setOpenMassage(false);
                        }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        </MainLayout>
    );
};
