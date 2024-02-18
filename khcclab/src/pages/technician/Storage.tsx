import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { SampleCard } from "Components/technician/SampleCard";
import { StoragePicker } from "Components/technician/storage/StoragePicker";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getFreezers } from "services/superAdmin";
import { getApprovalSamples } from "services/technician";
import { iFreezerlist } from "types/freezer";
import { iSampleList } from "types/sample";

export const Storage = () => {
  const {
    data,
    isLoading,
    fetchData,
  }: {
    data: iSampleList;
    isLoading: any;
    fetchData: any;
  } = useData(getApprovalSamples);
  const {
    data: freezerData,
    isLoading: isFreezerLoading,
  }: {
    data: iFreezerlist;
    isLoading: any;
    fetchData: any;
  } = useData(getFreezers);
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Storage :</span>
        <ScrollableContainer>
          <div className="w-full h-full flex flex-col gap-3">
            {isLoading || isFreezerLoading ? (
              <Loading />
            ) : (data.samples?.length ?? 0) === 0 ? (
              <NoDataFound />
            ) : (
              data.samples.map((item) => {
                return (
                  <SampleCard
                    freezers={freezerData}
                    isStorage={true}
                    reloadData={fetchData}
                    key={item._id}
                    sample={item}
                  />
                );
              })
            )}
          </div>
        </ScrollableContainer>
      </div>
    </MainLayout>
  );
};
