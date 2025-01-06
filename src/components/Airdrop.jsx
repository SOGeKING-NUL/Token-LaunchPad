import { useNavigate } from "react-router-dom";

export function Airdrop(){
    const navigate = useNavigate();

    return (
      <div>
        <br />
        Help needed
        <br />
        <button onClick={() => navigate("/")}>GO BACK SIMON</button>
      </div>
    );
}