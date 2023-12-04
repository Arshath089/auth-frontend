import React, { useState } from 'react'
import {Container, Form, Button, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import '../styles/Login.css';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import API_URL from '../../config/global';


const Login = () => {

    const [formData, setFormData ] = useState({
        name: "",
        email: "",
        password: "",
     })
     const navigate = useNavigate();
     const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData({...formData,
            [name] : value,
        })
    
     }
        const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await axios.post(`${API_URL}/login`, formData);
            console.log(response);
            if(response.data === "Invalid User name or password") {
                alert("Invalid User name or password");
            } else if(response.data === "Server Busy") {
                alert("Verify your email id");
            } else if(response?.status){
                localStorage.setItem("userInfo",JSON.stringify(response.data));
                navigate("/home");
            }
            
        }

  return (
    <Container>
        <h1>Login Form</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl type="email" name="email" value={formData.email} onChange={handleChange} required />

            </FormGroup>

            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" name="password" value={formData.password} onChange={handleChange} required />

            </FormGroup>

            <Button variant='primary' type='submit'>Login</Button>
        </Form>
    </Container>
  )
}

export default Login