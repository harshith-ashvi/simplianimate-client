import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GradientAroraForm = ({
  formData,
  handleFormDataChange,
}: {
  formData: {
    gradientOne: string;
    gradientTwo: string;
    gradientThree: string;
    gradientFour: string;
  };
  handleFormDataChange: (key: string, value: string) => void;
}) => {
  return (
    <div
      className="p-5 overflow-y-auto h-screen-minus-45"
      style={{ backgroundColor: "#f4f6fb" }}
    >
      <div>
        <Label htmlFor="gradientOne">Gradient Color 1</Label>
        <Input
          id="gradientOne"
          type="color"
          value={formData.gradientOne}
          onChange={(e) => handleFormDataChange("gradientOne", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="gradientTwo">Gradient Color 2</Label>
        <Input
          id="gradientTwo"
          type="color"
          value={formData.gradientTwo}
          onChange={(e) => handleFormDataChange("gradientTwo", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="gradientThree">Gradient Color 3</Label>
        <Input
          id="gradientThree"
          type="color"
          value={formData.gradientThree}
          onChange={(e) =>
            handleFormDataChange("gradientThree", e.target.value)
          }
        />
      </div>
      <div>
        <Label htmlFor="gradientFour">Gradient Color 4</Label>
        <Input
          id="gradientFour"
          type="color"
          value={formData.gradientFour}
          onChange={(e) => handleFormDataChange("gradientFour", e.target.value)}
        />
      </div>
    </div>
  );
};

export default GradientAroraForm;
