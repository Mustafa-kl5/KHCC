import { AddBox } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { giveDeletePaitentReason } from "services/nursing";
import { iPatient } from "types/Patient";


const style = {
  position: "absolute" as "absolute",
  top: "0",
  left: "50%",
  transform: "translate(-50%, 5%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "24px",
  boxShadow: 24,
  p: 4,
};

export const PatientCard = ({
  patient,
  reloadData,
}: {
  patient: iPatient;
  reloadData: () => void;
}) => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };
  const [massageDetails, setMassageDetails] = useState<{
    err: Boolean;
    open: Boolean;
    massage: string;
  }>({ err: false, open: false, massage: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const res = (await giveDeletePaitentReason(
        patient._id,
        data.deleteReason
      )) as {
        message: string;
      };
      setMassageDetails({ err: false, open: true, massage: res.message });
    } catch (err: any) {
      setMassageDetails({
        err: true,
        open: true,
        massage: err?.response.data?.message,
      });
    } finally {
      setIsSubmitting(false);
      setModalOpen(!modalOpen);
      reloadData();
    }
  };
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      deleteReason: "",
    },
    mode: "onChange",
  });
  return (
    <>
      <Accordion
        className={`border border-solid border-slate-400 ${patient.isDeleted && "!bg-[#ffebee]"
          }`}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="w-full flex justify-between pe-2 items-center">
            <span className="text-lg">{patient.patientName}</span>
            {patient.seen && (
              <span className="text-white text-xs bg-[#00c851] h-fit px-2 py-0 rounded-lg">
                seen
              </span>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-2">
            <span className="text-base">
              <strong>{patient.ssn ? "SSN:" : "MRN:"}</strong>
              {patient.ssn ? patient.ssn : patient.mrn}
            </span>
            <span className="text-base">
              <strong>Day Code:</strong> {patient.dayCode}
            </span>
            <span className="text-base">
              <strong>research ID:</strong> {patient.researchId}
            </span>
            <span className="text-base">
              <strong>Birth Date:</strong> {format(new Date(patient.birthDate), "yyyy/M/d")}
            </span>
            <span className="text-base">
              <strong>Admition Recovery Date:</strong>
              {format(new Date(patient.admitionRecDate), "yyyy/M/d hh:mm:ss a")}
            </span>
            <span className="text-base">
              <strong>Gender:</strong> {patient.gender}
            </span>
            <span className="text-base">
              <strong>Sample Drawing:</strong>
              {new Date(patient.sampleDrawing).toLocaleString()}
            </span>
            {patient.isDeleted && (
              <span className="text-base">
                <strong>Delete Reason:</strong> {patient.deleteReason}
              </span>
            )}
            <span className="text-base">
              <strong>Seen by:</strong> {patient.seenBy}
            </span>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              onClick={() => {
                navigate(`/add-samples/:${patient._id}`)
              }}
              variant="outlined"
              size="large"
              startIcon={<AddBox />}
            >
              add samples
            </Button>
            {!patient.isDeleted && (
              <Fragment>
                <Button
                  onClick={modalHandler}
                  variant="outlined"
                  size="large"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Modal
                  open={modalOpen}
                  onClose={modalHandler}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Delete Patient
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ my: 2 }}>
                      To delete the patient, type the reason to confirm.
                    </Typography>
                    <Controller
                      name="deleteReason"
                      control={control}
                      rules={{ required: true, minLength: 5 }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="filled-multiline-static"
                          label="Delete Reason "
                          multiline
                          fullWidth
                          rows={4}
                          variant="filled"
                        />
                      )}
                    />

                    <div className="flex justify-end gap-2 mt-3">
                      <Button
                        onClick={modalHandler}
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
                      >
                        <span>Delete </span>
                        {isSubmitting && (
                          <CircularProgress className="!w-[1rem] !h-[1rem]" />
                        )}
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </Fragment>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
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
