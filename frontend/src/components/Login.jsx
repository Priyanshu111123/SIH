import { useState } from 'react';
import { loginFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from 'axios';

const fields = loginFields;

let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    try {
      await authenticateUser();
    } catch (error) {
      setMessage('Login failed. Please check your credentials and try again.');
      setMessageType('error');
    }
  };

  const authenticateUser = async () => {
    try {
      const response = await axios.post('/login', loginState, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('Login successful! Welcome back.');
        setMessageType('success');
        // Handle successful login (e.g., redirect to another page)
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage('Login failed. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map(field => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        
        <FormExtra />
        <FormAction handleSubmit={handleSubmit} text="Login" />
      </form>
      {message && (
        <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
