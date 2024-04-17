import { useEffect,useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export default function Dashboard(){
    const [balance, setBalance] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/accounts/balance",{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setBalance(response.data.balance)
        })
    },[])
    return (
        <div className="mx-4 pt-4">
            <AppBar />
            <Balance balance={balance} />
            <Users />
        </div>
    )
}