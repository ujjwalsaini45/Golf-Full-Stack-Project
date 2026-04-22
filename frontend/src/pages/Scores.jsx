import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Scores() {
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const token = localStorage.getItem("token");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchScores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/scores", {
        headers: { Authorization: token },
      });
      setScores(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const addScore = async () => {
    if (!score || !date) return showToast("Please fill in all fields", "error");
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/scores",
        { score, date },
        { headers: { Authorization: token } }
      );
      setScore("");
      setDate("");
      showToast("✅ Score added successfully!");
      fetchScores();
    } catch (err) {
      showToast(err.response?.data?.msg || "Error adding score", "error");
    }
    setLoading(false);
  };

  const best = scores.length ? Math.min(...scores.map((s) => s.score)) : null;
  const avg = scores.length
    ? (scores.reduce((a, b) => a + b.score, 0) / scores.length).toFixed(1)
    : null;

  const getScoreColor = (s) => {
    if (s <= 15) return "#2d9e5f";
    if (s <= 30) return "#c9a84c";
    return "#e05c6e";
  };

  const getScoreLabel = (s) => {
    if (s <= 15) return "Eagle";
    if (s <= 25) return "Birdie";
    if (s <= 35) return "Par";
    return "Bogey";
  };

  return (
    <div style={s.page}>
      {/* TOAST */}
      {toast && (
        <div style={{ ...s.toast, background: toast.type === "error" ? "#e05c6e" : "#2d9e5f" }}>
          {toast.msg}
        </div>
      )}

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navLogo}>
          <span style={{ fontSize: "1.5rem" }}>⛳</span>
          <span style={s.logoText}>Digital <em>Heros</em></span>
        </div>
        <a href="/" style={s.backLink}>← Back to Home</a>
      </nav>

      <div style={s.container}>
        {/* PAGE HEADER */}
        <div style={s.pageHeader}>
          <div>
            <p style={s.headerBadge}>🏌️ Player Dashboard</p>
            <h1 style={s.pageTitle}>Your Score Card</h1>
            <p style={s.pageSub}>Track every round. Chase your best game.</p>
          </div>
        </div>

        {/* STAT MINI CARDS */}
        <div style={s.miniStats}>
          {[
            { label: "Total Rounds", value: scores.length, icon: "🏌️", color: "#2d9e5f" },
            { label: "Best Score", value: best ?? "—", icon: "⭐", color: "#c9a84c" },
            { label: "Average", value: avg ?? "—", icon: "📊", color: "#7c6af7" },
            { label: "This Month", value: scores.filter(s => new Date(s.date).getMonth() === new Date().getMonth()).length, icon: "📅", color: "#e05c6e" },
          ].map((c, i) => (
            <div key={i} style={s.miniCard}>
              <div style={{ ...s.miniIcon, background: c.color + "22", color: c.color }}>{c.icon}</div>
              <div style={{ ...s.miniVal, color: c.color }}>{c.value}</div>
              <div style={s.miniLabel}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={s.grid}>
          {/* ADD SCORE CARD */}
          <div style={s.formCard}>
            <div style={s.formCardHeader}>
              <h2 style={s.cardTitle}>🎯 Add New Score</h2>
              <span style={s.cardSub}>Record your round</span>
            </div>

            <div style={s.formGroup}>
              <label style={s.label}>Score (1–45)</label>
              <div style={s.inputWrapper}>
                <span style={s.inputIcon}>⛳</span>
                <input
                  type="number"
                  placeholder="Enter your score"
                  value={score}
                  min={1} max={45}
                  onChange={(e) => setScore(e.target.value)}
                  style={s.input}
                />
              </div>
              {/* Score preview bar */}
              {score && (
                <div style={s.scorePreview}>
                  <div style={s.previewBar}>
                    <div style={{
                      ...s.previewFill,
                      width: `${Math.min((score / 45) * 100, 100)}%`,
                      background: getScoreColor(Number(score)),
                    }} />
                  </div>
                  <span style={{ ...s.previewLabel, color: getScoreColor(Number(score)) }}>
                    {getScoreLabel(Number(score))}
                  </span>
                </div>
              )}
            </div>

            <div style={s.formGroup}>
              <label style={s.label}>Date</label>
              <div style={s.inputWrapper}>
                <span style={s.inputIcon}>📅</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={s.input}
                />
              </div>
            </div>

            <button
              onClick={addScore}
              disabled={loading}
              style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Adding..." : "Add Score →"}
            </button>
          </div>

          {/* SCORES LIST */}
          <div style={s.listCard}>
            <div style={s.formCardHeader}>
              <h2 style={s.cardTitle}>📊 Score History</h2>
              <span style={s.countBadge}>{scores.length} rounds</span>
            </div>

            <div style={s.scoreList}>
              {scores.length === 0 && (
                <div style={s.emptyState}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⛳</div>
                  <p style={{ color: "#7a8f7a", fontSize: "0.95rem" }}>No scores yet. Add your first round!</p>
                </div>
              )}

              {[...scores].reverse().map((sc, i) => (
                <div key={sc._id} style={s.scoreRow}>
                  <div style={s.scoreLeft}>
                    <div style={{ ...s.rankBadge, background: getScoreColor(sc.score) + "22", color: getScoreColor(sc.score) }}>
                      #{scores.length - i}
                    </div>
                    <div>
                      <div style={s.scoreDate}>
                        {new Date(sc.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                      <div style={{ ...s.scoreChip, color: getScoreColor(sc.score) }}>
                        {getScoreLabel(sc.score)}
                      </div>
                    </div>
                  </div>
                  <div style={s.scoreRight}>
                    <span style={{ ...s.scoreBig, color: getScoreColor(sc.score) }}>{sc.score}</span>
                    <span style={s.scoreUnit}>pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESS BAR CHART */}
        {scores.length > 0 && (
          <div style={s.chartCard}>
            <h2 style={s.cardTitle}>📈 Score Trend</h2>
            <p style={s.cardSub}>Last {Math.min(scores.length, 8)} rounds</p>
            <div style={s.bars}>
              {[...scores].slice(-8).map((sc, i) => (
                <div key={i} style={s.barCol}>
                  <div style={s.barWrap}>
                    <div style={{
                      ...s.bar,
                      height: `${(sc.score / 45) * 100}%`,
                      background: `linear-gradient(to top, ${getScoreColor(sc.score)}, ${getScoreColor(sc.score)}88)`,
                    }} />
                  </div>
                  <div style={s.barVal}>{sc.score}</div>
                  <div style={s.barDate}>
                    {new Date(sc.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
        @keyframes toastIn { from{opacity:0;transform:translateX(100px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    background: "#0a0f0a", minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif", color: "#f0f4f0",
  },
  toast: {
    position: "fixed", top: 20, right: 20, zIndex: 999,
    padding: "0.8rem 1.5rem", borderRadius: "10px",
    color: "#fff", fontWeight: 600, fontSize: "0.9rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    animation: "toastIn 0.3s ease",
  },

  // NAV
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1.2rem 3rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(10,15,10,0.95)",
    backdropFilter: "blur(12px)",
    position: "sticky", top: 0, zIndex: 100,
  },
  navLogo: { display: "flex", alignItems: "center", gap: "0.6rem" },
  logoText: { fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#f0f4f0" },
  backLink: { color: "#7a8f7a", textDecoration: "none", fontSize: "0.88rem", fontWeight: 500 },

  container: { maxWidth: 1100, margin: "0 auto", padding: "2.5rem 2rem" },

  // HEADER
  pageHeader: { marginBottom: "2rem", animation: "fadeUp 0.5s ease" },
  headerBadge: {
    display: "inline-block",
    background: "rgba(201,168,76,0.15)", color: "#c9a84c",
    border: "1px solid rgba(201,168,76,0.3)",
    padding: "0.3rem 1rem", borderRadius: "999px",
    fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em",
    marginBottom: "0.8rem",
  },
  pageTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0f4f0",
  },
  pageSub: { color: "#7a8f7a", fontSize: "0.95rem", marginTop: "0.4rem" },

  // MINI STATS
  miniStats: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem", marginBottom: "2rem",
  },
  miniCard: {
    background: "#0d130d", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "14px", padding: "1.2rem", textAlign: "center",
  },
  miniIcon: { width: 40, height: 40, borderRadius: "10px", display: "grid", placeItems: "center", fontSize: "1.2rem", margin: "0 auto 0.7rem" },
  miniVal: { fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, lineHeight: 1 },
  miniLabel: { color: "#7a8f7a", fontSize: "0.75rem", marginTop: "0.4rem", fontWeight: 500 },

  // GRID
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" },

  // FORM CARD
  formCard: {
    background: "#0d130d", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "18px", padding: "1.8rem",
  },
  formCardHeader: { marginBottom: "1.5rem" },
  cardTitle: { fontSize: "1rem", fontWeight: 700, color: "#f0f4f0", marginBottom: "0.2rem" },
  cardSub: { color: "#556655", fontSize: "0.78rem" },
  formGroup: { marginBottom: "1.2rem" },
  label: { display: "block", color: "#7a8f7a", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.5rem" },
  inputWrapper: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: { position: "absolute", left: "0.9rem", fontSize: "1rem", pointerEvents: "none" },
  input: {
    width: "100%", padding: "0.75rem 0.9rem 0.75rem 2.5rem",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px", color: "#f0f4f0", fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif", outline: "none",
  },
  scorePreview: { display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "0.6rem" },
  previewBar: { flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" },
  previewFill: { height: "100%", borderRadius: 999, transition: "width 0.3s ease" },
  previewLabel: { fontSize: "0.75rem", fontWeight: 700, minWidth: 50 },
  submitBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
    color: "#0a0f0a", border: "none",
    padding: "0.9rem", borderRadius: "10px",
    fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
    marginTop: "0.5rem",
  },

  // LIST CARD
  listCard: {
    background: "#0d130d", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "18px", padding: "1.8rem",
    display: "flex", flexDirection: "column",
  },
  countBadge: {
    background: "rgba(255,255,255,0.05)", color: "#7a8f7a",
    padding: "0.2rem 0.7rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600,
  },
  scoreList: { flex: 1, overflowY: "auto", maxHeight: 340, marginTop: "0.5rem" },
  emptyState: { textAlign: "center", padding: "3rem 1rem" },
  scoreRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0.85rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  scoreLeft: { display: "flex", alignItems: "center", gap: "0.8rem" },
  rankBadge: {
    width: 36, height: 36, borderRadius: "10px",
    display: "grid", placeItems: "center",
    fontSize: "0.72rem", fontWeight: 700, flexShrink: 0,
  },
  scoreDate: { fontSize: "0.85rem", color: "#c0d0c0", fontWeight: 500 },
  scoreChip: { fontSize: "0.72rem", fontWeight: 700, marginTop: "0.15rem" },
  scoreRight: { display: "flex", alignItems: "baseline", gap: "0.2rem" },
  scoreBig: { fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, lineHeight: 1 },
  scoreUnit: { color: "#556655", fontSize: "0.75rem" },

  // CHART
  chartCard: {
    background: "#0d130d", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "18px", padding: "1.8rem",
  },
  bars: { display: "flex", alignItems: "flex-end", gap: "0.8rem", height: 160, marginTop: "1.5rem" },
  barCol: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", height: "100%" },
  barWrap: { flex: 1, width: "100%", display: "flex", alignItems: "flex-end", background: "rgba(255,255,255,0.03)", borderRadius: "6px", overflow: "hidden" },
  bar: { width: "100%", borderRadius: "6px 6px 0 0", transition: "height 0.5s ease" },
  barVal: { color: "#c0d0c0", fontSize: "0.75rem", fontWeight: 700 },
  barDate: { color: "#556655", fontSize: "0.65rem", textAlign: "center" },
};
