import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { SampleCard } from "Components/technician/SampleCard";
import { StoragePicker } from "Components/technician/storage/StoragePicker";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getApprovalSamples } from "services/technician";
import { iSampleList } from "types/sample";

export const Storage = () => {
    const {
        errorMassage,
        data,
        isLoading,
        openErrorMassage,
        fetchData,
    }: {
        errorMassage: any;
        data: iSampleList;
        isLoading: any;
        openErrorMassage: any;
        fetchData: any;
    } = useData(getApprovalSamples);
    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col gap-3">
                <span className="text-2xl font-bold">Storage :</span>
                <ScrollableContainer>
                    <div className="w-full h-full flex flex-col gap-3">
                        {isLoading ? (
                            <Loading />
                        ) : (data.samples?.length ?? 0) === 0 ? (
                            <NoDataFound />
                        ) : (
                            data.samples.map(item => {
                                return <SampleCard isStorage={true} reloadData={fetchData} key={item._id} sample={item} />
                            })
                        )}
                    </div>
                </ScrollableContainer>
            </div>
        </MainLayout>
    );
};
