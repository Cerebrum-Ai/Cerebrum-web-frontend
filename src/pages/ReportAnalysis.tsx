import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText } from 'lucide-react';
import Tesseract from 'tesseract.js';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import CustomInput from '@/components/Input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnalysisResult {
  text: string;
  confidence: number;
  summary: string;
}

const GEMINI_API_KEY = 'AIzaSyCXzK2PYIxfs0uGqHL_HJpV3DQdsN0NL3E';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent';

const ReportAnalysis: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState<string | null>(null);

  const generateLocalSummary = (text: string): string => {
    let summary = "Medical Report Analysis:\n\n";
    
    if (text.includes("COMPLETE BLOOD COUNT") || text.includes("CBC")) {
      summary += "- Complete Blood Count (CBC) test results\n";
    }
    
    const hemoglobinMatch = text.match(/Hemoglobin\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(\w+\/?\w*)/i);
    if (hemoglobinMatch) {
      const value = hemoglobinMatch[1];
      const range = hemoglobinMatch[2];
      const units = hemoglobinMatch[3];
      summary += `- Hemoglobin: ${value} ${units} (Normal range: ${range})\n`;
      
      const rangeParts = range.split('-');
      if (rangeParts.length === 2) {
        const min = parseFloat(rangeParts[0]);
        const max = parseFloat(rangeParts[1]);
        const val = parseFloat(value);
        
        if (val < min) {
          summary += "  * Hemoglobin is below normal range, which may indicate anemia\n";
        } else if (val > max) {
          summary += "  * Hemoglobin is above normal range, which may indicate polycythemia\n";
        } else {
          summary += "  * Hemoglobin is within normal range\n";
        }
      }
    }
    
    const doctorMatch = text.match(/Dr\.\s+([A-Za-z\s]+)/i);
    if (doctorMatch) {
      summary += `- Report signed by: Dr. ${doctorMatch[1]}\n`;
    }
    
    if (summary === "Medical Report Analysis:\n\n") {
      summary += "- Basic medical report detected\n";
      summary += "- The document appears to contain medical test results\n";
      summary += "- For detailed analysis, please consult with a healthcare professional\n";
    }
    
    return summary;
  };

  const generateSummary = async (text: string): Promise<string> => {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a medical report analyzer. Your task is to analyze this medical report and provide a clear, concise summary focusing on key findings, diagnoses, and recommendations. Use medical terminology appropriately but explain complex terms in simple language.

Medical Report:
${text}

Please provide a clear summary of the above medical report.`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          }
        })
      });

      if (!response.ok) {
        console.error('Gemini API error:', await response.text());
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      return generateLocalSummary(text);
    }
  };

  const handleFileUpload = async (msg: string, url: string, type: string) => {
    if (!url) return;

    try {
      setIsProcessing(true);
      setFileUrl(url);
      setFileType(type);

      const { data: { text, confidence } } = await Tesseract.recognize(
        url,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              console.log('Progress:', m.progress);
            }
          }
        }
      );

      let cleanedText = text
        .replace(/\s+/g, ' ')
        .trim();
      
      cleanedText = cleanedText
        .replace(/[^\w\s.,()\/\-:;%+]/g, '')
        .replace(/(\d)\.(\d)/g, '$1.$2')
        .replace(/(\d),(\d)/g, '$1,$2');

      const summary = await generateSummary(cleanedText);

      const confidencePercentage = Math.min(Math.max(confidence * 100, 0), 100);

      setResult({
        text: cleanedText,
        confidence: confidencePercentage,
        summary
      });

      toast({
        title: "Success",
        description: "Report analyzed successfully!",
      });

    } catch (error) {
      console.error('Error processing report:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process the report. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Medical Report Analysis
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Upload Medical Report</CardTitle>
                  <CardDescription>
                    Upload an image of your medical report for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CustomInput
                    onSubmit={handleFileUpload}
                    isLoading={isProcessing}
                    message={message}
                    setMessage={setMessage}
                    fileUrl={fileUrl}
                    setFileUrl={setFileUrl}
                    fileType={fileType}
                    setFileType={setFileType}
                    keystrokes={[]}
                    setKeystrokes={() => {}}
                    handleKeyDown={() => {}}
                    handleKeyUp={() => {}}
                  />
                  <div className="flex justify-center">
                    <Button
                      onClick={() => handleFileUpload(message, fileUrl || "", fileType || "")}
                      disabled={isProcessing || (!message.trim() && !fileUrl)}
                      className="w-full bg-[#62d5d0] hover:bg-[#4db8b3] text-white"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Analyze Report"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {fileUrl && (
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src={fileUrl}
                    alt="Uploaded report"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
                  <Loader2 className="h-8 w-8 animate-spin text-[#62d5d0]" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Processing your report...
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      Analysis Summary
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {result.summary}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      Confidence: {Math.round(result.confidence)}%
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      Extracted Text
                    </h2>
                    <div className="max-h-96 overflow-y-auto">
                      <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {result.text}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <FileText className="h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Upload a medical report to see the analysis
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <EnhancedFooter />
    </div>
  );
};

export default ReportAnalysis; 