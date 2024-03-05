import {
  RectangleVertical,
  RectangleHorizontal,
  Square,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ExportModal from "@/components/export-modal";

const TemplateNavbar = ({
  screenResolution,
  handlePressBack,
  handleFormDataChange,
  handleExportAnimation,
}: {
  screenResolution: string;
  handlePressBack: () => void;
  handleFormDataChange: (key: string, value: string) => void;
  handleExportAnimation: (fileName: string, fileFormat: string) => void;
}) => {
  return (
    <div
      style={{
        height: 45,
        backgroundColor: "#f4f6fb",
      }}
      className="px-1 flex items-center justify-between"
    >
      <Button variant="ghost" onClick={handlePressBack}>
        <ChevronLeft className="mr-2 h-5 w-5" /> Back
      </Button>
      <div className="flex items-center">
        <ToggleGroup
          type="single"
          variant="outline"
          defaultValue="Portrait"
          value={screenResolution}
          onValueChange={(value) => {
            if (value) {
              handleFormDataChange("screenResolution", value);
            }
          }}
        >
          <ToggleGroupItem value="Portrait" aria-label="Toggle Portrait">
            <RectangleVertical className="h-6 w-6" />
          </ToggleGroupItem>
          <ToggleGroupItem value="Landscape" aria-label="Toggle Landscape">
            <RectangleHorizontal className="h-6 w-6" />
          </ToggleGroupItem>
          <ToggleGroupItem value="Square" aria-label="Toggle Square">
            <Square className="h-6 w-6" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ExportModal handleExportAnimation={handleExportAnimation} />
    </div>
  );
};

export default TemplateNavbar;
