import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// Note: No need to import typingdna.js here, it's already imported in Input.tsx
import styled from "styled-components";
// Removed supabaseAdmin import and upload logic
import CustomInput from "./Input";
import CustomCheckbox from "./CustomCheckbox";
import GradientButton from "./GradientButton";

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

  const [message, setMessage] = useState("");

  const [fileUrl, setFileUrl] = useState("");

  const [fileType, setFileType] = useState<string | null>(null); // 'image' or 'audio'

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [typingPattern, setTypingPattern] = useState(null);

  const [typingDnaInstance, setTypingDnaInstance] = useState<any>(null);

  const [includeTypingData, setIncludeTypingData] = useState(false);

  // Removed imageUrl and audioUrl state

  // Update to track keystrokes in the requested format

  interface KeyStroke {
    key: string;

    timeDown: number;

    timeUp: number | null;
  }

  const [keystrokes, setKeystrokes] = useState<KeyStroke[]>([]);

  const currentKeyRef = useRef<KeyStroke | null>(null);

  // Removed uploadToSupabase function

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

      timeUp: null,
    };
  };

  // Track key up events

  const handleKeyUp = (e: React.KeyboardEvent) => {
    const currentTime = Date.now();

    // Only process if we have a corresponding keyDown event

    if (currentKeyRef.current && currentKeyRef.current.key === e.key) {
      const completeKeystroke: KeyStroke = {
        ...currentKeyRef.current,

        timeUp: currentTime,
      };

      // Add to our keystrokes array

      setKeystrokes((prev) => [...prev, completeKeystroke]);

      currentKeyRef.current = null;
    }
  };

  // Handler to receive message and file urls from CustomInput

  const handleInputSubmit = async (
    msg: string,
    uploaded: { imageUrl: string; audioUrl: string }
  ) => {
    if (!msg.trim()) return;
    setIsLoading(true);
    setError(null);
    setMessage(""); // Clear message after submit
    setFileUrl("");
    setFileType(null);
    setKeystrokes([]); // Clear keystrokes after submit
    try {
      const payload: any = {
        question: msg,
        image: uploaded.imageUrl || (fileType === "image" ? fileUrl : ""),
        audio: uploaded.audioUrl || (fileType === "audio" ? fileUrl : ""),
        typing: {
          keystrokes: keystrokes.map(k => ({
            key: k.key,
            timeDown: k.timeDown,
            timeUp: k.timeUp
          }))
        }
      };
      console.log("Sending to API:", payload);
      const response = await axios.post("/api/external/chat", payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 100000 // 100 seconds timeout to match --max-time 100
      });
      if (response.data.error) {
        setError(response.data.error);
        setIsLoading(false);
        return;
      }
      navigate("/output", { state: { apiResponse: response.data } });
    } catch (err: any) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to get a response. Please try again."
      );
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      setError("Please enter your symptoms first.");

      return;
    }

    setError(null);

    await handleInputSubmit(message, {
      imageUrl: "",

      audioUrl: "",
    });
  };

  return (
    <Card className="w-full max-w-xl mx-auto bg-white/90 dark:bg-card/90 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-[#62d5d0]">Medical Data</CardTitle>

        <CardDescription className="text-gray-600 dark:text-gray-400">
          Describe your symptoms below. Optionally, you can upload a PNG image
          or WAV audio for additional analysis.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full flex justify-center">
            <CustomInput
              onSubmit={async (msg: string, url: string, type: string) => {
                let uploaded = { imageUrl: "", audioUrl: "" };

                if (type === "image") {
                  uploaded.imageUrl = url;
                } else if (type === "audio") {
                  uploaded.audioUrl = url;
                }

                await handleInputSubmit(msg, uploaded);
              }}
              isLoading={isLoading}
              message={message}
              setMessage={setMessage}
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
              fileType={fileType}
              setFileType={setFileType}
              keystrokes={keystrokes}
              setKeystrokes={setKeystrokes}
              handleKeyDown={handleKeyDown}
              handleKeyUp={handleKeyUp}
            />
          </div>

          <div className="flex justify-center">
            <CustomCheckbox
              checked={includeTypingData}
              onChange={setIncludeTypingData}
            />
          </div>

          <div className="flex justify-center">
            <GradientButton
              onClick={handleSubmit}
              disabled={isLoading}
              text={isLoading ? "Processing..." : "Submit"}
            />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />

              <span>Analyzing your input...</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center">
        {error && (
          <div className="w-full text-center p-3 mb-3 bg-red-100 border border-red-200 rounded-xl text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
            {error}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SkinQueryForm;
