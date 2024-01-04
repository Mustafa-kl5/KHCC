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
import { iSample } from "types/sample";
import { format } from "date-fns";

export const SampleCard = ({ sample }: { sample: iSample }) => {


    return (
        <>
            <Accordion className={`border border-solid border-slate-400`}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <span className="text-lg font-bold">
                        {sample.patient.patientName} {sample.sampleSerial}
                    </span>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-col gap-2">
                        <span className="text-base">
                            <strong>Container Type : </strong>
                            {sample.containerType}
                        </span>
                        <span className="text-base">
                            <strong>Sample Type : </strong>
                            {sample.sampleType}
                        </span>
                        <span className="text-base">
                            <strong>Drawn At : </strong>
                            {format(new Date(sample.drawnAt), "yyyy/M/d hh:mm:ss a")}
                        </span>
                        <span className="text-base">
                            <strong>Number Of Samples : </strong>
                            {sample.numberOfSamples}
                        </span>
                        <span className="text-base">
                            <strong>Sample Serial : </strong>
                            {sample.sampleSerial}
                        </span>
                        <span className="text-base">
                            <strong>Study Number : </strong>
                            {sample.studyNumber.studyNumber}
                        </span>
                        <span className="text-base">
                            <strong>Patient Name : </strong>
                            {sample.patient.patientName}
                        </span>
                        <span className="text-base">
                            <strong>{sample.patient.ssn ? "SSN:" : "MRN:"}</strong>
                            {sample.patient.ssn ? sample.patient.ssn : sample.patient.mrn}
                        </span>
                        <span className="text-base">
                            <strong>Birth Date : </strong>
                            {format(new Date(sample.patient.birthDate), "yyyy/M/d")}
                        </span>
                        <span className="text-base">
                            <strong>Gender : </strong>
                            {sample.patient.gender}
                        </span>
                        <span className="text-base">
                            <strong>Sample Drawing : </strong>
                            {format(new Date(sample.patient.sampleDrawing), "yyyy/M/d hh:mm:ss a")}
                        </span>
                    </div>
                </AccordionDetails>
            </Accordion>
            {/* <Snackbar
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
      </Snackbar> */}
        </>
    );
};
