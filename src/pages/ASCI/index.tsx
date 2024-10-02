import { useState } from "react";
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
import TemplateNavbar from "@/components/template-navbar";

import ASCIIForm from "./ASCIIForm";
import ASCIICanvas from "./ASCIICanvas";

import { imageDownloadFormats } from "@/data/canvas";

import { ASCIIEffectForm } from "@/types/effectsOptions";

const ASCII = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [downloadFile, setDownloadFile] = useState({
    canDownload: false,
    fileName: "",
    fileFormat: "",
  });
  const [canvasDimension, setCanvasDimesnion] = useState({
    width: window.innerWidth * 0.85,
    height: window.innerHeight - 45,
  });
  const [formData, setFormData] = useState<ASCIIEffectForm>({
    screenResolution: "Portrait",
    isColored: true,
    symbols: "Ñ@#W$9876543210?!abc;:+=-,._ ",
    resolution: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  const handleFormDataChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleExportAnimation = (fileName: string, fileFormat: string) => {
    setDownloadFile({ canDownload: true, fileName, fileFormat });
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
      <TemplateNavbar
        showScreenResolutionOptions={false}
        templateName="ascii-art"
        screenResolution={formData.screenResolution}
        downloadFormats={imageDownloadFormats}
        handleFormDataChange={handleFormDataChange}
        handleExportAnimation={handleExportAnimation}
      />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} className="max-md:hidden">
          <ASCIIForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel onResize={handlegetSize}>
          <ASCIICanvas
            width={canvasDimension.width / 100}
            height={canvasDimension.height}
            formData={formData}
            downloadFile={downloadFile}
            resetFileDownload={resetFileDownload}
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
                <ASCIIForm
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

export default ASCII;
