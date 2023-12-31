import { StudyCard } from "Components/superAdmin/StudyCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";

export const Studies = () => {
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
    }
    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col gap-3">
                <span className="text-2xl font-bold">Studies :</span>
                <ScrollableContainer>
                    <StudyCard study={study} />
                </ScrollableContainer>
            </div>
        </MainLayout>
    );
};
