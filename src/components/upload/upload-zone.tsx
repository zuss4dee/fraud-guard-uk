"use client";

import { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

interface UploadZoneProps {
  onFileAccepted: (file: File) => void;
  onFileRejected: (message: string) => void;
  disabled?: boolean;
}

export function UploadZone({
  onFileAccepted,
  onFileRejected,
  disabled = false,
}: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        const error = rejection.errors[0];

        if (error.code === "file-too-large") {
          onFileRejected("File is too large. Maximum size is 10MB.");
        } else if (error.code === "file-invalid-type") {
          onFileRejected(
            "Invalid file type. Please upload a PDF, JPG, or PNG file."
          );
        } else {
          onFileRejected("File could not be accepted. Please try again.");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted, onFileRejected]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: ACCEPTED_FILE_TYPES,
      maxSize: MAX_FILE_SIZE,
      multiple: false,
      disabled,
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed p-16 text-center transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          isDragReject
            ? "border-red-400 bg-red-50"
            : isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"
        )}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {isDragReject ? (
            <motion.div
              key="reject"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-full bg-red-100 p-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-red-700">
                Invalid file type
              </h3>
              <p className="mt-2 text-sm text-red-600">
                Please upload a PDF, JPG, or PNG file only.
              </p>
            </motion.div>
          ) : isDragActive ? (
            <motion.div
              key="active"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="rounded-full bg-blue-100 p-4"
              >
                <CloudUpload className="h-12 w-12 text-blue-600" />
              </motion.div>
              <h3 className="mt-4 text-lg font-medium text-blue-700">
                Drop your file here
              </h3>
              <p className="mt-2 text-sm text-blue-600">
                Release to upload your document
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-full bg-slate-100 p-4">
                <CloudUpload className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-slate-900">
                Drag & drop your document here, or click to browse
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Supports PDF, JPG, PNG (Max 10MB)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
