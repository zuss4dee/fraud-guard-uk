"use client";

import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Loader2,
} from "lucide-react";
import { UploadZone } from "@/components/upload/upload-zone";
import { FileList } from "@/components/upload/file-list";
import { ComplianceReport } from "@/components/reports/compliance-report";
import { analyzeDocument, AnalysisResult } from "@/actions/analyze-document";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [scanDate, setScanDate] = useState<Date | null>(null);

  const reportRef = useRef<HTMLDivElement>(null);

  const handleFileAccepted = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);
    setResult(null);
    setScanDate(null);
  }, []);

  const handleFileRejected = useCallback((message: string) => {
    setError(message);
    setSelectedFile(null);
    setResult(null);
    setScanDate(null);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
    setResult(null);
    setScanDate(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await analyzeDocument(formData);

      if (response.success && response.data) {
        setResult(response.data);
        setScanDate(new Date());
      } else {
        setError(response.error || "Analysis failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedFile]);

  const handleDownloadPdf = useCallback(async () => {
    if (!reportRef.current || !result) return;

    setIsGeneratingPdf(true);

    try {
      // Capture the report as PNG using html-to-image
      const imgData = await toPng(reportRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        skipFonts: true, // Skip font embedding to avoid issues
        filter: (node) => {
          // Filter out any problematic elements
          return true;
        },
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4 dimensions in mm
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add image to PDF (fit to page)
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Generate filename with date
      const today = new Date();
      const dateStr = today.toISOString().split("T")[0];
      const fileName = `FraudGuard_Report_${dateStr}.pdf`;

      // Download
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [result]);

  const handleNewScan = useCallback(() => {
    setSelectedFile(null);
    setError(null);
    setResult(null);
    setScanDate(null);
  }, []);

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "VERIFIED":
        return "text-green-600 bg-green-50 border-green-200";
      case "SUSPICIOUS":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "FRAUD":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "VERIFIED":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "SUSPICIOUS":
        return <AlertCircle className="h-6 w-6 text-amber-600" />;
      case "FRAUD":
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Hidden Report for PDF Generation */}
      {result && scanDate && (
        <div className="absolute left-[-9999px]">
          <ComplianceReport
            ref={reportRef}
            data={{ data: result }}
            referenceId={`FG-${Date.now().toString(36).toUpperCase()}`}
          />
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          New Document Analysis
        </h1>
        <p className="mt-1 text-slate-500">
          Upload a tenancy document to verify its authenticity
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg bg-slate-100 px-3 py-2 md:gap-6 md:px-4 md:py-3">
        <div className="flex items-center gap-2 text-xs text-slate-600 md:text-sm">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>Secure Processing</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 md:text-sm">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 md:text-sm">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>GDPR Compliant</span>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          >
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Verdict Card */}
            <Card className={`border-2 ${getVerdictColor(result.verdict)}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Analysis Result</CardTitle>
                  {getVerdictIcon(result.verdict)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Verdict Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Verdict
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${getVerdictColor(result.verdict)}`}
                  >
                    {result.verdict}
                  </span>
                </div>

                {/* Risk Score */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Risk Score
                  </span>
                  <span
                    className={`text-2xl font-bold ${getRiskScoreColor(result.riskScore)}`}
                  >
                    {result.riskScore}/100
                  </span>
                </div>

                {/* Summary */}
                <div>
                  <span className="text-sm font-medium text-slate-500">
                    Summary
                  </span>
                  <p className="mt-1 text-sm text-slate-700">{result.summary}</p>
                </div>

                {/* Flags */}
                {result.flags.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-slate-500">
                      Issues Found ({result.flags.length})
                    </span>
                    <ul className="mt-2 space-y-1">
                      {result.flags.map((flag, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleNewScan}
                variant="outline"
                className="flex-1"
              >
                Scan Another Document
              </Button>
              <Button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex-1 bg-slate-900 hover:bg-slate-800"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </>
                )}
              </Button>
            </div>

            {/* Raw JSON (Debug) */}
            <details className="rounded-lg border border-slate-200 bg-slate-50">
              <summary className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-600">
                View Raw Response (Debug)
              </summary>
              <pre className="overflow-auto p-4 text-xs text-slate-600">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Zone or File List (hide when showing results) */}
      {!result && (
        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FileList
                file={selectedFile}
                onRemove={handleRemoveFile}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </motion.div>
          ) : (
            <motion.div
              key="upload-zone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UploadZone
                onFileAccepted={handleFileAccepted}
                onFileRejected={handleFileRejected}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Supported Formats Info */}
      {!result && (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-medium text-slate-900">
            Supported Document Types
          </h3>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600 sm:text-sm md:grid-cols-3">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              Bank Statements
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              ID Documents
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              University Letters
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Employment Letters
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              Payslips
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              Other Documents
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
