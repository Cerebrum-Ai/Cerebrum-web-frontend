import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface ApiResponse {
  response?: string;
  error?: string;
}

const SkinQueryForm: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("image", imageUrl);

      const response = await axios.post("/api/chat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setApiResponse(response.data);
    } catch (err: any) {
      setError("Failed to get a response. Please try again.");
      console.error("Error fetching data:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto bg-white/90 dark:bg-card/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-[#62d5d0]">Skin Symptom Checker</CardTitle>
        <CardDescription>
          Describe your skin symptoms and provide an image URL for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="symptoms" className="text-sm font-medium">
              What's happening with your skin?
            </label>
            <Textarea
              id="symptoms"
              placeholder="E.g., 'I have red itchy patches on my arm'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-24"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="imageUrl" className="text-sm font-medium">
              Image URL
            </label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#62d5d0]/90 hover:bg-[#62d5d0] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Symptoms"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        {error && (
          <div className="w-full p-3 mb-3 bg-red-100 border border-red-200 rounded-md text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
            {error}
          </div>
        )}
        {apiResponse && (
          <div className="w-full mt-4">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
              Analysis Result:
            </h3>
            <pre className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SkinQueryForm;
