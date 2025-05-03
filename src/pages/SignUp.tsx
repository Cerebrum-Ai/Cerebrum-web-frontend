import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountInfo from "./signin/AccountInfo";
import PersonalInfo from "./signin/PersonalInfo";
import MedicalHistory from "./signin/MedicalHistory";
import LifestyleInfo from "./signin/LifestyleInfo";
import ReviewSubmit from "./signin/ReviewSubmit";

import { supabase } from "../lib/supabase";


const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Account Info
    email: "",
    password: "",

    // Personal Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    gender: "",

    // Medical Info
    height: "",
    weight: "",
    bloodType: "",
    chronicConditions: "",
    conditions: "",
    medications: "",
    allergies: "",
    familyHistory: "",

    // Lifestyle Info
    smokingStatus: "",
    alcoholConsumption: "",
    physicalActivity: "",
    sleepHours: "",
    diet: "",
    occupation: "",
    stressLevel: "",
    hobbies: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = async () => {
    if (step === 1) {
      try {
        // Sign up the user when moving from account info to personal info
        const { email, password } = formData;
        console.log("Attempting signup with email:", email);

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          console.error("Signup error:", error);
          alert("Sign up error: " + error.message);
          return;
        }

        if (data?.user) {
          console.log("Signup successful:", data.user);
          setStep((prev) => prev + 1);
        } else {
          console.error("No user data returned from signup");
          alert("Sign up failed: No user data returned");
        }
      } catch (err) {
        console.error("Unexpected error during signup:", err);
        alert("An unexpected error occurred during sign up");
        return;
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    // Insert profile data
    const { email, password, ...profileData } = formData;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Transform the data to match the database schema
      const profileInsert = {
        user_id: user.id, // assuming the column is named 'id' instead of 'user_id'
        email: email,
        first_name: profileData.firstName, // assuming snake_case in database
        last_name: profileData.lastName,
        date_of_birth: profileData.dateOfBirth,
        phone: profileData.phone,
        gender: profileData.gender,
        height: profileData.height,
        weight: profileData.weight,
        blood_type: profileData.bloodType,
        chronic_conditions: profileData.chronicConditions,
        conditions: profileData.conditions,
        medications: profileData.medications,
        allergies: profileData.allergies,
        family_history: profileData.familyHistory,
        smoking_status: profileData.smokingStatus,
        alcohol_consumption: profileData.alcoholConsumption,
        physical_activity: profileData.physicalActivity,
        sleep_hours: profileData.sleepHours,
        diet: profileData.diet,
        occupation: profileData.occupation,
        stress_level: profileData.stressLevel,
        hobbies: profileData.hobbies,
      };

      const { error: insertError } = await supabase
        .from("user_profiles") // assuming the table is named 'profiles'
        .insert([profileInsert]);

      if (insertError) {
        console.error("Profile insert error:", insertError);
        alert("Profile insert error: " + insertError.message);
        return;
      }
      alert("Sign up successful!");
    }
  };

  // Add animation to floating elements
  useEffect(() => {
    const animateFloatingElements = () => {
      const elements = document.querySelectorAll(".floating");

      elements.forEach((el) => {
        const element = el as HTMLElement;

        // Random parameters for varied animations
        const randomRotate = Math.random() * 12 - 6;
        const randomScale = 0.97 + Math.random() * 0.06;
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 4;
        const animationIndex = Math.floor(Math.random() * 5) + 1;

        element.style.animation = `float${animationIndex} ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
        element.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
      });
    };

    animateFloatingElements();
  }, []);

  return (
    <div>
      <svg
        className="pointer-events-none fixed w-[135vw] h-[135vw] md:w-[98vw] md:h-[98vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] opacity-55 select-none dark:opacity-20"
        viewBox="0 0 1200 900"
        fill="none"
      >
        <circle
          className="animate-pulse"
          cx="970"
          cy="350"
          r="69"
          fill="#a5f3fc"
          fillOpacity="0.11"
        />
        <circle cx="160" cy="180" r="70" fill="#67e8f9" fillOpacity="0.16" />
        <circle
          className="animate-pulse"
          cx="960"
          cy="789"
          r="35"
          fill="#22d3ee"
          fillOpacity="0.14"
        />
        <circle cx="980" cy="170" r="33" fill="#0ea5e9" fillOpacity="0.26" />
        <circle cx="120" cy="730" r="24" fill="#0284c7" fillOpacity="0.19" />
        <circle
          className="animate-pulse"
          cx="720"
          cy="100"
          r="41"
          fill="#0891b2"
          fillOpacity="0.18"
        />
      </svg>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blurred gradients */}
        <div className="floating absolute top-[15%] left-[10%] w-36 h-36 rounded-full bg-gradient-to-br from-blue-400/25 via-sky-300/20 to-cyan-300/15 blur-2xl"></div>
        <div className="floating absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-sky-400/25 via-blue-300/20 to-cyan-300/15 blur-2xl"></div>
        <div className="floating absolute top-[60%] left-[20%] w-32 h-32 rounded-full bg-gradient-to-tl from-blue-400/25 via-sky-300/20 to-cyan-300/15 blur-2xl"></div>

        {/* Small particles */}
        <div className="floating absolute top-[30%] right-[30%] w-6 h-6 rounded-full bg-blue-400/30"></div>
        <div className="floating absolute top-[40%] left-[40%] w-4 h-4 rounded-full bg-sky-400/35"></div>
        <div className="floating absolute bottom-[35%] left-[25%] w-5 h-5 rounded-full bg-blue-400/35"></div>
        <div className="floating absolute top-[25%] right-[18%] w-3 h-3 rounded-full bg-sky-400/35"></div>
        <div className="floating absolute bottom-[15%] right-[35%] w-4 h-4 rounded-full bg-cyan-400/35"></div>
      </div>

      <style>{`
                /* Animation patterns for floating elements */
                @keyframes float1 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(8px, -12px) rotate(2deg); }
                    66% { transform: translate(-10px, -3px) rotate(-1deg); }
                    100% { transform: translate(5px, 10px) rotate(1.5deg); }
                }
                
                @keyframes float2 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(-14px, 7px) rotate(-2deg); }
                    75% { transform: translate(7px, 14px) rotate(0.5deg); }
                    100% { transform: translate(10px, -10px) rotate(1.5deg); }
                }
                
                @keyframes float3 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    20% { transform: translate(10px, 10px) rotate(3deg); }
                    40% { transform: translate(-15px, 7px) rotate(-1.5deg); }
                    60% { transform: translate(0px, -18px) rotate(0deg); }
                    80% { transform: translate(12px, -7px) rotate(2deg); }
                    100% { transform: translate(-7px, 0px) rotate(-2deg); }
                }
                
                @keyframes float4 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    30% { transform: translate(7px, -16px) rotate(3deg) scale(1.02); }
                    70% { transform: translate(-14px, -7px) rotate(-3deg) scale(0.99); }
                    100% { transform: translate(10px, 10px) rotate(1.5deg) scale(1.01); }
                }
                
                @keyframes float5 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(-10px, -13px) rotate(-3.5deg); }
                    67% { transform: translate(18px, -3px) rotate(2deg); }
                    100% { transform: translate(-5px, 12px) rotate(-1.5deg); }
                }
                
                .floating {
                    will-change: transform;
                    transition: transform 0.4s ease-out;
                }
            `}</style>
      <StyledWrapper>
        <div className="form-container">
          <div className="form-header">
            <h1>Sign Up</h1>
            <p>Create your account to get started</p>
          </div>

          {/* Progress indicator */}
          <div className="progress-indicator">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`progress-dot ${stepNumber <= step ? "active" : ""}`}
              />
            ))}
          </div>

          {/* Render current step */}
          {step === 1 && (
            <AccountInfo
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <PersonalInfo
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <MedicalHistory
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 4 && (
            <LifestyleInfo
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 5 && (
            <ReviewSubmit
              formData={formData}
              handleSubmit={handleSubmit}
              prevStep={prevStep}
            />
          )}
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgb(215, 231, 255);

  .form-container {
    width: 800px;
    max-width: 90vw;
    background: linear-gradient(rgb(215, 231, 255), rgb(215, 231, 255)) padding-box,
      linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
    border: 2px solid transparent;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 16px;
  }

  .form-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(145deg, #e81cff, #40c9ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }

  .form-header p {
    color: #717171;
    margin-top: 8px;
    font-size: 1rem;
  }

  .progress-indicator {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .progress-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #414141;
    transition: all 0.3s ease;
  }

  .progress-dot.active {
    background-color: #e81cff;
    transform: scale(1.2);
  }

  .form-container button:active {
    scale: 0.95;
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }

  .form-container .form-group input,
  .form-container .form-group select,
  .form-container .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #414141;
  }

  .form-container .form-group textarea {
    resize: none;
    height: 96px;
  }

  .form-container .form-group input::placeholder {
    opacity: 0.5;
  }

  .form-container .form-group input:focus,
  .form-container .form-group select:focus,
  .form-container .form-group textarea:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-container .form-submit-btn {
    display: block;
    margin: 22px auto 0 auto;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    color:rgb(0, 0, 0);
    font-weight: 600;
    width: 40%;
    background:  linear-gradient(90deg, #e81cff 0%, #40c9ff 100%);
    border: 1px solid rgb(85, 102, 106);
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 6px;
  }

  .form-container .form-submit-btn:hover {
    background-color: #fff;
    border-color: #fff;
    color: #212121;
  }

  .form-container .form-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .form-container .form-submit-btn:disabled:hover {
    background-color: #313131;
    border-color: #414141;
    color: #717171;
  }

  .form-container .form-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .form-container .form-navigation button {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #717171;
    font-weight: 600;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }

  .form-container .form-navigation button:hover {
    color: #e81cff;
  }
`;

export default SignUp;
