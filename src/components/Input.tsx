import React, { useState } from "react";
import styled from "styled-components";
import { supabaseAdmin } from "@/lib/supabase";

interface CustomInputProps {
  onSubmit: (msg: string, url: string, type: string) => void | Promise<void>;
  isLoading: boolean;
  message: string;
  setMessage: (msg: string) => void;
  fileUrl: string;
  setFileUrl: (url: string) => void;
  fileType: string | null;
  setFileType: (type: string | null) => void;
  keystrokes: any[];
  setKeystrokes: (ks: any[]) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleKeyUp: (e: React.KeyboardEvent) => void;
}

const Input: React.FC<CustomInputProps> = ({
  onSubmit,
  isLoading,
  message,
  setMessage,
  fileUrl,
  setFileUrl,
  fileType,
  setFileType,
  keystrokes,
  setKeystrokes,
  handleKeyDown,
  handleKeyUp,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection and upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) return;

    const isPng = selected.type === "image/png";
    const isWav = selected.type === "audio/wav";

    if (!isPng && !isWav) {
      setError("Only PNG images or WAV audio files are allowed.");
      return;
    }

    // Check if we already have this type of file
    if (isPng && imageFile) {
      setError("You can only upload one image file.");
      return;
    }
    if (isWav && audioFile) {
      setError("You can only upload one audio file.");
      return;
    }

    setError(null);
    setFileUrl("");
    setFileType(null);
    setUploading(true);

    const bucket = isPng ? "image.upload" : "audio.upload";
    const filePath = `${Date.now()}_${selected.name}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, selected, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);
    if (urlData?.publicUrl) {
      setFileUrl(urlData.publicUrl);
      if (isPng) {
        setImageFile(selected);
        setFileType("image");
      } else {
        setAudioFile(selected);
        setFileType("audio");
      }
    } else {
      setError("Failed to get public URL.");
    }
    setUploading(false);
  };

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    onSubmit(
      trimmedMessage,
      fileUrl || "",
      fileUrl
        ? fileType === "image"
          ? "image"
          : fileType === "audio"
          ? "audio"
          : ""
        : ""
    );
    setMessage("");
    setImageFile(null);
    setAudioFile(null);
    setFileUrl("");
    setFileType(null);
    setError(null);
  };

  return (
    <StyledWrapper>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="container flex justify-center w-full">
          <div className="messageBox">
            <div className="fileUploadWrapper">
              <label htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 337 337"
                >
                  <circle
                    strokeWidth={20}
                    stroke="#6c6c6c"
                    fill="none"
                    r="158.5"
                    cy="168.5"
                    cx="168.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeWidth={25}
                    stroke="#6c6c6c"
                    d="M167.759 79V259"
                  />
                  <path
                    strokeLinecap="round"
                    strokeWidth={25}
                    stroke="#6c6c6c"
                    d="M79 167.138H259"
                  />
                </svg>
                <span className="tooltip">Optional: Add an image or audio</span>
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/png,audio/wav"
                onChange={handleFileChange}
              />
            </div>
            <input
              type="text"
              id="messageInput"
              placeholder="Enter your message here... *"
              value={message}
              onChange={(e) => {
                const msg = e.target.value;
                setMessage(msg);
              }}
              disabled={isLoading}
              onKeyDown={(e) => {
                handleKeyDown(e);
                if (e.key === "Enter" && message.trim()) {
                  handleSubmit();
                }
              }}
              onKeyUp={handleKeyUp}
            />
          </div>
        </div>
        {uploading && (
          <div className="text-center text-white mt-2">Uploading...</div>
        )}
        {error && <div className="text-center text-red-500 mt-2">{error}</div>}
        <div className="flex flex-col items-center gap-2">
          {imageFile && (
            <div className="text-black dark:text-white text-sm text-center">
              Image: {imageFile.name}
            </div>
          )}
          {audioFile && (
            <div className="text-black dark:text-white text-sm text-center">
              Audio: {audioFile.name}
            </div>
          )}
          {fileUrl && (
            <div className="text-center">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#62d5d0] text-sm"
              >
                View Latest Upload
              </a>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .messageBox {
    width: fit-content;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2d2d2d;
    padding: 0 15px;
    border-radius: 10px;
    border: 1px solid rgb(63, 63, 63);
    transition: all 0.3s ease;
  }

  :global(.light) .messageBox {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
  }

  .messageBox:focus-within {
    border: 1px solid rgb(110, 110, 110);
  }

  :global(.light) .messageBox:focus-within {
    border: 1px solid #9ca3af;
  }

  .fileUploadWrapper {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
  }

  #file {
    display: none;
  }

  .fileUploadWrapper label {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .fileUploadWrapper label svg {
    height: 18px;
  }

  .fileUploadWrapper label svg path,
  .fileUploadWrapper label svg circle {
    stroke: #6c6c6c;
    transition: all 0.3s;
  }

  :global(.light) .fileUploadWrapper label svg path,
  :global(.light) .fileUploadWrapper label svg circle {
    stroke: #4b5563;
  }

  .fileUploadWrapper label:hover svg path,
  .fileUploadWrapper label:hover svg circle {
    stroke: #fff;
  }

  :global(.light) .fileUploadWrapper label:hover svg path,
  :global(.light) .fileUploadWrapper label:hover svg circle {
    stroke: #1f2937;
  }

  .fileUploadWrapper label:hover svg circle {
    fill: #3c3c3c;
  }

  :global(.light) .fileUploadWrapper label:hover svg circle {
    fill: #e5e7eb;
  }

  .fileUploadWrapper label:hover .tooltip {
    display: block;
    opacity: 1;
  }

  .tooltip {
    position: absolute;
    top: -40px;
    display: none;
    opacity: 0;
    color: white;
    font-size: 10px;
    text-wrap: nowrap;
    background-color: #000;
    padding: 6px 10px;
    border: 1px solid #3c3c3c;
    border-radius: 5px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.596);
    transition: all 0.3s;
  }

  :global(.light) .tooltip {
    color: #1f2937;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  }

  #messageInput {
    width: 400px;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    padding-left: 10px;
    color: white;
  }

  :global(.light) #messageInput {
    color: #1f2937;
  }

  #messageInput::placeholder {
    color: #6c6c6c;
  }

  :global(.light) #messageInput::placeholder {
    color: #9ca3af;
  }

  .sendButton {
    width: 40px;
    height: 40px;
    background-color: #2d2d2d;
    outline: none;
    border: 1px solid rgb(63, 63, 63);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0 10px;
  }

  :global(.light) .sendButton {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
  }

  .sendButton:hover {
    border-color: rgb(110, 110, 110);
  }

  :global(.light) .sendButton:hover {
    border-color: #9ca3af;
  }

  .sendButton svg {
    height: 18px;
    transition: all 0.3s;
  }

  .sendButton svg path {
    transition: all 0.3s;
  }

  .sendButton:hover svg path {
    fill: #3c3c3c;
    stroke: white;
  }

  :global(.light) .sendButton:hover svg path {
    fill: #f5f5f5;
    stroke: #1f2937;
  }

  .sendButton:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Input;
