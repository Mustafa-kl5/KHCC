import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getLogs } from "services/superAdmin";
import { iLogsList } from "types/logs";
import { Alert, InputAdornment, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { LogsCard } from "Components/superAdmin/LogsCard";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDebounce } from "hooks/useDebounce";
export const Logs = () => {
  const [query, setQuery] = useState<any>({
    name: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      name: e.target.value === "" ? undefined : e.target.value,
    });
  }
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
  } = useData(getLogs, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Users Permission :</span>
        <TextField
          className="flex-1"
          placeholder=" Search by Name, Job Number"
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
        ) : (data?.logs?.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.logs?.map((log: any) => {
              return <LogsCard log={log} key={log._id} />;
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
