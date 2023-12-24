import { Button } from '@mui/material'
import React from 'react'

export const AddPatientForm = () => {
    return (
        <div className='flex flex-col gap-2 h-full px-10 py-5'>
            <div className='flex flex-wrap  h-full'></div>
            <div className='flex justify-end'>
                <Button variant='contained' fullWidth>Add Patient</Button>
            </div>
        </div>
    )
}
