import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const SignUp: React.FC = () => {

    useEffect(() => {
        const animateFloatingElements = () => {
          const elements = document.querySelectorAll('.floating');
          
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
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <div>
        <svg 
                className="pointer-events-none fixed w-[135vw] h-[135vw] md:w-[98vw] md:h-[98vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] opacity-55 select-none dark:opacity-20"
                viewBox="0 0 1200 900" 
                fill="none"
            >
                <circle className="animate-pulse" cx="970" cy="350" r="69" fill="#a5f3fc" fillOpacity="0.11" />
                <circle cx="160" cy="180" r="70" fill="#67e8f9" fillOpacity="0.16" />
                <circle className="animate-pulse" cx="960" cy="789" r="35" fill="#22d3ee" fillOpacity="0.14" />
                <circle cx="980" cy="170" r="33" fill="#0ea5e9" fillOpacity="0.26" />
                <circle cx="120" cy="730" r="24" fill="#0284c7" fillOpacity="0.19" />
                <circle className="animate-pulse" cx="720" cy="100" r="41" fill="#0891b2" fillOpacity="0.18" />
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
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Sign Up
          </button>
        </form>
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
  background: #212121;
  padding: 20px;

  .form-container {
    width: 400px;
    max-width: 90vw;
    background: #1a1a1a;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    text-align: center;
    background: linear-gradient(to right, #e81cff, #40c9ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .form-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }

  .form-group input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #414141;
  }

  .form-group input::placeholder {
    opacity: 0.5;
  }

  .form-group input:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    color: #717171;
    font-weight: 600;
    width: 100%;
    background: #313131;
    border: 1px solid #414141;
    padding: 12px 16px;
    font-size: inherit;
    margin-top: 24px;
    cursor: pointer;
    border-radius: 6px;
  }

  .form-submit-btn:hover {
    background-color: #fff;
    border-color: #fff;
    color: #212121;
  }

  .form-submit-btn:active {
    scale: 0.95;
  }
`;

export default SignUp;