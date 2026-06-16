import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const data = await loginUser({ email, password });
            console.log(data);
            navigate("/");
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <div className="page">
            <div className="card">
                <h1>Login</h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn-primary" onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;