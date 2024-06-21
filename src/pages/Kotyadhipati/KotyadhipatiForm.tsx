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

const correctOptions = [
  { label: "Option A", value: "A" },
  { label: "Option B", value: "B" },
  { label: "Option C", value: "C" },
  { label: "Option D", value: "D" },
];

const KotyadhipatiForm = ({
  formData,
  handleFormDataChange,
}: {
  formData: {
    screenResolution: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    timerCount: number;
    correctOption: string;
  };
  handleFormDataChange: (key: string, value: string | number) => void;
}) => {
  return (
    <div className="p-5 overflow-y-auto md:h-screen-minus-45 max-md:h-fit bg-template-form">
      <div>
        <Label htmlFor="question">Question</Label>
        <Textarea
          id="question"
          placeholder="Enter question here"
          value={formData.question}
          onChange={(e) => handleFormDataChange("question", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="optionA">Option A</Label>
        <Input
          id="optionA"
          type="text"
          placeholder="Enter Option A here"
          value={formData.optionA}
          onChange={(e) => handleFormDataChange("optionA", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="optionB">Option B</Label>
        <Input
          id="optionB"
          type="text"
          placeholder="Enter Option B here"
          value={formData.optionB}
          onChange={(e) => handleFormDataChange("optionB", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="optionC">Option C</Label>
        <Input
          id="optionC"
          type="text"
          placeholder="Enter Option C here"
          value={formData.optionC}
          onChange={(e) => handleFormDataChange("optionC", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="optionD">Option D</Label>
        <Input
          id="optionD"
          type="text"
          placeholder="Enter Option D here"
          value={formData.optionD}
          onChange={(e) => handleFormDataChange("optionD", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="timerCount">Timer</Label>
        <Input
          id="timerCount"
          type="number"
          value={formData.timerCount}
          min={5}
          max={20}
          onChange={(e) =>
            handleFormDataChange("timerCount", Number(e.target.value))
          }
        />
      </div>
      <div>
        <Label htmlFor="fps">Correct Option</Label>
        <Select
          value={formData.correctOption}
          onValueChange={(value) =>
            handleFormDataChange("correctOption", value)
          }
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select Correct Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {correctOptions.map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default KotyadhipatiForm;
