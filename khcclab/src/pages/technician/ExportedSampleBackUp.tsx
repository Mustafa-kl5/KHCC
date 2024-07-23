import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { SampleExportCard } from "Components/technician/SampleExportCard";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getReportForSampleExported,
  sampleToExportBackup,
} from "services/technician";
import { iFreezerExportListBackUp, iSampleToExport } from "types/sample";
import { SHOW_TOAST_MESSAGE } from "utils/constant";
import { format } from "date-fns";

const ExportedSampleBackUp = () => {
  const [samplesToExport] = useState<iSampleToExport[]>([]);
  const [query, setQuery] = useState<any>({
    searchData: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  function searchData(e: any) {
    setQuery({
      ...query,
      searchData: e.target.value === "" ? undefined : e.target.value,
    });
  }

  const {
    data,
    isLoading,
  }: {
    data: iFreezerExportListBackUp;
    isLoading: any;
    fetchData: any;
  } = useData(sampleToExportBackup, query);
  const downloadReport = async () => {
    try {
      setIsSubmitting(true);
      const response = await getReportForSampleExported();
      const url = window.URL.createObjectURL(response.data as Blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${format(
        new Date(),
        "d/MMM/yyyy"
      )}samples-is-exported.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message:
            err?.response?.data?.message ||
            "Something is going Wrong , Try again later",
          isOpen: true,
          severity: "error",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Exported Samples :</span>
        <Button
          className=""
          onClick={downloadReport}
          variant="contained"
          size="medium"
        >
          Get Exported all samples as a report
          {isSubmitting && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
        </Button>
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
            <Fragment key={item._id}>
              {item.samplesBackUp.map((sample) => (
                <SampleExportCard
                  key={sample._id}
                  sample={sample}
                  freezer={item}
                  sendSample={() => {}}
                  samples={samplesToExport}
                  isSearch={false}
                />
              ))}
            </Fragment>
          ))}
        </ScrollableContainer>
      )}
    </div>
  );
};

export default ExportedSampleBackUp;
