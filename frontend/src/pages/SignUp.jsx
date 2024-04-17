import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignUp(){

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    async function signUpHandler(){
        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
            firstName : firstname,
            lastName : lastname,
            username : email,
            password
        })
        localStorage.setItem("token",response.data.token);
        navigate("/dashboard");
    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 ">
                    <Heading label = "Sign Up"/>
                    <SubHeading content = "Enter your information to create an account" />
                    <InputBox label="Firstname" placeholder="Jhon" onChange = {(e) => setFirstname(e.target.value)} />
                    <InputBox label="Lastname" placeholder="Doe" onChange={(e)=> setLastname(e.target.value)} />
                    <InputBox label="Email" placeholder="email@email.com" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                    <InputBox label="password" placeholder="123456" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <div className="pt-4"><Button onClick={signUpHandler} text="Sign Up" /></div>
                    <BottomWarning label="Already have an account?" buttonText="Sign In" to="/signin"/>
                </div>
            </div>
        </div>)

}

