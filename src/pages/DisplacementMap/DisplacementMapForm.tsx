import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FileUpload from "@/components/ui/file-upload";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DisplacementMapEffectFormType } from "@/types/effectsOptions";

// const displacementEffectTypes = ["Glass", "Pattern", "Noise", "Glitch"];
const displacementEffectTypes = ["Glass"];

const DisplacementMapForm = ({
  formData,
  handleFormDataChange,
}: {
  formData: DisplacementMapEffectFormType;
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
        <Label htmlFor="gradientOne">Strength</Label>
        <Slider
          defaultValue={[formData.strength]}
          min={1}
          max={100}
          step={1}
          value={[formData.strength]}
          onValueChange={([value]) => handleFormDataChange("strength", value)}
          className="mt-2"
        />
      </div>
      <div className="my-4">
        <Label htmlFor="gradientOne">Horizontal Displacement</Label>
        <Slider
          defaultValue={[formData.horizontalDisplacement]}
          min={0}
          max={20}
          step={1}
          value={[formData.horizontalDisplacement]}
          onValueChange={([value]) =>
            handleFormDataChange("horizontalDisplacement", value)
          }
          className="mt-2"
        />
      </div>
      <div className="my-4">
        <Label htmlFor="gradientOne">Vertical Displacement</Label>
        <Slider
          defaultValue={[formData.verticalDisplacement]}
          min={0}
          max={20}
          step={1}
          value={[formData.verticalDisplacement]}
          onValueChange={([value]) =>
            handleFormDataChange("verticalDisplacement", value)
          }
          className="mt-2"
        />
      </div>
      <div className="my-4">
        <Label htmlFor="text">Pixel Shape</Label>
        <Select
          defaultValue="Glass"
          value={formData.displacementEffectType}
          onValueChange={(value) =>
            handleFormDataChange("displacementEffectType", value)
          }
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select file format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {displacementEffectTypes.map((displacementEffectType) => {
                return (
                  <SelectItem
                    key={displacementEffectType}
                    value={displacementEffectType}
                  >
                    {displacementEffectType}
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

export default DisplacementMapForm;
