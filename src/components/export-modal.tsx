import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const ExportModal = ({
  handleExportAnimation,
}: {
  handleExportAnimation: (fileName: string, fileFormat: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileDetails, setFileDetails] = useState({
    fileName: "",
    fileFormat: "mp4",
  });

  const handleFileDetailsChange = (key: string, value: string) => {
    setFileDetails((prevState) => ({ ...prevState, [key]: value }));
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
    setFileDetails({ fileName: "", fileFormat: "mp4" });
  };

  const exportAnimation = () => {
    handleExportAnimation(fileDetails.fileName, fileDetails.fileFormat);
    toggleModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={toggleModal}>
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Details</DialogTitle>
        </DialogHeader>
        <p className="flex items-center justify-center sm:hidden">
          Export works on web browsers
        </p>
        <div className="grid gap-4 py-4 max-sm:hidden">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              File Name
            </Label>
            <Input
              id="name"
              value={fileDetails.fileName}
              className="col-span-3"
              onChange={(e) =>
                handleFileDetailsChange("fileName", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fileFormat" className="text-right">
              File Format
            </Label>
            <Select
              defaultValue="mp4"
              value={fileDetails.fileFormat}
              onValueChange={(value) =>
                handleFileDetailsChange("fileFormat", value)
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select file format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="mp4">mp4</SelectItem>
                  <SelectItem value="webm">webm</SelectItem>
                  <SelectItem value="gif">gif</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="max-sm:hidden">
          <Button type="submit" onClick={exportAnimation}>
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
