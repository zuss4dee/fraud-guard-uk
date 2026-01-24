import React from "react";
/* Note: We are importing Icons, but we will style them manually */
import { CheckCircle, AlertTriangle, Shield } from "lucide-react";

interface ComplianceReportProps {
  data: any;
  referenceId?: string;
}

export const ComplianceReport = React.forwardRef<HTMLDivElement, ComplianceReportProps>(
  ({ data, referenceId = "GEN-001" }, ref) => {
    
    // Logic to determine status
    const score = data?.data?.riskScore || 0;
    const isVerified = score >= 80;
    const isSuspicious = score >= 40 && score < 80;
    
    // Hardcoded Standard Colors (No variables!)
    const greenColor = "#16a34a"; // Green
    const amberColor = "#d97706"; // Amber
    const redColor = "#dc2626";   // Red
    const darkColor = "#0f172a";  // Dark Blue/Black
    const grayColor = "#64748b";  // Gray

    const statusColor = isVerified ? greenColor : isSuspicious ? amberColor : redColor;
    const statusText = isVerified ? "VERIFIED" : isSuspicious ? "CAUTION" : "HIGH RISK";

    return (
      <div
        ref={ref}
        id="pdf-report"
        style={{
          width: "794px",  // A4 Width
          minHeight: "1123px", // A4 Height
          padding: "40px",
          backgroundColor: "#ffffff", // Pure White
          color: "#000000",
          fontFamily: "Arial, Helvetica, sans-serif",
          position: "relative",
          boxSizing: "border-box"
        }}
      >
        {/* --- HEADER --- */}
        <div style={{ 
          borderBottom: "2px solid #0f172a", 
          paddingBottom: "24px", 
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Icon SVG wrapper */}
            <div style={{ color: darkColor }}>
               <Shield size={48} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: darkColor }}>
                FRAUDGUARD UK
              </h1>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: grayColor }}>
                Forensic Document Verification
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "10px", color: grayColor, textTransform: "uppercase" }}>
              Report Reference
            </p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: darkColor, fontFamily: "monospace" }}>
              {referenceId}
            </p>
          </div>
        </div>

        {/* --- VERDICT BANNER --- */}
        <div style={{ 
          backgroundColor: "#f8fafc", 
          border: `2px solid ${statusColor}`,
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: statusColor, textTransform: "uppercase" }}>
              Analysis Verdict
            </p>
            <h2 style={{ margin: "4px 0 0 0", fontSize: "42px", fontWeight: "900", color: statusColor }}>
              {statusText}
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "14px", color: grayColor }}>Risk Score</p>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: darkColor }}>
              {score}<span style={{ fontSize: "24px", color: "#cbd5e1" }}>/100</span>
            </div>
          </div>
        </div>

        {/* --- EXECUTIVE SUMMARY --- */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ 
            fontSize: "16px", 
            fontWeight: "bold", 
            color: darkColor, 
            borderBottom: "1px solid #e2e8f0", 
            paddingBottom: "8px",
            marginBottom: "12px",
            textTransform: "uppercase"
          }}>
            Executive Summary
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#334155" }}>
            {data?.data?.summary || "No summary provided."}
          </p>
        </div>

        {/* --- FORENSIC FINDINGS --- */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ 
            fontSize: "16px", 
            fontWeight: "bold", 
            color: darkColor, 
            borderBottom: "1px solid #e2e8f0", 
            paddingBottom: "8px",
            marginBottom: "16px",
            textTransform: "uppercase"
          }}>
            Forensic Findings
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data?.data?.flags?.map((flag: string, i: number) => (
              <div key={i} style={{ 
                padding: "12px", 
                backgroundColor: "#fff7ed", 
                border: "1px solid #ffedd5", 
                borderRadius: "6px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start"
              }}>
                <div style={{ color: amberColor, marginTop: "2px" }}>
                  <AlertTriangle size={16} />
                </div>
                <span style={{ fontSize: "13px", color: "#334155", fontWeight: "500" }}>{flag}</span>
              </div>
            ))}
            
            {(!data?.data?.flags || data?.data?.flags.length === 0) && (
              <div style={{ 
                padding: "12px", 
                backgroundColor: "#f0fdf4", 
                borderRadius: "6px", 
                color: greenColor,
                display: "flex",
                gap: "8px",
                alignItems: "center"
              }}>
                <CheckCircle size={16} />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>No anomalies detected.</span>
              </div>
            )}
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div style={{ 
          marginTop: "auto", 
          paddingTop: "32px", 
          borderTop: "1px solid #e2e8f0",
          position: "absolute",
          bottom: "40px",
          left: "40px",
          right: "40px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ margin: "0 0 4px 0", fontSize: "10px", color: grayColor, textTransform: "uppercase" }}>
                Generated By
              </p>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: "bold", color: darkColor }}>
                FraudGuard UK AI Engine
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: "10px", color: grayColor }}>
                Generated on {new Date().toLocaleDateString()}
              </p>
              <p style={{ margin: "4px 0 0 0", fontSize: "10px", color: grayColor, maxWidth: "300px" }}>
                 This is an advisory report. Not legal advice.
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
);

ComplianceReport.displayName = "ComplianceReport";
