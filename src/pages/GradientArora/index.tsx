import { useEffect, useState } from "react";
import { TextCursorInput } from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProgressScreen from "@/components/progressScreen";
import TemplateNavbar from "@/components/template-navbar";

import GradientAroraCanvas from "./GradientAroraCanvas";
import GradientAroraForm from "./GradientAroraForm";

const downloadDuration = 8; //in seconds

const GradientArora = () => {
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
    gradientOne: string;
    gradientTwo: string;
    gradientThree: string;
    gradientFour: string;
  }>({
    screenResolution: "Portrait",
    gradientOne: "#043D5D",
    gradientTwo: "#032E46",
    gradientThree: "#23B684",
    gradientFour: "#0F595E",
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

  const handleFormDataChange = (key: string, value: string) => {
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
        downloadDuration={downloadDuration}
        progress={progress}
      />
      <TemplateNavbar
        templateName="gradient-arora"
        screenResolution={formData.screenResolution}
        handleFormDataChange={handleFormDataChange}
        handleExportAnimation={handleExportAnimation}
      />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} className="max-md:hidden">
          <GradientAroraForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel onResize={handlegetSize}>
          <GradientAroraCanvas
            width={canvasDimension.width / 100}
            height={canvasDimension.height}
            downloadDuration={downloadDuration}
            formData={formData}
            downloadFile={downloadFile}
            resetFileDownload={resetFileDownload}
            toggleDownloading={toggleDownloading}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="md:hidden w-full flex items-center justify-center absolute bottom-0 cursor-pointer py-2 z-50 bg-template-form">
              <div className="bg-template-form flex flex-col items-center">
                <TextCursorInput
                  size={20}
                  onClick={toggleShowForm}
                  className="bg-template-form"
                />
                <p className="text-xs">Input</p>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-template-form">
            <SheetHeader>
              <SheetDescription>
                <GradientAroraForm
                  formData={formData}
                  handleFormDataChange={handleFormDataChange}
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default GradientArora;
