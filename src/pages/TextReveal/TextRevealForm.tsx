import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const TextRevealForm = ({
  formData,
  handleFormDataChange,
}: {
  formData: {
    backgroundColor: string;
    font: string;
    fontSize: number;
    fontColor: string;
    stickColor: string;
    text: string;
  };
  handleFormDataChange: (key: string, value: string | number) => void;
}) => {
  return (
    <div
      className="p-5 h-screen-minus-45"
      style={{ backgroundColor: "#f4f6fb" }}
    >
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
        <Label htmlFor="font">Font</Label>
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
      <div>
        <Label htmlFor="fontSize">Font Size</Label>
        <Input
          id="fontSize"
          type="number"
          value={formData.fontSize}
          onChange={(e) => handleFormDataChange("fontSize", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="fontColor">Font color</Label>
        <Input
          id="fontColor"
          type="color"
          value={formData.fontColor}
          onChange={(e) => handleFormDataChange("fontColor", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="stickColor">Stick color</Label>
        <Input
          id="stickColor"
          type="color"
          value={formData.stickColor}
          onChange={(e) => handleFormDataChange("stickColor", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="text">Text</Label>
        <Textarea
          id="text"
          placeholder="Enter text here."
          value={formData.text}
          onChange={(e) => handleFormDataChange("text", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextRevealForm;
