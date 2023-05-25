import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValue, setFormValue] = useState(initialValues);
  const [formErrors, setFormErrors]= useState({});
  const [isSubmit, setIsSubmit]= useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    // sqr bracte for that it take username or name as a key and assign a value to that key
    console.log(formValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true)
  };
  useEffect(()=>{
    console.log(formErrors)
    if(Object.keys(formErrors).length=== 0 && isSubmit){
      console.log(formValue)
    }
  })

  const validate= (values)=>{
    const errors = {};
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    if(!values.username){
      errors.username="Username is required"
    }
    if(!values.email){
      errors.email="Email is required"
    } else if(!regex.test(values.email)){
      errors.email="This is not valid email!"
    }
    if(!values.password){
      errors.password="Password is required"
    } else if(values.password<4){
      errors.password= "Password must be more than 4 char!"
    }else if(values.password>10){
      errors.password="Password cannot exceed more than 10 char!"
    }

    return errors;
  }
  return (
    <div className="App">
      {/* <pre>{JSON.stringify(formValue, undefined, 2)}</pre> */}

      <form onSubmit={handleSubmit}>
        <h1>LogIn Form</h1>
        <div className='container'>
          <div className='field'>
            <label>Username</label>
            <input type='text' name='username' placeholder='Username'
              value={formValue.username}
              onChange={handleChange} />
          </div>
          <p>{formErrors.username}</p>
          <div className='field'>
            <label>Email</label>
            <input type='email' name='email' placeholder='Email'
              value={formValue.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className='field'>
            <label>Password</label>
            <input type='password' name='password' placeholder='Password'
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>     
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
