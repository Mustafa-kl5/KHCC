import { iSampleToExport } from "types/sample";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}
const ExportSamplesHandler = ({
  samplesToExport,
}: {
  samplesToExport: iSampleToExport[];
}) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    const headers = [
      "Sample Serial",
      "KHCC Bio Sample Code",
      "Storage Type",
      "Container Type",
      "Sample Type",
      "Patient Gender",
      "Patient Birth Date",
    ];

    const data = samplesToExport.map((sample) => [
      sample.sampleSerial,
      sample.khccBioSampleCode,
      sample.storageType,
      sample.containerType,
      sample.sampleType,
      sample.patientGender,
      sample.patientBirthDate,
    ]);
    doc.autoTable({ head: [headers], body: data });
    doc.save("exported_samples.pdf");
  };

  return (
    <Button onClick={handleExportPDF} variant="contained">
      Export to PDF
    </Button>
  );
};

export default ExportSamplesHandler;
