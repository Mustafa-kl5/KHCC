import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { PatientCards } from "Components/technician/PatientCards";
import { SampleExportCard } from "Components/technician/SampleExportCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useEffect, useState } from "react";
import { sampleToExport } from "services/technician";
import { iPatient } from "types/Patient";
import { iFreezerExportList, iSampleToExport } from "types/sample";
import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExportSamplesHandler from "Components/technician/ExportSamplesHandler";
import { useDebounce } from "hooks/useDebounce";

const ExportSamples = () => {
  const [query, setQuery] = useState<any>({
    searchData: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      ...query,
      searchData: e.target.value === "" ? undefined : e.target.value,
    });
  }
  const [samplesToExport, setSampleToExport] = useState<iSampleToExport[]>([]);
  const {
    errorMassage,
    data,
    isLoading,
    openErrorMassage,
    fetchData,
  }: {
    errorMassage: any;
    data: iFreezerExportList;
    isLoading: any;
    openErrorMassage: any;
    fetchData: any;
  } = useData(sampleToExport, query);
  const handleExportSample = (sample: iSampleToExport) => {
    const index = samplesToExport.findIndex((item) => item._id === sample._id);
    if (index === -1) {
      setSampleToExport((prevState) => [...prevState, sample]);
    } else {
      setSampleToExport((prevState) => {
        const updatedSamples = [...prevState];
        updatedSamples.splice(index, 1);
        return updatedSamples;
      });
    }
  };
  // useEffect(() => {
  //   console.log(samplesToExport);
  // }, [samplesToExport]);
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Export Samples :</span>
        </div>
        <TextField
          className="flex-1"
          placeholder=" Search by Patient Name, KHCC Code, SSN, MRN, Sample Serial"
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
        ) : (data.freezers?.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.freezers?.map((item) => (
              <>
                {item.samples.map((sample) => (
                  <SampleExportCard
                    key={sample._id}
                    sample={sample}
                    freezer={item}
                    sendSample={handleExportSample}
                    samples={samplesToExport}
                  />
                ))}
              </>
            ))}
          </ScrollableContainer>
        )}
        {samplesToExport.length !== 0 && (
          <div className="flex gap-2 w-full">
            <ExportSamplesHandler samplesToExport={samplesToExport} />
            {/* <Button
              className="w-1/3"
              onClick={() => {
                setSampleToExport([]);
              }}
              variant="outlined"
              color="error"
            >
              Clear
            </Button> */}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExportSamples;
