import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar, Typography } from '@mui/material'
import { iUser } from 'types/user'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Permissions } from 'utils/constant';
export const PermissionCard = ({ user }: { user: iUser }) => {


    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        defaultValues: {
            value: "",
        },
        mode: "onChange",
    });

    const [errorMassage, setErrorMassage] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [openErrorMassage, setOpenErrorMassage] = useState<boolean>(false);
    const onSubmit = async (data: any) => {
        try {
            setIsSubmitting(true);
            console.log(data.value);

        } catch (err: any) {
            setOpenErrorMassage(true);
            setErrorMassage(err?.response.data?.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Accordion className='border border-solid border-slate-400'>
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
                    <span className='text-base'><strong>Chose Permission:</strong></span>
                    <div className='flex justify-end gap-2'>
                        <div className='w-2/3'> <Controller
                            name="value"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Pick</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        label="value"
                                        value={value}
                                        onChange={onChange}
                                    >
                                        {Permissions.map((Permission) => (
                                            <MenuItem key={Permission.id} value={Permission.value}>
                                                {Permission.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        /></div>

                        <Button
                            size="large"
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            disabled={!isValid || isSubmitting}
                            className='w-1/3'
                        >
                            <div className="flex gap-2 items-center">
                                <span>Submit</span>
                                {isSubmitting && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
                            </div>
                        </Button>
                        <Snackbar open={openErrorMassage} autoHideDuration={3000} onClose={() => {
                            setOpenErrorMassage(false)
                        }} anchorOrigin={{ horizontal: "left", vertical: "bottom" }}>
                            <Alert severity="error" onClose={() => {
                                setOpenErrorMassage(false)
                            }}>
                                {errorMassage}
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
