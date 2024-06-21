import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

const textType = ["Prefilled", "Custom"];

const fpsOptions = [15, 30, 60];

const MatrixRainForm = ({
  formData,
  handleFormDataChange,
}: {
  formData: {
    backgroundColor: string;
    fontSize: number;
    fontColor: string;
    fps: number;
    textType: string;
    unicode: string;
    text: string;
  };
  handleFormDataChange: (key: string, value: string | number) => void;
}) => {
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
      <div>
        <Label htmlFor="fontSize">Font Size</Label>
        <Input
          id="fontSize"
          type="number"
          value={formData.fontSize}
          onChange={(e) =>
            handleFormDataChange("fontSize", Number(e.target.value))
          }
        />
      </div>
      <div>
        <Label htmlFor="color">Font color</Label>
        <Input
          id="color"
          type="color"
          value={formData.fontColor}
          onChange={(e) => handleFormDataChange("fontColor", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="fps">FPS</Label>
        <Select
          defaultValue="15"
          value={`${formData.fps}`}
          onValueChange={(value) => handleFormDataChange("fps", Number(value))}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select FPS" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fpsOptions.map((fpsOption) => (
                <SelectItem key={fpsOption} value={`${fpsOption}`}>
                  {fpsOption}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="textType">Text Type</Label>
        <Select
          defaultValue="Prefilled"
          value={formData.textType}
          onValueChange={(value) => handleFormDataChange("textType", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {textType.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {formData.textType === "Custom" && (
        <div>
          <Label htmlFor="text">Text</Label>
          <Textarea
            id="text"
            placeholder="Enter text here."
            value={formData.text}
            onChange={(e) => handleFormDataChange("text", e.target.value)}
          />
        </div>
      )}

      {/* <div className="mb-2">
        <Label htmlFor="direction">Direction</Label>
        <RadioGroup
          defaultValue="option-one"
          value={formData.direction}
          onValueChange={(value) => handleFormDataChange("direction", value)}
          className="mt-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="forward" id="forward" />
            <Label htmlFor="forward">Forward</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="backward" id="backward" />
            <Label htmlFor="backward">Backward</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="mb-2">
        <Label htmlFor="direction">Flyers Speed</Label>
        <Slider
          defaultValue={[formData.speed]}
          min={0}
          max={80}
          step={1}
          value={[formData.speed]}
          onValueChange={([value]) => handleFormDataChange("speed", value)}
          className="mt-2"
        />
      </div>
      <div className="mb-2">
        <Label htmlFor="direction">Flyers Count</Label>
        <Slider
          defaultValue={[formData.flyersCount]}
          min={8}
          max={80}
          step={1}
          value={[formData.flyersCount]}
          onValueChange={([value]) =>
            handleFormDataChange("flyersCount", value)
          }
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="text">Text</Label>
        <Textarea
          id="text"
          placeholder="Enter flyer text here."
          value={formData.flyerText}
          onChange={(e) => handleFormDataChange("flyerText", e.target.value)}
        />
      </div> */}
    </div>
  );
};

export default MatrixRainForm;
