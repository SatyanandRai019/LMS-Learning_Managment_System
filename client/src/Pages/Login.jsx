import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {

        try {

            const data = await loginUser({
                email,
                password
            });

            console.log(data);

            navigate("/");

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    return (
        <div>

            <h1>Login</h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br />
            <br />

            <button onClick={handleSubmit}>
                Login
            </button>

        </div>
    );
}

export default Login;