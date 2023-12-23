import { Header } from 'components/Header/Header'
import React from 'react'
import { Link } from 'react-router-dom'
import { nursingRoutes } from 'routes/routes'

export const MainLayout = () => {
    return (
        <div className='h-full flex flex-col w-full gap-3 bg-hussein-100 p-4' >
            <Header />
            <div className='bg-hussein-200 w-full justify-between rounded-xl h-full'>
                <div className='w-1/5 rounded-xl rounded-e-none bg-hussein-300 h-full p-3 flex flex-col gap-2 '>
                    {nursingRoutes.map(item => {
                        return <Link to={item.path} className='underline cursor-pointer'>{item.pageName}</Link>
                    })}
                </div>
                <div className='w-4/5'></div>
            </div>
        </div>
    )
}
