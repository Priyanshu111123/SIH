import React, { useState } from 'react';
import { signupFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios";

export default function Signup() {

  const [signupState, setSignupState] = useState(() => {
    const initialState = {};
    signupFields.forEach(field => {
      initialState[field.id] = '';
    });
    return initialState;
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const sendOTP = (e) => {
    const email = document.getElementById("emailId").value;
    const username = document.getElementById("username").value;
    e.preventDefault();
    const data = {
      emailId: email,
      username: username
    }
    axios
      .post("/api/sendOTP", data, {
        headers: {
          "Content-Type": "application/json", 
        },
      })
      .then((response) => {
        console.log("Form successfully submitted:", response.data.message);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignupState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    try {
      await createAccount();
    } catch (error) {
      console.log(error);
      setMessage('Signup failed. Please try again.');
      setMessageType('error');
    }
  };

  const createAccount = async () => {
    try {
      const response = await axios.post("/api/signup_user", signupState, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        setMessage(response.message);
        setMessageType('success');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setMessage('Signup failed. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          {signupFields.map(field => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <button onClick={sendOTP}> Send OTP</button>
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
      {message && (
        <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
