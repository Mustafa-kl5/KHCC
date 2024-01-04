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
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { PatientCards } from "Components/technician/PatientCards";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { getPatients } from "services/technician";
import { iPatient, iPatientList } from "types/Patient";

export const Patients = () => {
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
  } = useData(getPatients, query);

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
                <InputAdornment position="start">
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
            {data.patients?.map((paitent: iPatient) => {
              return (
                <PatientCards
                  reloadData={fetchData}
                  key={paitent._id}
                  paitent={paitent}
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
