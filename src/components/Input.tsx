import React, { useState } from "react";
import styled from "styled-components";
import { supabaseAdmin } from "@/lib/supabase";
import { Paperclip, Loader2, Image, Headphones } from "lucide-react";

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
          <div className={`inputGroup ${message.trim() ? 'has-text' : ''}`}>
            <div className="fileUploadWrapper">
              <label htmlFor="file" className="upload-button">
                <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="tooltip">Add an image or audio file</span>
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/png,audio/wav"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </div>
            <input
              type="text"
              id="messageInput"
              placeholder="Describe your symptoms in detail..."
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
              aria-label="Enter your medical symptoms"
            />
          </div>
        </div>
        
        {uploading && (
          <div className="flex items-center justify-center gap-2 text-sm">
            <Loader2 className="w-3 h-3 animate-spin text-[#62d5d0]" />
            <span className="text-gray-500 dark:text-gray-400">Uploading file...</span>
          </div>
        )}
        
        {error && (
          <div className="text-center text-red-500 text-sm mt-1">{error}</div>
        )}
        
        {(imageFile || audioFile || fileUrl) && (
          <div className="flex items-center gap-2 bg-teal-50/50 dark:bg-teal-900/20 px-3 py-2 rounded-lg text-xs">
            {imageFile && (
              <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                <Image className="w-3 h-3 text-[#62d5d0]" />
                <span>{imageFile.name}</span>
              </div>
            )}
            {audioFile && (
              <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                <Headphones className="w-3 h-3 text-[#62d5d0]" />
                <span>{audioFile.name}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inputGroup {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 500px;
    min-height: 52px;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    transition: all 0.2s ease;
    padding: 0.5rem;
    
    &:hover {
      border-color: #cbd5e1;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
    }
  }

  .dark .inputGroup {
    background-color: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(51, 65, 85, 0.5);
    
    &:hover {
      border-color: rgba(71, 85, 105, 0.8);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
  }

  .inputGroup:focus-within {
    border-color: #62d5d0;
    box-shadow: 0 0 0 2px rgba(98, 213, 208, 0.2);
  }

  .dark .inputGroup:focus-within {
    border-color: #62d5d0;
    box-shadow: 0 0 0 2px rgba(98, 213, 208, 0.1);
  }

  .inputGroup.has-text {
    border-color: #62d5d0;
  }

  .dark .inputGroup.has-text {
    border-color: #62d5d0;
  }

  .fileUploadWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 8px;
  }

  #file {
    display: none;
  }

  .upload-button {
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
      background-color: #f1f5f9;
    }
  }
  
  .dark .upload-button:hover {
    background-color: rgba(51, 65, 85, 0.5);
  }

  .tooltip {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    opacity: 0;
    color: white;
    font-size: 10px;
    white-space: nowrap;
    background-color: #0f172a;
    padding: 6px 10px;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    z-index: 10;
  }
  
  .dark .tooltip {
    background-color: #1e293b;
    border: 1px solid #334155;
  }

  .upload-button:hover .tooltip {
    display: block;
    opacity: 1;
  }

  #messageInput {
    width: 100%;
    min-height: 38px;
    padding: 0.5rem;
    background: transparent;
    outline: none;
    border: none;
    color: #0f172a;
    font-size: 14px;
  }
  
  .dark #messageInput {
    color: #f8fafc;
  }

  #messageInput:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  #messageInput::placeholder {
    color: #94a3b8;
  }
  
  .dark #messageInput::placeholder {
    color: #64748b;
  }
`;

export default Input;
