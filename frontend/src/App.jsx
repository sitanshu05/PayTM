import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SingIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>} /> 
          <Route path = "signin" element={<SingIn/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/send" element={<SendMoney/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
