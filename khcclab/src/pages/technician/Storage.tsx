import { StoragePicker } from "Components/technician/storage/StoragePicker";
import { MainLayout } from "UI/MainLayout";

export const Storage = () => {
    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col gap-3">
                <span className="text-2xl font-bold">Storage :</span>
                <StoragePicker />
            </div>
        </MainLayout>
    );
};
