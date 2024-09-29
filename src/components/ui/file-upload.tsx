import { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface FileUploadProps {
  onFilesUploaded: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedFileTypes?: string[];
}

export default function FileUpload({
  onFilesUploaded,
  maxFiles = 1,
  maxSize = 5242880, // 5MB
  acceptedFileTypes = ["image/*"],
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        onFilesUploaded(acceptedFiles);
      }

      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            console.error(
              `Error: ${file.file.name} is larger than ${
                maxSize / 1024 / 1024
              }MB`
            );
          }

          if (err.code === "file-invalid-type") {
            console.error(`Error: ${file.file.name} has an invalid file type`);
          }
        });
      });
    },
    [onFilesUploaded, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      maxFiles,
      maxSize,
      accept: acceptedFileTypes.reduce(
        (acc, curr) => ({ ...acc, [curr]: [] }),
        {}
      ),
    });

  return (
    <div className="w-full max-w-md mx-auto p-y-4 space-y-4">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground"
          }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
        {isDragActive ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Drop the files here ...
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          {maxFiles > 1 ? `Up to ${maxFiles} files` : "One file"} allowed,{" "}
          {maxSize / 1024 / 1024}MB max
        </p>
      </div>
      {acceptedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium">Accepted Files:</h4>
          <ul className="mt-2 text-sm text-muted-foreground">
            {acceptedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
