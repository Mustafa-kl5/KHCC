import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { LogsCard } from "Components/superAdmin/LogsCard";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { getLogs } from "services/superAdmin";
import { iLog, iLogsList } from "types/logs";
import TablePagination from "@mui/material/TablePagination";
export const Logs = () => {
  const [query, setQuery] = useState<any>({
    name: undefined,
    page: 1,
    pageSize: 10,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({ ...query, name: e.target.value });
  }
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setQuery({ ...query, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuery({ ...query, pageSize: parseInt(event.target.value, 10) });
  };

  const {
    data,
    isLoading,
  }: {
    data: iLogsList;
    isLoading: any;
    fetchData: any;
  } = useData(getLogs, query);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <span className="text-2xl font-bold">Users Logs :</span>
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
        <>
          <ScrollableContainer>
            {data.logs?.map((log: iLog) => {
              return <LogsCard log={log} key={log.id} />;
            })}
          </ScrollableContainer>{" "}
          <div className="flex justify-center items-center">
            <TablePagination
              component="div"
              count={data.totalLogs}
              page={query.page}
              onPageChange={handleChangePage}
              rowsPerPage={query.pageSize}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </>
      )}
    </div>
  );
};
