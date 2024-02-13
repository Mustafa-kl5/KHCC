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

import { seen } from "services/technician";
import { format } from "date-fns";
import { iFreezerExport, iSampleExport, iSampleToExport } from "types/sample";
import Checkbox from "@mui/material/Checkbox";
export const SampleExportCard = ({
  sample,
  freezer,
  sendSample,
  samples,
}: //   reloadData,
{
  sample: iSampleExport;
  freezer: iFreezerExport;
  //   reloadData: () => void;
  sendSample: (sample: iSampleToExport) => void;
  samples: iSampleToExport[];
}) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      <Accordion className={`border border-solid border-slate-400 `}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="w-full flex justify-between pe-2 items-center">
            <span className="text-lg">{sample.patientName}</span>
            <Checkbox
              {...label}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={() => {
                sendSample({
                  _id: sample._id,
                  sampleSerial: sample.sampleSerial,
                  khccBioSampleCode: sample.khccBioSampleCode,
                  storageType: sample.sampleType,
                  containerType: sample.containerType,
                  sampleType: sample.sampleType,
                  patientGender: sample.gender,
                  patientBirthDate: sample.birthDate,
                });
              }}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-2">
            <span className="text-base">
              <strong>{sample.ssn ? "SSN:" : "MRN:"}</strong>
              {sample.ssn ? sample.ssn : sample.mrn}
            </span>
            <span className="text-base">
              <strong>Sample Serial :</strong> {sample.sampleSerial}
            </span>
            <span className="text-base">
              <strong>KHCC BIO Code :</strong> {sample.khccBioSampleCode}
            </span>
            <span className="text-base bg-slate-300">
              <strong>Cell position : </strong>
              {`Freezer (Location/Freezer Name / Freezer Model) `}
              {freezer.freezerLocation} / {freezer.freezerName} /
              {freezer.freezerModel} {`==> Main Box (TYPE/ID) `}
              {sample.mainBoxType} / {sample.mainBoxId}{" "}
              {`==> Sub Box (TYPE/ID) `}
              {sample.subBoxType} {sample.subBoxId} {`==> CELL `} {sample.cell}
            </span>
            <span className="text-base">
              <strong>Storage Type :</strong> {sample.storageType}
            </span>
            <span className="text-base">
              <strong>Container Type :</strong> {sample.containerType}
            </span>
            <span className="text-base">
              <strong>Sample Type :</strong> {sample.sampleType}
            </span>
            <span className="text-base">
              <strong>Number Of pure Sample :</strong>
              {sample.numberOfSamples}
            </span>
            <span className="text-base">
              <strong>Patient Gender : </strong>
              {sample.gender}
            </span>
            <span className="text-base">
              <strong>Birth Date : </strong>
              {format(new Date(sample.birthDate), "yyyy/M/d")}
            </span>
            <span className="text-base">
              <strong>Drawn At :</strong>
              {format(new Date(sample.drawnAt), "yyyy/M/d hh:mm:ss a")}
            </span>
            <span className="text-base">
              <strong>Sample Drawing:</strong>
              {format(new Date(sample.sampleDrawing), "yyyy/M/d hh:mm:ss a")}
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
