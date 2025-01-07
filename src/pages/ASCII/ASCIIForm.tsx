import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/ui/file-upload";

import { ASCIIEffectForm } from "@/types/effectsOptions";
import { Input } from "@/components/ui/input";

const ASCIIForm = ({
  formData,
  handleFormDataChange,
}: {
  formData: ASCIIEffectForm;
  handleFormDataChange: (key: string, value: string | number | boolean) => void;
}) => {
  const onFilesUploaded = async (files: File[]) => {
    const file = files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      handleFormDataChange("imageUrl", url);
    }
  };

  return (
    <div className="p-5 overflow-y-auto md:h-screen-minus-45 max-md:h-fit bg-template-form">
      <div>
        <Label htmlFor="backgroundColor">Background color</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={formData.backgroundColor}
          onChange={(e) =>
            handleFormDataChange("backgroundColor", e.target.value)
          }
        />
      </div>
      <div className="flex items-center justify-between my-2">
        <Label htmlFor="gradientOne">Colored</Label>
        <Switch
          id="airplane-mode"
          checked={formData.isColored}
          onCheckedChange={(value) => handleFormDataChange("isColored", value)}
          className="mt-2"
        />
      </div>
      <div className="my-4">
        <Label htmlFor="gradientOne">Resolution</Label>
        <Slider
          defaultValue={[formData.resolution]}
          min={1}
          max={30}
          step={1}
          value={[formData.resolution]}
          onValueChange={([value]) => handleFormDataChange("resolution", value)}
          className="mt-2"
        />
      </div>
      <div className="my-4">
        <Label htmlFor="text">ASCII Symbols</Label>
        <Textarea
          id="text"
          placeholder="Enter flyer text here."
          value={formData.symbols}
          onChange={(e) => handleFormDataChange("symbols", e.target.value)}
        />
      </div>
      <div className="my-4">
        <Label htmlFor="text">Image</Label>
        <FileUpload onFilesUploaded={onFilesUploaded} />
      </div>
    </div>
  );
};

export default ASCIIForm;
