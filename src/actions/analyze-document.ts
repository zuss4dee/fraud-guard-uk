'use server'

// ============================================
// SIMULATION MODE - No API credits required
// ============================================
// TODO: When you have xAI credits, replace this file with the real implementation.
// The original code is saved in phase3-plan.md for reference.

export interface AnalysisResult {
  riskScore: number;
  summary: string;
  flags: string[];
  verdict: "VERIFIED" | "SUSPICIOUS" | "FRAUD";
}

export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export async function analyzeDocument(formData: FormData): Promise<AnalysisResponse> {
  console.log("SIMULATION MODE: Analyzing document...");
  
  // Get file info for logging
  const file = formData.get("file") as File | null;
  if (file) {
    console.log(`File received: ${file.name} (${file.size} bytes)`);
  }
  
  // 1. Fake Delay (so it feels like AI is working)
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // 2. Return Mock "Suspicious" Result
  // Change the values below to test different UI states:
  // - VERIFIED: riskScore 80-100
  // - SUSPICIOUS: riskScore 40-79
  // - FRAUD: riskScore 0-39
  return {
    success: true,
    data: {
      riskScore: 35, // Low score = High Risk
      verdict: "SUSPICIOUS", // Options: VERIFIED, SUSPICIOUS, FRAUD
      summary: "FORENSIC ALERT: This document appears to be a digitally altered bank statement. The font metrics on the transaction dates do not match the bank's standard template.",
      flags: [
        "Digital Artifacts: Inconsistent pixel density around the 'Balance' column.",
        "Font Mismatch: Transaction dates use 'Arial' instead of 'Calibri'.",
        "Math Error: Transaction list sum (£1,200) does not match Closing Balance (£4,500).",
        "Metadata: Document was last saved using 'Canva PDF Writer'."
      ]
    }
  };
}
