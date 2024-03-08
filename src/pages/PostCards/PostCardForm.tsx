import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const fonts = [
  "Helvetica",
  "Arial",
  "Arial Black",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Gill Sans",
  "Times New Roman",
  "Georgia",
  "Palatino",
  "Baskerville",
  "Andalé Mono",
  "Courier",
  "Lucida",
  "Monaco",
  "Bradley Hand",
  "Brush Script MT",
  "Luminari",
  "Comic Sans MS",
];

const PostCardForm = ({
  formData,
  handleFormDataChange,
}: {
  formData: {
    backgroundColor: string;
    flyerType: string;
    font: string;
    fontSize: number;
    fontColor: string;
    direction: string;
    flyerText: string;
  };
  handleFormDataChange: (key: string, value: string) => void;
}) => {
  return (
    <div
      className="p-5"
      style={{ backgroundColor: "#f4f6fb", height: "calc(100vh - 45px)" }}
    >
      <div className="flex items-center gap-5">
        <Label htmlFor="color">Background color</Label>
        <Input
          id="color"
          type="color"
          value={formData.backgroundColor}
          onChange={(e) =>
            handleFormDataChange("backgroundColor", e.target.value)
          }
        />
      </div>
      <div className="flex items-center gap-5">
        <Label htmlFor="color">Flyer type</Label>
        <Select
          defaultValue="text"
          value={formData.flyerType}
          onValueChange={(value) => handleFormDataChange("flyerType", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select flyer type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="images">Images</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-5">
        <Label htmlFor="color">Font</Label>
        <Select
          defaultValue="Arial"
          value={formData.font}
          onValueChange={(value) => handleFormDataChange("font", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-5">
        <Label htmlFor="fontSize">Font Size</Label>
        <Input
          id="fontSize"
          type="number"
          value={formData.fontSize}
          onChange={(e) => handleFormDataChange("fontSize", e.target.value)}
        />
      </div>
      <div className="flex items-center gap-5">
        <Label htmlFor="color">Font color</Label>
        <Input
          id="color"
          type="color"
          value={formData.fontColor}
          onChange={(e) => handleFormDataChange("fontColor", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="direction">Direction</Label>
        <RadioGroup
          defaultValue="option-one"
          value={formData.direction}
          onValueChange={(value) => handleFormDataChange("direction", value)}
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
      <div className="flex items-center gap-5">
        <Label htmlFor="text">Flyer Text</Label>
        <Textarea
          id="text"
          placeholder="Enter flyer text here."
          value={formData.flyerText}
          onChange={(e) => handleFormDataChange("flyerText", e.target.value)}
        />
      </div>
    </div>
  );
};

export default PostCardForm;
