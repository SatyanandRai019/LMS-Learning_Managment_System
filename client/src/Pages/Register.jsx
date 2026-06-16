import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("password", password);
            if (avatar) formData.append("avatar", avatar);

            const data = await registerUser(formData);
            console.log(data);
            navigate("/");
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <div className="page">
            <div className="card">
                <h1>Sign Up</h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                />

                <button className="btn-primary" onClick={handleSubmit}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Register;