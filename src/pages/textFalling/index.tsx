import { useEffect, useRef, useState } from "react";
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

import TextFallingForm from "./TextFallingForm";
import TextFallingCanvas from "./TextFallingCanvas";

const TextFalling = () => {
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
    backgroundColor: string;
    font: string;
    fontSize: number;
    fontColor: string;
    text: string;
    fallDelay: number;
    fallType: string;
  }>({
    screenResolution: "Portrait",
    backgroundColor: "#81D58F",
    font: "Arial",
    fontSize: 36,
    fontColor: "#E63946",
    text: `SimpliAnimate`,
    fallDelay: 1,
    fallType: "random",
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
    if (key === "fallDelay") {
      downloadDuration.current = +value + 1.5;
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
        downloadDuration={downloadDuration.current}
        progress={progress}
      />
      <TemplateNavbar
        screenResolution={formData.screenResolution}
        handleFormDataChange={handleFormDataChange}
        handleExportAnimation={handleExportAnimation}
      />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} className="max-md:hidden">
          <TextFallingForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel onResize={handlegetSize}>
          <TextFallingCanvas
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
                <TextFallingForm
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

export default TextFalling;
