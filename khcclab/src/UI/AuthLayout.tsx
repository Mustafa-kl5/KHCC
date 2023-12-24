
import { Header } from 'Components/Header/Header'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full flex flex-col w-full gap-3 bg-hussein-100 p-4' >
            <Header />
            <div className='bg-hussein-200 w-full justify-between rounded-xl h-full'>
                <div className='w-full flex justify-center items-center'></div>
            </div>
        </div>
    )
}