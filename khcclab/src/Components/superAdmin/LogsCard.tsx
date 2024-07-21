import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { format } from "date-fns";
import { iLog } from "types/logs";

export const LogsCard = ({ log }: { log: iLog }) => {
  return (
    <Accordion className={`border border-solid border-slate-400`}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span className="text-lg">{`${log.title}`}</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          <span className="text-base">
            <strong>Description:</strong> {log.description}
          </span>
          <span className="text-base">
            <strong>Action Time:</strong>{" "}
            {format(new Date(log.createAt), "d/MMM/yyyy hh:mm:ss a")}
          </span>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
