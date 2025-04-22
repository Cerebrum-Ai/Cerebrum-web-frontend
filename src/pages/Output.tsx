import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import EnhancedFooter from "@/components/EnhancedFooter";
import { Download, ArrowLeft } from "lucide-react";

interface ApiResponse {
  response?: string;
  error?: string;
  analysis?: {
    final_analysis: string;
    initial_diagnosis: string;
    vectordb_results: string;
  };
  status?: string;
}

const OutputPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //extracting the API response from the location state
  const apiResponse = location.state?.apiResponse as ApiResponse | undefined;

  const downloadResponse = () => {
    if (!apiResponse) return;
    
    // Create a Blob with the JSON data
    const jsonBlob = new Blob([JSON.stringify(apiResponse, null, 2)], { type: 'application/json' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(jsonBlob);
    
    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.download = `skin-analysis-${timestamp}.json`;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const goBackToInput = () => {
    navigate('/input');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-100 via-blue-50/60 to-white dark:from-[#34205e]/50 dark:via-background/60 dark:to-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Analysis Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Review your skin analysis results below. You can save these results or return to the input form.
          </p>
        </div>
        
        <Card className="w-full max-w-xl mx-auto bg-white/90 dark:bg-card/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#62d5d0]">Skin Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            {apiResponse ? (
              <pre className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  No analysis results available. Please submit a query from the input page.
                </p>
                <Button 
                  variant="default" 
                  className="bg-[#62d5d0]/90 hover:bg-[#62d5d0] text-white"
                  onClick={goBackToInput}
                >
                  Go to Input Page
                </Button>
              </div>
            )}
          </CardContent>
          {apiResponse && (
            <CardFooter className="flex flex-wrap justify-between gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={goBackToInput}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Input
              </Button>
              <Button 
                onClick={downloadResponse} 
                variant="default" 
                className="flex items-center gap-1 bg-[#62d5d0]/90 hover:bg-[#62d5d0] text-white"
              >
                <Download className="h-4 w-4" />
                Save Results
              </Button>
            </CardFooter>
          )}
        </Card>
        
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Note: This analysis is for informational purposes only and does not replace 
            professional medical advice. Always consult with a healthcare provider 
            for proper diagnosis and treatment.
          </p>
        </div>
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default OutputPage;