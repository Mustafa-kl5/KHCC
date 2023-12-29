import { Alert, Snackbar } from "@mui/material";
import { PatientCard } from "Components/Patient/PatientCard";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useGetUsersList } from "hooks/useGetUsersList";
import { getPatientsList } from "services/nursing";
import { iPatient } from "types/Patient";

export const PatientList = () => {
  const {
    errorMassage,
    data,
    isLoading,
    openErrorMassage,
    fetchData,
  }: {
    errorMassage: any;
    data: iPatient[];
    isLoading: any;
    openErrorMassage: any;
    fetchData: any;
  } = useGetUsersList(getPatientsList, "patients");
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Patient List :</span>
        {isLoading ? (
          <Loading />
        ) : data?.length === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data?.map((user: any) => {
              return (
                <PatientCard
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
