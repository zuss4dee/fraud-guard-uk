"use client";

import { motion } from "framer-motion";
import { FileText, ImageIcon, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FileListProps {
  file: File;
  onRemove: () => void;
  onAnalyze: () => void;
  isAnalyzing?: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

function sanitizeFileName(name: string): string {
  // Remove special characters except for dots, hyphens, and underscores
  return name.replace(/[^a-zA-Z0-9.\-_\s]/g, "").trim();
}

function getFileIcon(type: string) {
  if (type === "application/pdf") {
    return <FileText className="h-8 w-8 text-red-500" />;
  }
  return <ImageIcon className="h-8 w-8 text-blue-500" />;
}

function getFileTypeLabel(type: string): string {
  switch (type) {
    case "application/pdf":
      return "PDF Document";
    case "image/jpeg":
      return "JPEG Image";
    case "image/png":
      return "PNG Image";
    default:
      return "Document";
  }
}

export function FileList({
  file,
  onRemove,
  onAnalyze,
  isAnalyzing = false,
}: FileListProps) {
  const sanitizedName = sanitizeFileName(file.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* File Preview Card */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* File Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100">
                {getFileIcon(file.type)}
              </div>

              {/* File Info */}
              <div>
                <p className="font-medium text-slate-900">{sanitizedName}</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <span>{getFileTypeLabel(file.type)}</span>
                  <span>•</span>
                  <span>{formatFileSize(file.size)}</span>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              disabled={isAnalyzing}
              className="text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analyze Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="w-full bg-slate-900 py-6 text-base font-medium hover:bg-slate-800"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Document...
            </>
          ) : (
            "Analyze Document"
          )}
        </Button>
      </motion.div>

      {/* Security Note */}
      <p className="text-center text-xs text-slate-500">
        Your document is processed securely and never stored permanently.
      </p>
    </motion.div>
  );
}
