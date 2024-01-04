import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { iPatient } from "types/Patient";
import { dateFormate } from "utils/dateFormate";
import { seen } from "services/technician";

export const PatientCards = ({
  paitent,
  reloadData,
}: {
  paitent: iPatient;
  reloadData: () => void;
}) => {
  const [massageDetails, setMassageDetails] = useState<{
    err: Boolean;
    open: Boolean;
    massage: string;
  }>({ err: false, open: false, massage: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const seenHandler = async (data: any) => {
    try {
      setIsSubmitting(true);
      const res = (await seen(paitent._id)) as {
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
      reloadData();
    }
  };

  return (
    <>
      <Accordion
        className={`border border-solid border-slate-400 ${
          paitent.isDeleted && "!bg-[#ffebee]"
        }`}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="w-full flex justify-between pe-2 items-center">
            <span className="text-lg">{paitent.patientName}</span>
            {paitent.seen && (
              <span className="text-white text-xs bg-[#00c851] h-fit px-2 py-0 rounded-lg">
                seen
              </span>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-2">
            <span className="text-base">
              <strong>{paitent.ssn ? "SSN:" : "MRN:"}</strong>{" "}
              {paitent.ssn ? paitent.ssn : paitent.mrn}
            </span>
            <span className="text-base">
              <strong>Day Code:</strong> {paitent.dayCode}
            </span>
            <span className="text-base">
              <strong>research ID:</strong> {paitent.researchId}
            </span>
            <span className="text-base">
              <strong>Birth Date:</strong> {dateFormate(paitent.birthDate)}
            </span>
            <span className="text-base">
              <strong>Admition Recovery Date:</strong>{" "}
              {dateFormate(paitent.admitionRecDate)}
            </span>
            <span className="text-base">
              <strong>Gender:</strong> {paitent.gender}
            </span>
            <span className="text-base">
              <strong>Sample Drawing:</strong>{" "}
              {new Date(paitent.sampleDrawing).toLocaleString()}
            </span>
            {paitent.isDeleted && (
              <span className="text-base">
                <strong>Delete Reason:</strong> {paitent.deleteReason}
              </span>
            )}
            {paitent.seen && (
              <span className="text-base">
                <strong>Seen By:</strong> {paitent.seenBy}
              </span>
            )}
          </div>
          {!paitent.seen && (
            <div className="flex justify-end">
              <Button
                disabled={isSubmitting}
                onClick={seenHandler}
                variant="outlined"
                size="large"
                startIcon={<VisibilityIcon />}
              >
                seen
              </Button>
            </div>
          )}
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
