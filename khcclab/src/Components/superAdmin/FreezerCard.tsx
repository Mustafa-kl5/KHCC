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
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { DeleteFreezer } from "services/superAdmin";
import { iFreezer } from "types/freezer";


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

export const FreezerCard = ({
  freezer,
  reloadData,
}: {
  freezer: iFreezer;
  reloadData: any;
}) => {
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

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = (await DeleteFreezer(freezer._id)) as {
        message: string;
      };
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
      setModalOpen(!modalOpen);
    }
  };

  return (
    <>
      <Accordion className="border border-solid border-slate-400">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <span className="text-lg">{freezer.freezerName}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-2">
            <span className="text-base">
              <strong>Freezer Model: {freezer.freezerModel}</strong>
            </span>
            <span className="text-base">
              <strong>Freezer Location: {freezer.freezerLocation}</strong>
            </span>
            <span className="text-base">
              <strong>Freezer Type: {freezer.freezerType}</strong>
            </span>
            <span className="text-base">
              <strong>Number of Shelves: {freezer.NumberOfShelves}</strong>
            </span>
            <span className="text-base">
              <strong>Boxes Per Shelf: {freezer.BoxesPerShelf}</strong>
            </span>
            <span className="text-base">
              <strong>Capacity: {freezer.capacity}</strong>
            </span>
            <span className="text-base">
              <strong>Register At:  {format(new Date(freezer.createAt), "yyyy/M/d hh:mm:ss a")}</strong>
            </span>
          </div>

          <div className="flex justify-end">
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete Freezer
                </Typography>
                <Typography id="modal-modal-description" sx={{ my: 2 }}>
                  Are you sure you want to delete,
                  <strong> {freezer.freezerName}</strong> ?
                </Typography>
                <div className="flex justify-end gap-2 mt-3">
                  <Button
                    onClick={modalHandler}
                    variant="outlined"
                    size="medium"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={onSubmit}
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
