import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import ExportSamplesHandler from "Components/technician/ExportSamplesHandler";
import { SampleExportCard } from "Components/technician/SampleExportCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useState } from "react";
import { sampleToExport } from "services/technician";
import { iFreezerExportList, iSampleToExport } from "types/sample";
const ExportSamples = () => {
  const [samplesToExport, setSampleToExport] = useState<iSampleToExport[]>([]);
  const {
    data,
    isLoading,
    fetchData,
  }: {
    data: iFreezerExportList;
    isLoading: any;
    fetchData: any;
  } = useData(sampleToExport);
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

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Export Samples :</span>
        </div>
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
          <ExportSamplesHandler samplesToExport={samplesToExport} />
        )}
      </div>
    </MainLayout>
  );
};

export default ExportSamples;
