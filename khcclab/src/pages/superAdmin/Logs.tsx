import { Loading } from 'Components/Shared/Loading';
import { NoDataFound } from 'Components/Shared/NoDataFound';
import { MainLayout } from 'UI/MainLayout';
import { ScrollableContainer } from 'UI/ScrollableContainer';
import { useData } from 'hooks/useData';
import { getLogs } from 'services/superAdmin';
import { iLogsList } from 'types/logs';
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { LogsCard } from 'Components/superAdmin/LogsCard';
export const Logs = () => {
    const {
        errorMassage,
        data,
        isLoading,
        openErrorMassage,
    }: {
        errorMassage: any;
        data: iLogsList;
        isLoading: any;
        openErrorMassage: any;
        fetchData: any;
    } = useData(getLogs);

    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col gap-3">
                <span className="text-2xl font-bold">Users Permission :</span>
                {isLoading ? (
                    <Loading />
                ) : (data?.logs?.length ?? 0) === 0 ? (
                    <NoDataFound />
                ) : (
                    <ScrollableContainer>
                        {data.logs?.map((log: any) => {
                            return (
                                <LogsCard log={log} key={log._id} />
                            );
                        })}
                    </ScrollableContainer>
                )}
            </div>
            <Snackbar
                open={openErrorMassage}
                autoHideDuration={3000}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
                <Alert severity="error">{errorMassage}</Alert>
            </Snackbar>
        </MainLayout>)
}
