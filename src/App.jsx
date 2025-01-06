import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Airdrop } from "./components/Airdrop";
import { Layout } from "./components/Layout";
import { SendToken } from "./components/SendToken";
import { LaunchToken } from "./components/LaunchToken";
import { Swapping } from "./components/Swapping";

function App() {
return(  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/airdrop" element={<Airdrop/>}/>
        <Route path="/send-token" element={<SendToken/>}/>
        <Route path="/launch-token" element={<LaunchToken/>}/>
        <Route path="/swapping" element={<Swapping/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>)
}


export default App;
