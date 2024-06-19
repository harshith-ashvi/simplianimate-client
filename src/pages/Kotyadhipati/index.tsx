import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProgressScreen from "@/components/progressScreen";
import TemplateNavbar from "@/components/template-navbar";

import KotyadhipatiCanvas from "./KotyadhipatiCanvas";
import KotyadhipatiForm from "./KotyadhipatiForm";

const Kotyadhipati = () => {
  const downloadDuration = useRef(8); //in seconds
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [downloadFile, setDownloadFile] = useState({
    canDownload: false,
    fileName: "",
    fileFormat: "",
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [canvasDimension, setCanvasDimesnion] = useState({
    width: window.innerWidth * 0.85,
    height: window.innerHeight - 45,
  });
  const [formData, setFormData] = useState<{
    screenResolution: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    timerCount: number;
    correctOption: string;
  }>({
    screenResolution: "Portrait",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    timerCount: 0,
    correctOption: "",
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timerId: any;
    if (isDownloading) {
      timerId = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 100);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [isDownloading]);

  const toggleDownloading = () => {
    setIsDownloading(!isDownloading);
    if (isDownloading) {
      setProgress(0);
    }
  };

  const handleFormDataChange = (key: string, value: string | number) => {
    if (key === "timerCount") {
      downloadDuration.current = Number(value);
    }
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleExportAnimation = (fileName: string, fileFormat: string) => {
    setDownloadFile({ canDownload: true, fileName, fileFormat });
    toggleDownloading();
  };

  const resetFileDownload = () =>
    setDownloadFile({ canDownload: false, fileName: "", fileFormat: "" });

  const handlegetSize = (size: number) => {
    setCanvasDimesnion((prevState) => ({
      ...prevState,
      width: size * window.innerWidth,
    }));
  };

  const toggleShowForm = () => setIsFormOpen(!isFormOpen);

  return (
    <div style={{ height: "inherit" }}>
      <ProgressScreen
        isDownloading={isDownloading}
        downloadDuration={downloadDuration.current + 5}
        progress={progress}
      />
      <TemplateNavbar
        screenResolution={formData.screenResolution}
        handleFormDataChange={handleFormDataChange}
        handleExportAnimation={handleExportAnimation}
      />
      <div
        className="md:hidden absolute z-20 cursor-pointer mt-2 ml-2 p-1 bg-white"
        onClick={toggleShowForm}
      >
        {isFormOpen ? <X /> : <Menu />}
        {isFormOpen && (
          <KotyadhipatiForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        )}
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} className="max-md:hidden">
          <KotyadhipatiForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel onResize={handlegetSize}>
          <KotyadhipatiCanvas
            width={canvasDimension.width / 100}
            height={canvasDimension.height}
            downloadDuration={downloadDuration.current}
            formData={formData}
            downloadFile={downloadFile}
            resetFileDownload={resetFileDownload}
            toggleDownloading={toggleDownloading}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Kotyadhipati;
