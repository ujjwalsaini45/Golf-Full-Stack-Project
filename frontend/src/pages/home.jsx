import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "$248K", label: "Raised This Year" },
  { value: "312", label: "Players Joined" },
  { value: "18", label: "Holes of Glory" },
  { value: "6", label: "Charity Partners" },
];

const sponsors = ["Eagle Foundation", "GreenWay Corp", "Par Excellence", "Birdie Trust"];

export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.page}>
      {/* ── NAV ── */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <span style={styles.logoIcon}>⛳</span>
          <span style={styles.logoText}>Digital <em>Heros</em></span>
        </div>
        <div style={styles.navLinks}>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#stats" style={styles.navLink}>Impact</a>
          <button onClick={() => navigate("/scores")} style={styles.navBtn}>Leaderboard</button>
          <button onClick={() => navigate("/admin")} style={styles.navBtnOutline}>Admin</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={styles.hero} ref={heroRef}>
        {/* Decorative circles */}
        <div style={styles.circle1} />
        <div style={styles.circle2} />
        <div style={styles.circle3} />

        <div style={{ ...styles.heroContent, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s ease" }}>
          <p style={styles.heroBadge}>🏆 Annual Charity Golf Tournament</p>
          <h1 style={styles.heroTitle}>
            Where Every <br />
            <span style={styles.heroAccent}>Swing</span> Saves <br />
            a Life.
          </h1>
          <p style={styles.heroSub}>
            Join the most prestigious charity golf event of the year. Play with purpose, compete with heart, and make a lasting difference.
          </p>
          <div style={styles.heroBtns}>
            <button onClick={() => navigate("/scores")} style={styles.btnGold}>
              View Leaderboard →
            </button>
            <button style={styles.btnGhost}>Learn More</button>
          </div>
        </div>

        {/* Golf card */}
        <div style={{ ...styles.heroCard, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(60px)", transition: "all 1.1s ease 0.3s" }}>
          <div style={styles.cardTop}>
            <span style={styles.cardBadge}>LIVE</span>
            <span style={styles.cardSeason}>Season 2026</span>
          </div>
          <div style={styles.cardCourse}>
            <div style={styles.courseIcon}>⛳</div>
            <div>
              <div style={styles.courseName}>Augusta Highlands</div>
              <div style={styles.courseDetail}>18 Holes · Par 72</div>
            </div>
          </div>
          <div style={styles.cardDivider} />
          <div style={styles.cardLeaders}>
            <p style={styles.cardLeadersTitle}>Top Leaders</p>
            {[
              { name: "James K.", score: "-8", pos: "🥇" },
              { name: "Sarah M.", score: "-6", pos: "🥈" },
              { name: "Raj P.",   score: "-5", pos: "🥉" },
            ].map((p, i) => (
              <div key={i} style={styles.leaderRow}>
                <span>{p.pos} {p.name}</span>
                <span style={styles.leaderScore}>{p.score}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/scores")} style={styles.cardBtn}>
            Full Leaderboard
          </button>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" style={styles.statsSection}>
        <p style={styles.sectionLabel}>OUR IMPACT</p>
        <h2 style={styles.sectionTitle}>Numbers That Matter</h2>
        <div style={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutLeft}>
          <p style={styles.sectionLabel}>ABOUT THE EVENT</p>
          <h2 style={styles.sectionTitle}>Golf With a Greater Purpose</h2>
          <p style={styles.aboutText}>
            The Digital Heros Golf Charity Tournament brings together passionate golfers and generous sponsors to raise funds for life-changing causes. Every birdie counts. Every donation matters.
          </p>
          <ul style={styles.aboutList}>
            {["World-class golf courses", "Live scoring & leaderboards", "Charity raffle & prize draw", "Corporate sponsorship packages"].map((item, i) => (
              <li key={i} style={styles.aboutItem}>
                <span style={styles.checkIcon}>✓</span> {item}
              </li>
            ))}
          </ul>
          <button onClick={() => navigate("/scores")} style={styles.btnGold}>
            See Scores →
          </button>
        </div>
        <div style={styles.aboutRight}>
          <div style={styles.courseCard}>
            <div style={styles.courseCardEmoji}>⛳</div>
            <div style={styles.courseCardLines}>
              {[90, 70, 80, 60, 75].map((w, i) => (
                <div key={i} style={{ ...styles.courseLine, width: `${w}%`, animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <div style={styles.courseCardFooter}>
              <span>Next Round</span>
              <span style={{ color: "#c9a84c", fontWeight: 700 }}>May 15, 2026</span>
            </div>
          </div>
          <div style={styles.floatingBadge}>🏅 Charity Certified</div>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section style={styles.sponsorSection}>
        <p style={styles.sponsorLabel}>PROUD SPONSORS</p>
        <div style={styles.sponsorRow}>
          {sponsors.map((s, i) => (
            <div key={i} style={styles.sponsorPill}>{s}</div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaTitle}>Ready to Play for a Cause?</h2>
          <p style={styles.ctaSub}>Join hundreds of players making a difference one stroke at a time.</p>
          <div style={styles.heroBtns}>
            <button onClick={() => navigate("/scores")} style={styles.btnGold}>View Leaderboard</button>
            <button onClick={() => navigate("/admin")} style={styles.btnGhost}>Admin Panel</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <span style={styles.logoText}>⛳ Digital <em>Heros</em></span>
        <span style={{ color: "#888", fontSize: "0.85rem" }}>© 2026 Digital Heros Golf Charity. All rights reserved.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.15} 50%{transform:scale(1.08);opacity:.22} }
        @keyframes slideIn { from{width:0} to{width:100%} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}

const C = {
  bg: "#0a0f0a",
  bgCard: "#111811",
  bgCard2: "#0f140f",
  green: "#1a6b3c",
  greenLight: "#2d9e5f",
  gold: "#c9a84c",
  goldLight: "#e8c96a",
  text: "#f0f4f0",
  textMuted: "#8a9e8a",
  border: "rgba(255,255,255,0.07)",
};

const styles = {
  page: {
    background: C.bg,
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    color: C.text,
    overflowX: "hidden",
  },

  // NAV
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1.2rem 4rem",
    borderBottom: `1px solid ${C.border}`,
    background: "rgba(10,15,10,0.95)",
    backdropFilter: "blur(12px)",
    position: "sticky", top: 0, zIndex: 100,
  },
  navLogo: { display: "flex", alignItems: "center", gap: "0.6rem" },
  logoIcon: { fontSize: "1.6rem" },
  logoText: { fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: C.text, letterSpacing: "-0.01em" },
  navLinks: { display: "flex", alignItems: "center", gap: "2rem" },
  navLink: { color: C.textMuted, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s", cursor: "pointer" },
  navBtn: {
    background: C.gold, color: "#0a0f0a", border: "none",
    padding: "0.5rem 1.2rem", borderRadius: "6px",
    fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  navBtnOutline: {
    background: "transparent", color: C.text,
    border: `1px solid ${C.border}`,
    padding: "0.5rem 1.2rem", borderRadius: "6px",
    fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },

  // HERO
  hero: {
    minHeight: "92vh", display: "flex", alignItems: "center",
    justifyContent: "space-between", gap: "3rem",
    padding: "4rem 4rem 4rem 4rem",
    position: "relative", overflow: "hidden",
  },
  circle1: {
    position: "absolute", width: 600, height: 600,
    borderRadius: "50%", top: -200, right: -100,
    background: `radial-gradient(circle, ${C.green}22 0%, transparent 70%)`,
    animation: "pulse 6s ease-in-out infinite",
    pointerEvents: "none",
  },
  circle2: {
    position: "absolute", width: 400, height: 400,
    borderRadius: "50%", bottom: -150, left: -100,
    background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`,
    animation: "pulse 8s ease-in-out infinite 2s",
    pointerEvents: "none",
  },
  circle3: {
    position: "absolute", width: 200, height: 200,
    borderRadius: "50%", top: "40%", left: "40%",
    background: `radial-gradient(circle, ${C.greenLight}10 0%, transparent 70%)`,
    pointerEvents: "none",
  },
  heroContent: { flex: 1, maxWidth: 560, position: "relative", zIndex: 2 },
  heroBadge: {
    display: "inline-block",
    background: `${C.gold}22`, color: C.gold,
    border: `1px solid ${C.gold}44`,
    padding: "0.35rem 1rem", borderRadius: "999px",
    fontSize: "0.8rem", fontWeight: 600, marginBottom: "1.5rem",
    letterSpacing: "0.05em",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(3rem, 6vw, 5.5rem)",
    lineHeight: 1.05, fontWeight: 900,
    color: C.text, marginBottom: "1.5rem",
  },
  heroAccent: { color: C.gold, fontStyle: "italic" },
  heroSub: {
    fontSize: "1.05rem", color: C.textMuted, lineHeight: 1.7,
    marginBottom: "2.5rem", maxWidth: 460,
  },
  heroBtns: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  btnGold: {
    background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
    color: "#0a0f0a", border: "none",
    padding: "0.85rem 2rem", borderRadius: "8px",
    fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: `0 4px 24px ${C.gold}44`,
  },
  btnGhost: {
    background: "transparent", color: C.text,
    border: `1px solid ${C.border}`,
    padding: "0.85rem 2rem", borderRadius: "8px",
    fontWeight: 600, fontSize: "0.95rem", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },

  // HERO CARD
  heroCard: {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: "20px", padding: "2rem",
    width: 320, flexShrink: 0,
    position: "relative", zIndex: 2,
    boxShadow: `0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
  cardBadge: {
    background: "#e63946", color: "#fff",
    padding: "0.2rem 0.7rem", borderRadius: "999px",
    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
  },
  cardSeason: { color: C.textMuted, fontSize: "0.8rem" },
  cardCourse: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" },
  courseIcon: { fontSize: "2.2rem", background: `${C.green}33`, borderRadius: "12px", padding: "0.5rem" },
  courseName: { fontWeight: 700, fontSize: "1rem", color: C.text },
  courseDetail: { color: C.textMuted, fontSize: "0.8rem", marginTop: "0.2rem" },
  cardDivider: { height: 1, background: C.border, marginBottom: "1.2rem" },
  cardLeaders: { marginBottom: "1.5rem" },
  cardLeadersTitle: { color: C.textMuted, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.8rem" },
  leaderRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0.45rem 0", fontSize: "0.88rem", color: C.text,
    borderBottom: `1px solid ${C.border}`,
  },
  leaderScore: { color: C.greenLight, fontWeight: 700 },
  cardBtn: {
    width: "100%", background: `${C.green}33`,
    color: C.greenLight, border: `1px solid ${C.green}55`,
    padding: "0.7rem", borderRadius: "8px",
    fontWeight: 600, fontSize: "0.88rem", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },

  // STATS
  statsSection: {
    padding: "5rem 4rem",
    background: C.bgCard2,
    borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
    textAlign: "center",
  },
  sectionLabel: {
    color: C.gold, fontSize: "0.75rem", fontWeight: 700,
    letterSpacing: "0.15em", marginBottom: "0.75rem",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
    fontWeight: 900, color: C.text, marginBottom: "3rem",
  },
  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.5rem", maxWidth: 900, margin: "0 auto",
  },
  statCard: {
    background: C.bgCard, border: `1px solid ${C.border}`,
    borderRadius: "16px", padding: "2rem 1rem",
  },
  statValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.8rem", fontWeight: 900, color: C.gold,
    lineHeight: 1,
  },
  statLabel: { color: C.textMuted, fontSize: "0.88rem", marginTop: "0.6rem", fontWeight: 500 },

  // ABOUT
  aboutSection: {
    display: "flex", alignItems: "center", gap: "5rem",
    padding: "6rem 4rem",
  },
  aboutLeft: { flex: 1 },
  aboutText: { color: C.textMuted, lineHeight: 1.8, marginBottom: "1.8rem", fontSize: "1rem" },
  aboutList: { listStyle: "none", marginBottom: "2rem" },
  aboutItem: { color: C.text, fontSize: "0.95rem", marginBottom: "0.7rem", display: "flex", alignItems: "center", gap: "0.6rem" },
  checkIcon: { color: C.greenLight, fontWeight: 700 },
  aboutRight: { flex: 1, position: "relative" },
  courseCard: {
    background: C.bgCard, border: `1px solid ${C.border}`,
    borderRadius: "20px", padding: "2.5rem",
    boxShadow: `0 24px 60px rgba(0,0,0,0.4)`,
  },
  courseCardEmoji: { fontSize: "3rem", marginBottom: "1.5rem" },
  courseCardLines: { display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2rem" },
  courseLine: {
    height: 8, borderRadius: 999,
    background: `linear-gradient(90deg, ${C.green}, ${C.greenLight})`,
    opacity: 0.6,
  },
  courseCardFooter: {
    display: "flex", justifyContent: "space-between",
    fontSize: "0.85rem", color: C.textMuted, paddingTop: "1rem",
    borderTop: `1px solid ${C.border}`,
  },
  floatingBadge: {
    position: "absolute", top: -16, right: -16,
    background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
    color: "#0a0f0a", fontWeight: 700, fontSize: "0.8rem",
    padding: "0.5rem 1rem", borderRadius: "999px",
    boxShadow: `0 4px 16px ${C.gold}44`,
  },

  // SPONSORS
  sponsorSection: {
    padding: "3rem 4rem",
    borderTop: `1px solid ${C.border}`,
    background: C.bgCard2,
    textAlign: "center",
  },
  sponsorLabel: { color: C.textMuted, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "1.5rem" },
  sponsorRow: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" },
  sponsorPill: {
    background: C.bgCard, border: `1px solid ${C.border}`,
    color: C.textMuted, padding: "0.6rem 1.5rem",
    borderRadius: "999px", fontSize: "0.85rem", fontWeight: 500,
  },

  // CTA
  ctaSection: {
    padding: "6rem 4rem",
    background: `linear-gradient(135deg, ${C.green}22, ${C.gold}11)`,
    borderTop: `1px solid ${C.border}`,
    textAlign: "center",
  },
  ctaInner: { maxWidth: 600, margin: "0 auto" },
  ctaTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 900, color: C.text, marginBottom: "1rem",
  },
  ctaSub: { color: C.textMuted, fontSize: "1rem", marginBottom: "2.5rem", lineHeight: 1.7 },

  // FOOTER
  footer: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "1.5rem 4rem",
    borderTop: `1px solid ${C.border}`,
    background: C.bgCard2,
  },
};
