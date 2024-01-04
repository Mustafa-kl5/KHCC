import { iLog } from 'types/logs'
import { Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { dateFormate } from 'utils/dateFormate';

export const LogsCard = ({ log }: { log: iLog }) => {
    return (
        <Accordion className={`border border-solid border-slate-400`}
        >
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
                        <strong>Action Time:</strong> {dateFormate(log.createAt)}
                    </span>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
