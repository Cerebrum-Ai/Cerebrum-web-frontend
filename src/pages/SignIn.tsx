import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "../lib/supabase";
import SignUpButton from "../components/SignUpButton";

const SignIn: React.FC = () => {
  useEffect(() => {
    const animateFloatingElements = () => {
      const elements = document.querySelectorAll(".floating");

      elements.forEach((el) => {
        const element = el as HTMLElement;

        // Generate more varied motion patterns with slower animation
        // Create random rotation for more dimension
        const randomRotate = Math.random() * 12 - 6; // -6 to 6 degrees rotation (reduced from -7.5 to 7.5)

        // Random scale variation (subtle)
        const randomScale = 0.97 + Math.random() * 0.06; // Scale between 0.97 and 1.03 (reduced range)

        // Random delay and increased duration for slower animations
        const randomDelay = Math.random() * 2; // Increased from 1.5
        const randomDuration = 3 + Math.random() * 4; // Increased from 1.5 + Math.random() * 2.5

        // Create unique animation name for each element to have different motion paths
        const animationIndex = Math.floor(Math.random() * 5) + 1; // 5 different animations

        // Apply animations with varied transforms
        element.style.animation = `float${animationIndex} ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
        element.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
      });
    };

    animateFloatingElements();
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data?.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="center-viewport">
          <h1 className="big-header">Sign In</h1>
          <div className="form-container animate-in">
            <form className="form" onSubmit={handleSubmit} autoComplete="off">
              <ul className="wrapper">
                <li style={{ "--i": 2 } as React.CSSProperties}>
                  <input
                    className="input"
                    type="email"
                    placeholder="E-mail"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </li>
                <li style={{ "--i": 1 } as React.CSSProperties}>
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </li>
                <li style={{ "--i": 0 } as React.CSSProperties}>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Submit"}
                  </button>
                </li>
              </ul>
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
          <div className="signup-button-container">
            <SignUpButton />
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgb(215, 231, 255);
  padding: 20px;

  .form-container {
    width: 400px;
    max-width: 99vw;
    min-height: 360px;
    padding: 64px 56px;
    border-radius: 32px;
    box-shadow: 0 12px 32px rgba(0, 183, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    text-align: center;
    background: linear-gradient(to right, #e81cff, rgb(11, 174, 239));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .input,
  button {
    width: 100%;
    height: 40px;
    position: relative;
    padding: 10px;
    border: 0.1px solid #575cb5;
  }

  .submit-btn {
    width: 100%;
    background: #6d74e3;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 6px;
    cursor: pointer;
    padding: 10px 0;
    transition: background 0.2s;
  }

  .submit-btn:hover {
    background: #575cb5;
  }

  .wrapper {
    position: relative;
    transform: skewY(-14deg) translateX(120px);
    width: 400px;
    margin-bottom: 10px;
  }

  .wrapper li,
  button {
    position: relative;
    list-style: none;
    width: 200px;
    z-index: var(--i);
    transition: 0.3s;
    color: white;
  }

  .wrapper li::before,
  .wrapper .submit-btn::before {
    position: absolute;
    content: "";
    background: #6d74e3;
    top: 0;
    left: -40px;
    width: 40px;
    height: 40px;
    transform-origin: right;
    transform: skewY(45deg);
    transition: 0.3s;
  }

  .wrapper li::after,
  .wrapper .submit-btn::after {
    position: absolute;
    content: "";
    background: #6d74e3;
    width: 200px;
    height: 40px;
    top: -40px;
    left: 0;
    transform-origin: bottom;
    transform: skewX(45deg);
    transition: 0.3s;
  }

  .wrapper li:nth-child(1)::after,
  .wrapper li:nth-child(1)::before {
    background-color: #d8daf7;
  }

  .wrapper li:nth-child(2)::after,
  .wrapper li:nth-child(2)::before {
    background-color: #989deb;
  }

  li .input {
    outline: none;
    border: none;
    color: black;
    background: transparent;
  }

  li .input::placeholder {
    color: black;
  }

  li:nth-child(1) .input {
    background: #d8daf7;
  }

  li:nth-child(2) .input {
    background: #989deb;
  }

  li:nth-child(1) .input:focus {
    outline: none;
    border: 3.5px solid #d8daf7;
  }

  li:nth-child(2) .input:focus {
    outline: none;
    border: 3.5px solid #989deb;
  }

  .wrapper li:hover,
  button:hover {
    transform: translateX(-20px);
  }

  button:hover,
  button:hover::before,
  button:hover::after {
    background: #575cb5;
  }

  button:active {
    transform: translateX(0px);
  }

  .error-message {
    color: #ff4d4d;
    background: rgba(255, 77, 77, 0.1);
    padding: 8px 12px;
    border-radius: 6px;
    margin-bottom: 16px;
    font-size: 14px;
    text-align: center;
  }

  .big-signup-btn {
    margin: 32px auto 0 auto;
    display: block;
    width: 300px;
    max-width: 90vw;
    padding: 18px 0;
    font-size: 1.5rem;
    font-weight: 700;
    border-radius: 12px;
    background: linear-gradient(90deg, #e81cff 0%, #40c9ff 100%);
    color: #fff;
    border: none;
    box-shadow: 0 4px 16px rgba(64, 201, 255, 0.1);
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.1s;
  }
  .big-signup-btn:hover {
    background: linear-gradient(90deg, #40c9ff 0%, #e81cff 100%);
    color: #fff;
    transform: scale(1.03);
  }

  .header-and-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    justify-content: center;
  }
  .big-header {
    font-size: 5rem;
    font-weight: 900;
    text-align: center;
    background: linear-gradient(90deg, #e81cff 0%, #40c9ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    margin-bottom: 48px;
    letter-spacing: 2.5px;
  }

  .form-container.animate-in {
    animation: fadeInUp 3.2s cubic-bezier(0.23, 1, 0.32, 1);
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(60px) scale(0.98);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .center-viewport {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }

  .signup-button-container {
    margin-top: 48px;
    display: flex;
    justify-content: center;
    animation: fadeInUp 3.2s cubic-bezier(0.23, 1, 0.32, 1);
  }
`;

export default SignIn;
