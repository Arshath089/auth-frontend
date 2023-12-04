import React, { useState } from 'react'
import {Container, Form, Button, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import '../styles/SignUp.css';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import API_URL from '../../config/global';

const SignUp = () => {

 const [formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
 })

 const handleChange = (e) => {
    const{name, value} = e.target;
    setFormData({...formData,
        [name] : value,
    })

 }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/signin/verify`, formData);
            if(response.data === true) {
                alert("Registration link is successfully sent");
            } else if(response.data === false){
                alert("user already exists");
            }
        } catch (error) {
            console.log("Error during registration ",error);
        }


    }

  return (
    <Container>
        <h1>Registration Form</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormControl type="text" name="name" value={formData.name} onChange={handleChange} required />

            </FormGroup>

            <FormGroup>
                <FormLabel>Emaik</FormLabel>
                <FormControl type="email" name="email" value={formData.email} onChange={handleChange} required />

            </FormGroup>

            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" name="password" value={formData.password} onChange={handleChange} required />

            </FormGroup>

            <Button variant='primary' type='submit'>Register</Button>
            <p>Already have an account? <Link to="/login">Login</Link></p>

        </Form>
    </Container>
  )
}

export default SignUp