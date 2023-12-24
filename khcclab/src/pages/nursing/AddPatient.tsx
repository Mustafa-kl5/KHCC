import { AddPatientForm } from 'Components/Patient/AddPatientForm'
import { PatientContainer } from 'Components/Shared/PatientContainer'
import { MainLayout } from 'UI/MainLayout'

export const AddPatient = () => {
    return (
        <MainLayout>
            <AddPatientForm />
        </MainLayout>
    )
}
