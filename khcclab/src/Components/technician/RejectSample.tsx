import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    CircularProgress,
    Modal,
    TextField,
    Alert,
    Snackbar,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { rejectSample } from "services/technician";
import { iSample } from "types/sample";
import { rejectionSchema } from "validation-schema/rejectionSchema";
export const RejectSample = ({
    sample,
    reloadData,
    rejectModalOpen,
    closeModel
}: {
    sample: iSample;
    reloadData: () => void;
    rejectModalOpen: boolean,
    closeModel: () => void
}) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [massageDetails, setMassageDetails] = useState<{
        err: Boolean;
        open: Boolean;
        massage: string;
    }>({ err: false, open: false, massage: "" });
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(rejectionSchema),
        defaultValues: {
            rejectionReason: "",
        },
        mode: "onChange",
    });
    const onSubmit = async (data: { rejectionReason: string }) => {
        try {
            setIsSubmitting(true);
            const res = (await rejectSample(sample._id, data.rejectionReason)) as {
                message: string;
            };
            reset();
            setMassageDetails({ err: false, open: true, massage: res.message });
            reloadData();
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
    return (
        <>

            <Modal
                open={rejectModalOpen}
                onClose={closeModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="w-full h-full flex justify-center items-center">
                    <div className="p-4 bg-white rounded-lg w-1/3 h-1/2">
                        <div className="flex flex-col justify-between gap-3 h-full">
                            <div className="flex flex-col gap-4">
                                <span className="font-bold text-lg">
                                    Please indicate rejection reason :
                                </span>
                                <Controller
                                    name="rejectionReason"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            error={errors.rejectionReason && true}
                                            {...field}
                                            label={"Rejection Reason"}
                                            className="w-full"
                                            variant="standard"
                                            helperText={
                                                errors.rejectionReason && errors.rejectionReason.message
                                            }
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-full flex gap-3">
                                <Button
                                    className="w-1/2"
                                    onClick={closeModel}
                                    variant="outlined"
                                    size="medium"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={!isValid}
                                    onClick={handleSubmit(onSubmit)}
                                    color="error"
                                    variant="outlined"
                                    size="medium"
                                    className="w-1/2"
                                >
                                    <span className="pe-2">reject </span>
                                    {isSubmitting && (
                                        <CircularProgress className="!w-[1rem] !h-[1rem]" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
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
