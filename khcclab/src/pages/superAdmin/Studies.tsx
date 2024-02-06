import { StudyCard } from "Components/superAdmin/StudyCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getStudies } from "services/superAdmin";
import { iStudyList } from "types/study";
import { Alert, InputAdornment, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { useState } from "react";
import { useDebounce } from "hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
export const Studies = () => {
  const [query, setQuery] = useState<any>({
    study: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      study: e.target.value === "" ? undefined : e.target.value,
    });
  }
  const study = {
    _id: "any",
    studyName: "any",
    piName: "any",
    studyNumber: "any",
    studyKeywords: "any",
    studyInitDate: "any",
    files: ["any"],
    closeData: "any",
    isClosed: false,
    createAt: "any",
  };
  const {
    errorMassage,
    data,
    isLoading,
    openErrorMassage,
  }: {
    errorMassage: any;
    data: iStudyList;
    isLoading: any;
    openErrorMassage: any;
    fetchData: any;
  } = useData(getStudies, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Studies :</span>
        <TextField
          className="flex-1"
          placeholder=" Search by PI Name, Study Name, Study Number"
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
        ) : (data?.studies.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.studies.map((study) => {
              return <StudyCard key={study._id} study={study} />;
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
