import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Alert,
    Snackbar,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { approveSample } from "services/technician";
import { iSample } from "types/sample";
import { RejectSample } from "./RejectSample";
import { ApproveSample } from "./ApproveSample";
const style = {
    position: "absolute" as "absolute",
    top: "0",
    left: "50%",
    transform: "translate(-50%, 5%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "24px",
    boxShadow: 24,
    p: 4,
};
export const SampleCard = ({
    sample,
    reloadData,
}: {
    sample: iSample;
    reloadData: () => void;
}) => {
    const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
    const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false);
    // const approveHandler = async () => {
    //     try {
    //         setIsSubmitting(true);
    //         const res = (await approveSample(sample._id)) as {
    //             message: string;
    //         };
    //         setMassageDetails({ err: false, open: true, massage: res.message });
    //         reloadData();
    //     } catch (err: any) {
    //         setMassageDetails({
    //             err: true,
    //             open: true,
    //             massage: err?.response.data?.message,
    //         });
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <>
            <Accordion className={`border border-solid border-slate-400`}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <span className="text-lg font-bold">
                        {sample.patient.patientName} {sample.sampleSerial}
                    </span>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex justify-between"></div>
                    <div className="flex flex-col gap-2">
                        <span className="text-base">
                            <strong>Container Type : </strong>
                            {sample.containerType}
                        </span>
                        <span className="text-base">
                            <strong>Sample Type : </strong>
                            {sample.sampleType}
                        </span>
                        <span className="text-base">
                            <strong>Drawn At : </strong>
                            {format(new Date(sample.drawnAt), "yyyy/M/d hh:mm:ss a")}
                        </span>
                        <span className="text-base">
                            <strong>Number Of Samples : </strong>
                            {sample.numberOfSamples}
                        </span>
                        <span className="text-base">
                            <strong>Sample Serial : </strong>
                            {sample.sampleSerial}
                        </span>
                        <span className="text-base">
                            <strong>Study Number : </strong>
                            {sample.studyNumber.studyNumber}
                        </span>
                        <span className="text-base">
                            <strong>Patient Name : </strong>
                            {sample.patient.patientName}
                        </span>
                        <span className="text-base">
                            <strong>{sample.patient.ssn ? "SSN:" : "MRN:"}</strong>
                            {sample.patient.ssn ? sample.patient.ssn : sample.patient.mrn}
                        </span>
                        <span className="text-base">
                            <strong>Birth Date : </strong>
                            {format(new Date(sample.patient.birthDate), "yyyy/M/d")}
                        </span>
                        <span className="text-base">
                            <strong>Gender : </strong>
                            {sample.patient.gender}
                        </span>
                        <span className="text-base">
                            <strong>Sample Drawing : </strong>
                            {format(
                                new Date(sample.patient.sampleDrawing),
                                "yyyy/M/d hh:mm:ss a"
                            )}
                        </span>
                        {sample.isApproved && (
                            <span className="text-base">
                                <strong>KHCC Code : </strong>
                                {sample.khccBioSampleCode}
                            </span>
                        )}
                        {sample.isRejected && (
                            <span className="text-base">
                                <strong>Reject Reason : </strong>
                                {sample.rejectReason}
                            </span>
                        )}
                        <div className="flex gap-3 w-full">
                            <Button
                                className="w-1/2"
                                variant={
                                    sample.isRejected || sample.isApproved
                                        ? "outlined"
                                        : "contained"
                                }
                                disabled={sample.isRejected || sample.isApproved}
                                onClick={() => {
                                    setApproveModalOpen(!approveModalOpen)
                                }}
                            >
                                APPROVE
                            </Button>
                            <Button
                                className="w-1/2"
                                onClick={() => {
                                    setRejectModalOpen(!rejectModalOpen);
                                }}
                                variant={
                                    sample.isRejected || sample.isApproved
                                        ? "outlined"
                                        : "contained"
                                }
                                disabled={sample.isRejected || sample.isApproved}
                                color="error"
                            >
                                REJECT
                            </Button>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <RejectSample
                sample={sample}
                closeModel={() => {
                    setRejectModalOpen(!rejectModalOpen);
                }}
                reloadData={reloadData}
                rejectModalOpen={rejectModalOpen}
            />
            <ApproveSample
                sample={sample}
                closeModel={() => {
                    setApproveModalOpen(!approveModalOpen);
                }}
                reloadData={reloadData}
                rejectModalOpen={approveModalOpen}
            />
        </>
    );
};
