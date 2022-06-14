import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from './Charactors';
export default function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(26);
  const [addUppercase, setAddUppercase] = useState(false);
  const [addLowercase, setAddLowercase] = useState(false);
  const [addNumbers, setAddNumbers] = useState(false);
  const [addSymboles, setAddSymboles] = useState(false);
  const handelGenaratePassword = () => {
    if (!addUppercase && !addLowercase && !addNumbers && !addSymboles) {
      notify('To generate password you must select atleast one checkbox', true);
    } else {
      let characterList = '';
      if (addNumbers) {
        characterList = characterList + numbers;
      }
      if (addUppercase) {
        characterList = characterList + upperCaseLetters;
      }
      if (addLowercase) {
        characterList = characterList + lowerCaseLetters;
      }
      if (addSymboles) {
        characterList = characterList + specialCharacters;
      }
      setPassword(createPassword(characterList));
      notify('Password is generated successfully', false);
    }
  };
  const createPassword = (characterList) => {
    let password = '';
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const copyToClipbord = (password) => {
    navigator.clipboard.writeText(password);
  };
  const handelCopyPassword = () => {
    if (password == '') {
      console.log('plase genarate password');
    } else {
      copyToClipbord(password);
      notify('COPY_SUCCESS', false);
    }
  };
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      <p>
        <span>{password}</span>
      </p>
      <button onClick={handelCopyPassword}>copy</button>
      <input
        defaultValue={passwordLength}
        onChange={(e) => setPasswordLength(e.target.value)}
        type="number"
      />
      <label>Add Uppercase</label>
      <input
        checked={addUppercase}
        onChange={(e) => setAddUppercase(e.target.checked)}
        type="checkbox"
      />
      <label>Add Lowercase</label>
      <input
        checked={addLowercase}
        onChange={(e) => setAddLowercase(e.target.checked)}
        type="checkbox"
      />
      <label>Add Numbers</label>
      <input
        checked={addNumbers}
        onChange={(e) => setAddNumbers(e.target.checked)}
        type="checkbox"
      />
      <label>Add Symboles</label>
      <input
        checked={addSymboles}
        onChange={(e) => setAddSymboles(e.target.checked)}
        type="checkbox"
      />
      <button onClick={handelGenaratePassword}>genarate password</button>
      <ToastContainer
        position="bottom-center"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
