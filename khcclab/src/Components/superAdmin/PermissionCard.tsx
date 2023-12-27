import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar, Typography } from '@mui/material'
import { iUser } from 'types/user'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Permissions } from 'utils/constant';
import { givePermission } from 'services/superAdmin';
export const PermissionCard = ({ user, reloadData }: { user: iUser, reloadData: () => void }) => {


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

    const [message, setMessage] = useState<string>();
    const [massageType, setMessageType] = useState<string>("error");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [openMassage, setOpenMassage] = useState<boolean>(false);
    const onSubmit = async (data: any, userId: string) => {
        try {
            setIsSubmitting(true);
            const res = (await givePermission(userId, data.value)) as {
                message: string;
            };
            setMessageType("success")
            setOpenMassage(true);
            setMessage(res.message);
            reloadData()
        } catch (err: any) {
            setOpenMassage(true);
            setMessage(err?.response.data?.message);
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
                            onClick={
                                handleSubmit((data) => onSubmit(data, user._id))
                            }
                            disabled={!isValid || isSubmitting}
                            className='w-1/3'
                        >
                            <div className="flex gap-2 items-center">
                                <span>Submit</span>
                                {isSubmitting && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
                            </div>
                        </Button>
                        <Snackbar open={openMassage} autoHideDuration={3000} onClose={() => {
                            setOpenMassage(false)
                        }} anchorOrigin={{ horizontal: "left", vertical: "bottom" }}>
                            <Alert severity={massageType as | "error" | "success"} onClose={() => {
                                setOpenMassage(false)
                            }}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
