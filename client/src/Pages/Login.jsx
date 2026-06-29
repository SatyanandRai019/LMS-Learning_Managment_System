import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            await loginUser({ email, password });
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h1 className="form-title">Welcome back</h1>
                <p className="form-subtitle">Sign in to continue learning</p>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                        className="form-input"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <button
                    className="btn btn-primary btn-full"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ marginTop: "8px" }}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <div className="form-divider">
                    <span>Don't have an account?</span>
                </div>

                <button
                    className="btn btn-outline"
                    style={{ width: "100%", justifyContent: "center", border: "1.5px solid var(--border)", color: "var(--primary)", background: "transparent" }}
                    onClick={() => navigate("/register")}
                >
                    Create an Account
                </button>
            </div>
        </div>
    );
}

export default Login;
