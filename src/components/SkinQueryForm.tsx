import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// Note: No need to import typingdna.js here, it's already imported in Input.tsx

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
  analysis?: {
    final_analysis: string;
    initial_diagnosis: string;
    vectordb_results: string;
  };
  status?: string;
}

declare global {
  interface Window {
    TypingDNA: any;
  }
}

const SkinQueryForm: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingPattern, setTypingPattern] = useState(null);
  const [typingDnaInstance, setTypingDnaInstance] = useState<any>(null);
  
  // Update to track keystrokes in the requested format
  interface KeyStroke {
    key: string;
    timeDown: number;
    timeUp: number | null;
  }
  
  const [keystrokes, setKeystrokes] = useState<KeyStroke[]>([]);
  const currentKeyRef = useRef<KeyStroke | null>(null);

  useEffect(() => {
    // Initialize TypingDNA only if it's not already initialized in Input.tsx
    if (typeof window !== "undefined" && window.TypingDNA) {
      try {
        const tdna = new window.TypingDNA();
        tdna.addTarget("symptoms"); // ID of textarea
        setTypingDnaInstance(tdna);
        console.log("TypingDNA initialized in SkinQueryForm");
      } catch (err) {
        console.error("Error initializing TypingDNA:", err);
      }
    }
  }, []);

  // Track key down events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentTime = Date.now();
    
    // Save the current key press with timeDown
    currentKeyRef.current = {
      key: e.key,
      timeDown: currentTime,
      timeUp: null
    };
  };

  // Track key up events
  const handleKeyUp = (e: React.KeyboardEvent) => {
    const currentTime = Date.now();
    
    // Only process if we have a corresponding keyDown event
    if (currentKeyRef.current && currentKeyRef.current.key === e.key) {
      const completeKeystroke: KeyStroke = {
        ...currentKeyRef.current,
        timeUp: currentTime
      };
      
      // Add to our keystrokes array
      setKeystrokes(prev => [...prev, completeKeystroke]);
      currentKeyRef.current = null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Get typing pattern if TypingDNA is available
      let pattern = null;
      if (typingDnaInstance && question.length > 0) {
        try {
          pattern = typingDnaInstance.getTypingPattern({
            type: 1,
            text: question
          });
          console.log("Typing pattern:", pattern);
          
          // Log the keystrokes in the requested format
          console.log("Keystrokes data:", JSON.stringify({ keystrokes }, null, 2));
        } catch (err) {
          console.error("Error getting typing pattern:", err);
        }
      }

      const formData = new FormData();
      formData.append("question", question);
      formData.append("image", imageUrl);
      if (pattern) {
        formData.append("typingPattern", pattern);
        // Not appending keystrokes to FormData yet
      }

      const response = await axios.post("/api/chat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Navigate to output page with the API response
      navigate('/output', { state: { apiResponse: response.data } });
    } catch (err: any) {
      setError("Failed to get a response. Please try again.");
      console.error("Error fetching data:", err.message);
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
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
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
          <div className="w-full p-3 mb-3 bg-red-100 border border-red-200 rounded-xl text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
            {error}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SkinQueryForm;
