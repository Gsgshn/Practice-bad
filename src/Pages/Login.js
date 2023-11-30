import './Login.css'
import { useState } from "react";
import Report from '../components/Report';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card } from 'react-bootstrap';

function Login(props) {
    const initialValues = { username: "", password: "" };
    const [formValues, setFormValues] = useState({
      username: localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("username") || "" : "",
      password: localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("password") || "" : "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleRememberMe = () => {
      setRememberMe(!rememberMe); 
      if (!rememberMe) {
        localStorage.setItem("username", formValues.username);
        localStorage.setItem("password", formValues.password);
        localStorage.setItem("rememberMe", true);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      if (Object.keys(formErrors).length === 0) {
        props.onShowPage();
      }
    };
  
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username) {
        errors.username = "Username is required!";
      }
      if (!values.password) {
        errors.password = "Password is required!";
      } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
      }
      return errors;
    };
  
    return (
      <div style={{width:'100%'}}  className="container">
        <Card style={{background: 'linear-gradient(#406FA3, #77A2D1)'}}>
          <Card.Title style={{textAlign:'center'}}><h1 style={{color:'white'}}>Авторизация</h1></Card.Title>
        
        <form onSubmit={handleSubmit}>
          
          <div className="ui divider"></div>
          <div  className="ui form">
            <div className="field">
            <InputGroup style={{maxWidth:'400px'}} className="mb-3 w-75 mx-auto">
            <InputGroup.Text>Логин</InputGroup.Text>
              <Form.Control
               type="text"
               name="username"
               value={formValues.username}
               onChange={handleChange}
              />
             </InputGroup>
             <InputGroup  style={{maxWidth:'400px'}}  className=" w-75 mx-auto">
             <InputGroup.Text>Пароль</InputGroup.Text>
              <Form.Control
               type="password"
               name="password"
               value={formValues.password}
               onChange={handleChange}
              />
             </InputGroup>
             
             
            </div>
            <p>{formErrors.password}</p>
          </div>
          <div className="field">
          <InputGroup style={{maxWidth:'400px'}}  className=" w-75 mx-auto ">
            <InputGroup.Text>Запомнить пароль</InputGroup.Text> 
            <InputGroup.Checkbox             
            aria-label="" 
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMe}
            />
           </InputGroup>

        
        </div>
        
        </form>
        <Report  login={formValues.username} password={formValues.password} onSuccessfulLogin={props.onShowPage}></Report>
        </Card>
      </div>
    );
}
export default Login; 