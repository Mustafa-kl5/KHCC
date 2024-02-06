import { Alert, InputAdornment, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { PermissionCard } from "Components/superAdmin/PermissionCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getPendingUsers } from "services/superAdmin";
import { iUserList } from "types/user";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
export const Permission = () => {
  const [query, setQuery] = useState<any>({
    employeeId: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      employeeId: e.target.value === "" ? undefined : e.target.value,
    });
  }

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
  } = useData(getPendingUsers, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Users Permission :</span>
        <TextField
          className="flex-1"
          placeholder=" Search by User Name, User ID"
          size="small"
          variant="outlined"
          onChange={(e: any) => {
            searchDebounce(e);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
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
