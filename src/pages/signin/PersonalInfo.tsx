import React from 'react';
import { ArrowLeft } from "lucide-react";
import styled from 'styled-components';

interface PersonalInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2 className="form-title">Personal Information</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName"
            name="firstName" 
            required 
            value={formData.firstName} 
            onChange={handleChange} 
            placeholder="John"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName"
            name="lastName" 
            required 
            value={formData.lastName} 
            onChange={handleChange} 
            placeholder="Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input 
            type="date" 
            id="dateOfBirth"
            name="dateOfBirth" 
            required 
            value={formData.dateOfBirth} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select 
            id="gender"
            name="gender" 
            required 
            value={formData.gender} 
            onChange={handleChange} 
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="form-navigation">
        <button
          type="button"
          onClick={prevStep}
        >
          <ArrowLeft size={16} />
          Previous Step
        </button>
        <button 
          type="submit"
          className="form-submit-btn"
        >
          Next Step
        </button>
      </div>
    </StyledForm>
  );
};

const StyledForm = styled.form`
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

  .form-group input,
  .form-group select {
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

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .form-navigation button {
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

  .form-navigation button:hover {
    color: #e81cff;
  }

  .form-submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    color: #717171;
    font-weight: 600;
    width: 40%;
    background: #313131;
    border: 1px solid #414141;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin-top: 8px;
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

export default PersonalInfo; 