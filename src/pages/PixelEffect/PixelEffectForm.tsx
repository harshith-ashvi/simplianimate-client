import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FileUpload from "@/components/ui/file-upload";

import { PixelEffectFormType } from "@/types/effectsOptions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const shapes = ["Square", "Circle", "Semi-Circle"];

const PixelEffectForm = ({
  formData,
  handleFormDataChange,
}: {
  formData: PixelEffectFormType;
  handleFormDataChange: (key: string, value: string | number) => void;
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
        <Label htmlFor="text">Pixel Shape</Label>
        <Select
          defaultValue="Square"
          value={formData.shape}
          onValueChange={(value) => handleFormDataChange("shape", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select file format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {shapes.map((shape) => {
                return (
                  <SelectItem key={shape} value={shape}>
                    {shape}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="my-4">
        <Label htmlFor="text">Image</Label>
        <FileUpload onFilesUploaded={onFilesUploaded} />
      </div>
    </div>
  );
};

export default PixelEffectForm;
