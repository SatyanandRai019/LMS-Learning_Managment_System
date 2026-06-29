import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        if (!fullName || !email || !password) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("password", password);
            if (avatar) formData.append("avatar", avatar);

            await registerUser(formData);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h1 className="form-title">Create account</h1>
                <p className="form-subtitle">Start your learning journey today</p>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                        className="form-input"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Profile Photo (optional)</label>
                    <input
                        className="form-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                </div>

                <button
                    className="btn btn-accent btn-full"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ marginTop: "8px" }}
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>

                <div className="form-divider">
                    <span>Already have an account?</span>
                </div>

                <button
                    className="btn"
                    style={{ width: "100%", justifyContent: "center", border: "1.5px solid var(--border)", color: "var(--primary)", background: "transparent" }}
                    onClick={() => navigate("/login")}
                >
                    Sign In Instead
                </button>
            </div>
        </div>
    );
}

export default Register;
