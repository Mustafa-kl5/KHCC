import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { iUser } from 'types/user'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export const PermissionCard = ({ user }: { user: iUser }) => {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <span className='text-lg'>{`${user.firstName} ${user.lastName}`}</span>
            </AccordionSummary>
            <AccordionDetails>
                <div className='flex flex-col gap-2'>
                    <span className='text-base'><strong>Role:</strong> {user.role}</span>
                    <span className='text-base'><strong>Position:</strong> {user.position}</span>
                    <span className='text-base'><strong>Employee ID:</strong> {user.employeeId}</span>
                    <span className='text-base'><strong>Department:</strong> {user.department}</span>
                    <span className='text-base'><strong>Register At:</strong> {user.createAt}</span>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
