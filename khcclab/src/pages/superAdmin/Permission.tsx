import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { PermissionCard } from "Components/superAdmin/PermissionCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getPendingUsers } from "services/superAdmin";
import { iUserList } from "types/user";
export const Permission = () => {
    const {
        errorMassage,
        data,
        isLoading,
        openErrorMassage,
        fetchData,
    }: {
        errorMassage: any;
        data: iUserList;
        isLoading: any;
        openErrorMassage: any;
        fetchData: any;
    } = useData(getPendingUsers);

    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col gap-3">
                <span className="text-2xl font-bold">Users Permission :</span>
                {isLoading ? (
                    <Loading />
                ) : (data?.users?.length ?? 0) === 0 ? (
                    <NoDataFound />
                ) : (
                    <ScrollableContainer>
                        {data.users?.map((user: any) => {
                            return (
                                <PermissionCard
                                    reloadData={fetchData}
                                    key={user._id}
                                    user={user}
                                />
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
        </MainLayout>
    );
};
