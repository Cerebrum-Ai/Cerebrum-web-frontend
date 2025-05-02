import React from 'react';
import { ArrowLeft } from "lucide-react";
import styled from 'styled-components';

interface ReviewSubmitProps {
  formData: {
    // Account Info
    email: string;
    password: string;
    
    // Personal Info
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    
    // Medical Info
    height: string;
    weight: string;
    bloodType: string;
    allergies: string;
    medications: string;
    conditions: string;
    familyHistory: string;
    
    // Lifestyle Info
    smokingStatus: string;
    alcoholConsumption: string;
    physicalActivity: string;
    sleepHours: string;
    diet: string;
    occupation: string;
    stressLevel: string;
    hobbies: string;
  };
  prevStep: () => void;
  handleSubmit: () => void;
}

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ formData, prevStep, handleSubmit }) => {
  return (
    <StyledForm>
      <h2 className="form-title">Review Your Information</h2>
      
      <div className="review-sections">
        <div className="review-section">
          <h3 className="section-title">Account Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Email</label>
              <div className="review-value">{formData.email}</div>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <div className="review-value">{formData.firstName}</div>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <div className="review-value">{formData.lastName}</div>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <div className="review-value">{formData.dateOfBirth}</div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="review-value">{formData.gender}</div>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h3 className="section-title">Medical Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Height</label>
              <div className="review-value">{formData.height} cm</div>
            </div>
            <div className="form-group">
              <label>Weight</label>
              <div className="review-value">{formData.weight} kg</div>
            </div>
            <div className="form-group">
              <label>Blood Type</label>
              <div className="review-value">{formData.bloodType}</div>
            </div>
            <div className="form-group full-width">
              <label>Allergies</label>
              <div className="review-value">{formData.allergies || 'None'}</div>
            </div>
            <div className="form-group full-width">
              <label>Medications</label>
              <div className="review-value">{formData.medications || 'None'}</div>
            </div>
            <div className="form-group full-width">
              <label>Medical Conditions</label>
              <div className="review-value">{formData.conditions || 'None'}</div>
            </div>
            <div className="form-group full-width">
              <label>Family History</label>
              <div className="review-value">{formData.familyHistory || 'None'}</div>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h3 className="section-title">Lifestyle Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Smoking Status</label>
              <div className="review-value">{formData.smokingStatus}</div>
            </div>
            <div className="form-group">
              <label>Alcohol Consumption</label>
              <div className="review-value">{formData.alcoholConsumption}</div>
            </div>
            <div className="form-group">
              <label>Physical Activity</label>
              <div className="review-value">{formData.physicalActivity}</div>
            </div>
            <div className="form-group">
              <label>Sleep Hours</label>
              <div className="review-value">{formData.sleepHours} hours</div>
            </div>
            <div className="form-group">
              <label>Diet Type</label>
              <div className="review-value">{formData.diet}</div>
            </div>
            <div className="form-group">
              <label>Occupation</label>
              <div className="review-value">{formData.occupation}</div>
            </div>
            <div className="form-group">
              <label>Stress Level</label>
              <div className="review-value">{formData.stressLevel}</div>
            </div>
            <div className="form-group full-width">
              <label>Hobbies/Interests</label>
              <div className="review-value">{formData.hobbies || 'None'}</div>
            </div>
          </div>
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
          type="button"
          className="form-submit-btn"
          onClick={handleSubmit}
        >
          Submit
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

  .review-sections {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .review-section {
    background: #313131;
    border-radius: 12px;
    padding: 20px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #fff;
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

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }

  .review-value {
    color: #fff;
    font-size: 14px;
    padding: 10px 14px;
    background: #414141;
    border-radius: 8px;
    min-height: 20px;
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

export default ReviewSubmit; 