import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            {/* HERO */}
            <div className="hero">
                <div className="hero-badge">🎓 Professional Learning Platform</div>
                <h1 className="hero-title">
                    Learn. Grow.<br />
                    <span>Succeed.</span>
                </h1>
                <p className="hero-subtitle">
                    Access premium courses taught by industry experts.
                    Build real skills that employers are looking for.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-accent" onClick={() => navigate("/courses")}>
                        Browse Courses
                    </button>
                    <button className="btn btn-outline" onClick={() => navigate("/register")}>
                        Join for Free
                    </button>
                </div>

                <div className="hero-stats">
                    <div>
                        <div className="hero-stat-number">50+</div>
                        <div className="hero-stat-label">Courses Available</div>
                    </div>
                    <div>
                        <div className="hero-stat-number">10K+</div>
                        <div className="hero-stat-label">Students Enrolled</div>
                    </div>
                    <div>
                        <div className="hero-stat-number">95%</div>
                        <div className="hero-stat-label">Satisfaction Rate</div>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="section" style={{ background: "#fff" }}>
                <div className="page" style={{ margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <h2 className="section-title" style={{ textAlign: "center" }}>Why Choose LearnHub?</h2>
                        <p className="section-subtitle" style={{ textAlign: "center" }}>Everything you need to advance your career</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                        {[
                            { icon: "🎯", title: "Expert Instructors", desc: "Learn from industry professionals with years of real-world experience." },
                            { icon: "📱", title: "Learn Anywhere", desc: "Access your courses from any device, at any time, at your own pace." },
                            { icon: "🏆", title: "Earn Certificates", desc: "Get recognized certificates upon completing each course." },
                            { icon: "💬", title: "Community Support", desc: "Join a community of learners and get help when you need it." },
                        ].map((f) => (
                            <div className="card" key={f.title} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
                                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--primary)", marginBottom: "8px" }}>{f.title}</h3>
                                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="footer">
                © 2026 <span>LearnHub</span> — Built for learners, by learners.
            </footer>
        </div>
    );
}

export default Home;
