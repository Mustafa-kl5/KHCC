import { Alert } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { PermissionCard } from "Components/superAdmin/PermissionCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { usePendingUsers } from "hooks/usePendingUsers";
export const Permission = () => {
    const { errorMassage, users, isLoading, openErrorMassage, fetchData } =
        usePendingUsers();

    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col gap-3">
                <span className="text-2xl font-bold">Users Permission :</span>
                {isLoading ? (
                    <Loading />
                ) : users?.length === 0 ? (
                    <NoDataFound />
                ) : (
                    <ScrollableContainer>
                        {users?.map((user) => {
                            return <PermissionCard reloadData={fetchData} key={user._id} user={user} />;
                        })}
                    </ScrollableContainer>
                )}
            </div>
            <Snackbar open={openErrorMassage} autoHideDuration={3000}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}>
                <Alert severity="error" >
                    {errorMassage}
                </Alert>
            </Snackbar>
        </MainLayout>
    );
};
