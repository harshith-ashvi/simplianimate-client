import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TemplateNavbar from "@/components/template-navbar";

import PostCardCanvas from "./PostCardCanvas";
import PostCardForm from "./PostCardForm";

const PostCards = () => {
  const [canvasDimension, setCanvasDimesnion] = useState({
    width: window.innerWidth * 0.85,
    height: window.innerHeight - 45,
  });
  const [formData, setFormData] = useState({
    screenResolution: "Portrait",
    backgroundColor: "#ffffff",
    flyerType: "text",
    font: "Arial",
    fontSize: 200,
    fontColor: "#1616FF",
    direction: "forward",
    flyerText: `Let's Goooo!`,
  });

  const handlePressBack = () => {};

  const handleFormDataChange = (key: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleExportAnimation = (fileName: string, fileFormat: string) => {
    console.log(fileName, fileFormat);
  };

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
          <PostCardForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel onResize={handlegetSize}>
          <PostCardCanvas
            width={canvasDimension.width / 100}
            height={canvasDimension.height}
            formData={formData}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PostCards;
