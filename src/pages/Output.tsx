import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import EnhancedFooter from "@/components/EnhancedFooter";
import FlowConditions from "@/components/FlowConditions";
import { Download, ArrowLeft, Network } from "lucide-react";

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

        // Create filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        // Create an anchor element
        const a = document.createElement('a');
        a.href = url;
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
            <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Analysis Results
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Review your skin analysis results below. You can save these results or return to the input form.
                    </p>
                </div>

                {apiResponse ? (
                    <Tabs defaultValue="text" className="w-full">
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                            <TabsTrigger value="text">Text Analysis</TabsTrigger>
                            <TabsTrigger value="flow">Visual Flow</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="text">
                            <Card className="w-full max-w-6xl mx-auto bg-white/90 dark:bg-card/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-[#62d5d0]">Skin Analysis Result</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Analysis</h2>

                                            {apiResponse.analysis && (
                                                <>
                                                    <div className="mb-6">
                                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Final Analysis</h3>
                                                        <div className="p-3 bg-white dark:bg-gray-700/50 rounded-xl text-gray-800 dark:text-gray-200">
                                                            {apiResponse.analysis.final_analysis}
                                                        </div>
                                                    </div>

                                                    <div className="mb-6">
                                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Initial Diagnosis</h3>
                                                        <div className="p-3 bg-white dark:bg-gray-700/50 rounded-xl text-gray-800 dark:text-gray-200">
                                                            {apiResponse.analysis.initial_diagnosis}
                                                        </div>
                                                    </div>

                                                    <div className="mb-6">
                                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">VectorDB Results</h3>
                                                        <div className="p-3 bg-white dark:bg-gray-700/50 rounded-xl text-gray-800 dark:text-gray-200">
                                                            {apiResponse?.analysis?.vectordb_results && (
                                                                <div className="mt-6 w-full">
                                                                    <h3 className="font-semibold text-lg mb-4 text-[#62d5d0]">
                                                                        Similar Conditions (Vector DB Results):
                                                                    </h3>
                                                                    <div className="overflow-x-auto">
                                                                        <table className="min-w-full text-sm border border-gray-300 dark:border-gray-700">
                                                                            <thead className="bg-gray-100 dark:bg-gray-800">
                                                                                <tr>
                                                                                    <th className="px-4 py-2 border-b dark:border-gray-700">Condition</th>
                                                                                    <th className="px-4 py-2 border-b dark:border-gray-700">Symptoms</th>
                                                                                    <th className="px-4 py-2 border-b dark:border-gray-700">Treatment</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {[...apiResponse.analysis.vectordb_results.matchAll(
                                                                                    /([^,]+(?:\([^)]*\))?)\s*,"([^"]+)","([^"]+)"/g
                                                                                )].map((match, index) => (
                                                                                    <tr
                                                                                        key={index}
                                                                                        className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800"
                                                                                    >
                                                                                        <td className="px-4 py-2 border-b dark:border-gray-700">{match[1]}</td>
                                                                                        <td className="px-4 py-2 border-b dark:border-gray-700">{match[2]}</td>
                                                                                        <td className="px-4 py-2 border-b dark:border-gray-700">{match[3]}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {apiResponse.response && !apiResponse.analysis && (
                                                <div className="mb-2">
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Response</h3>
                                                    <div className="p-3 bg-white dark:bg-gray-700/50 rounded-xl text-gray-800 dark:text-gray-200">
                                                        {apiResponse.response}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
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
                            </Card>
                        </TabsContent>
                        
                        <TabsContent value="flow">
                            <Card className="w-full mx-auto bg-white/90 dark:bg-card/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-[#62d5d0] flex items-center gap-2">
                                        <Network size={20} />
                                        Condition Flow Visualization
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="p-2 rounded-xl">
                                        {/* Flow visualization component */}
                                        <FlowConditions apiResponse={apiResponse} />
                                    </div>
                                </CardContent>
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
                                    <Button
                                        variant="default"
                                        className="bg-[#62d5d0]/90 hover:bg-[#62d5d0] text-white"
                                        onClick={()=>navigate('/enhanced')}
                                    >
                                        Enhanced Analysis
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                ) : (
                    <Card className="w-full max-w-3xl mx-auto bg-white/90 dark:bg-card/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6 text-center">
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


                        </CardContent>
                    </Card>
                )}

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