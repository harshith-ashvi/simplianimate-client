import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TemplateNavbar from "@/components/template-navbar";

import TextFlyersCanvas from "./TextFlyersCanvas";
import TextFlyersForm from "./TextFlyersForm";

const TextFlyers = () => {
  const [downloadFile, setDownloadFile] = useState({
    canDownload: false,
    fileName: "",
    fileFormat: "",
  });
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
    direction: string;
    speed: number;
    flyersCount: number;
    flyerText: string;
  }>({
    screenResolution: "Portrait",
    backgroundColor: "#ffffff",
    font: "Arial",
    fontSize: 200,
    fontColor: "#1616FF",
    direction: "forward",
    speed: 10,
    flyersCount: 24,
    flyerText: `Let's Goooo!`,
  });

  const handlePressBack = () => {};

  const handleFormDataChange = (key: string, value: string | number) => {
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

  return (
    <div style={{ height: "inherit" }}>
      <TemplateNavbar
        screenResolution={formData.screenResolution}
        handlePressBack={handlePressBack}
        handleFormDataChange={handleFormDataChange}
        handleExportAnimation={handleExportAnimation}
      />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15}>
          <TextFlyersForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel onResize={handlegetSize}>
          <TextFlyersCanvas
            width={canvasDimension.width / 100}
            height={canvasDimension.height}
            formData={formData}
            downloadFile={downloadFile}
            resetFileDownload={resetFileDownload}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TextFlyers;
