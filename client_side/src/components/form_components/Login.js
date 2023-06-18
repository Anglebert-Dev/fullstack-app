import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => (fieldsState[field.id] = ''));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  // Handle Login API Integration here
  const authenticateUser = () => {
    axios
      .post('http://localhost:2000/api/users/login', loginState)
      .then((response) => {
        const { token } = response.data;
        // Store the token securely in the client-side storage (e.g., cookies, local storage)
        // Set the authentication state to indicate that the user is logged in
        // Secure API requests by including the token in the request headers

        // Example storage using local storage:
        localStorage.setItem('userToken', token);

        // Set authentication state
        // Example using a boolean flag:
        // setAuthState(true);
        // Redirect to the dashboard or desired page
        navigate('/dashboard');
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px ">
        {fields.map((field) => (
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
         {errorMessage && <p className="text-red-500 mt-[10px]">{errorMessage}</p>}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
