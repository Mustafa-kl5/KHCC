import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { PatientCard } from "Components/Patient/PatientCard";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { set } from "date-fns";
import { useDebounce } from "hooks/useDebounce";
import { useGetUsersList } from "hooks/useGetUsersList";
import { useState } from "react";
import { getPatientsList } from "services/nursing";
import { iPatient, iPatientList } from "types/Patient";

export const PatientList = () => {
  const [query, setQuery] = useState<any>({
    isDeleted: undefined,
    patientName: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      ...query,
      patientName: e.target.value === "" ? undefined : e.target.value,
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
    data: iPatientList;
    isLoading: any;
    openErrorMassage: any;
    fetchData: any;
  } = useGetUsersList(getPatientsList, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Patient List :</span>
          <TextField
            size="small"
            variant="outlined"
            onChange={(e: any) => {
              searchDebounce(e);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  onClick={(e) => {
                    console.log(e);
                  }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={query.isDeleted || ""}
              defaultValue={""}
              onChange={(e: any) => {
                if (e.target.value === "")
                  return setQuery({ ...query, isDeleted: undefined });
                setQuery({ ...query, isDeleted: e.target.value });
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"true"}>Deleted</MenuItem>
              <MenuItem value={"false"}>Available</MenuItem>
            </Select>
          </FormControl>
        </div>
        {isLoading ? (
          <Loading />
        ) : data.patients?.length === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.patients?.map((user: iPatient) => {
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
