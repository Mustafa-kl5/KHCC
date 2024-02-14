import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { SampleCard } from "Components/technician/SampleCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getSamples } from "services/technician";
import { iSampleList } from "types/sample";

export const SamplesList = () => {
  const {
    data,
    isLoading,
    fetchData,
  }: {
    data: iSampleList;
    isLoading: any;
    fetchData: any;
  } = useData(getSamples);
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Samples :</span>
        {isLoading ? (
          <Loading />
        ) : (data.samples?.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.samples.map((item) => {
              return (
                <SampleCard
                  isStorage={false}
                  reloadData={fetchData}
                  key={item._id}
                  sample={item}
                />
              );
            })}
          </ScrollableContainer>
        )}
      </div>
    </MainLayout>
  );
};
