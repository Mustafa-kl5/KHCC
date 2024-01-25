import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { iStudy } from "types/study";
import JSZip from "jszip";

import { format } from "date-fns";
export const StudyCard = ({ study }: { study: iStudy }) => {
  const downloadFilesAsZip = async () => {
    try {
      const blobs = await Promise.all(
        study.files.map(async (url) => {
          const response = await fetch(url.filename);
          return await response.blob();
        })
      );
      const zip = new JSZip();
      blobs.forEach((blob, index) => {
        const fileName = study.files[index].filename.substring(
          study.files[index].filename.lastIndexOf("/") + 1
        );
        zip.file(fileName, blob);
      });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(zipBlob);
      link.download = `${study.studyName}.zip`;
      link.click();
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  return (
    <Accordion
      className={`border border-solid border-slate-400 ${
        study.isClosed ? "bg-red-300" : undefined
      }`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span className="text-lg">{`${study.studyName}`}</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          <span className="text-base">
            <strong>Pi Name:</strong> {study.piName}
          </span>
          <span className="text-base">
            <strong>Study Number:</strong> {study.studyNumber}
          </span>
          <span className="text-base">
            <strong>Initiated Data:</strong>
            {format(new Date(study.studyInitDate), "yyyy/M/d")}
          </span>
          <span className="text-base">
            <strong>Study Keywords:</strong> {study.studyKeywords}
          </span>
          <span className="text-base">
            <strong>Added Date:</strong>
            {format(new Date(study.createdAt), "yyyy/M/d")}
          </span>
          {study.closeData === "" && (
            <span className="text-base">
              <strong>Closed Date:</strong>
              {study.closeData && format(new Date(study.closeData), "yyyy/M/d")}
            </span>
          )}
          <Button variant="contained" onClick={downloadFilesAsZip}>
            Download study file
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
