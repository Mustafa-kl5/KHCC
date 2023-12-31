import { Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { iStudy } from "types/study";

export const StudyCard = ({ study }: { study: iStudy }) => {

    return (
        <Accordion className={`border border-solid border-slate-400 ${study.isClosed ? "bg-red-300" : undefined}`}
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
                        <strong>Initiated Data:</strong> {study.studyInitDate}
                    </span>
                    <span className="text-base">
                        <strong>Study Keywords:</strong> {study.studyKeywords}
                    </span>
                    <span className="text-base">
                        <strong>Add At:</strong> {study.createAt}
                    </span>
                    {study.closeData === "" && <span className="text-base">
                        <strong>Closed Date:</strong>{study.closeData}
                    </span>}
                    <Button variant="contained">Download study file</Button>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
