import { PermissionCard } from 'Components/superAdmin/PermissionCard'
import { MainLayout } from 'UI/MainLayout'
import { ScrollableContainer } from 'UI/ScrollableContainer'
import React from 'react'

export const Permission = () => {
    const user = {
        employeeId: "5137745",
        position: "SE",
        department: "it",
        firstName: "mustafa",
        lastName: "mahmood",
        role: "pending",
        createAt: "20-5-2020",
    }
    return (
        <MainLayout>
            <div className='w-full h-full flex flex-col gap-3'>
                <span className='text-2xl font-bold'>Users Permission :</span>
                <ScrollableContainer>
                    <PermissionCard user={user} />
                    <PermissionCard user={user} />
                </ScrollableContainer>
            </div>
        </MainLayout>
    )
}
