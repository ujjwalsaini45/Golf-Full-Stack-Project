import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard");
  const [drawLoading, setDrawLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: token },
      });
      setUsers(res.data);
    } catch {}
  };

  const fetchWinners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/winners", {
        headers: { Authorization: token },
      });
      setWinners(res.data);
    } catch {}
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: token },
      });
      setStats(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchUsers();
    fetchWinners();
    fetchStats();
  }, []);

  const runDraw = async () => {
    setDrawLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/admin/draw/run",
        {},
        { headers: { Authorization: token } }
      );
      showToast("🎯 Draw executed successfully!");
      fetchWinners();
    } catch {
      showToast("Failed to run draw", "error");
    }
    setDrawLoading(false);
  };

  const markPaid = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/winners/${id}/pay`,
        {},
        { headers: { Authorization: token } }
      );
      showToast("✅ Marked as paid!");
      fetchWinners();
    } catch {
      showToast("Failed to update", "error");
    }
  };

  const statCards = [
    { label: "Total Users", value: stats.totalUsers ?? "—", icon: "👤", color: "#2d9e5f" },
    { label: "Total Winners", value: stats.totalWinners ?? "—", icon: "🏆", color: "#c9a84c" },
    { label: "Charities", value: stats.totalCharities ?? "—", icon: "❤️", color: "#e05c6e" },
    { label: "Pending Payouts", value: winners.filter(w => w.status === "pending").length, icon: "💰", color: "#7c6af7" },
  ];

  return (
    <div style={s.page}>
      {/* TOAST */}
      {toast && (
        <div style={{ ...s.toast, background: toast.type === "error" ? "#e05c6e" : "#2d9e5f" }}>
          {toast.msg}
        </div>
      )}

      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <div style={s.sidebarLogo}>
          <span style={{ fontSize: "1.8rem" }}>⛳</span>
          <div>
            <div style={s.logoTitle}>Digital Heros</div>
            <div style={s.logoSub}>Admin Panel</div>
          </div>
        </div>

        <nav style={s.sideNav}>
          {[
            { id: "dashboard", icon: "📊", label: "Dashboard" },
            { id: "users",     icon: "👤", label: "Users" },
            { id: "winners",   icon: "🏆", label: "Winners" },
            { id: "draw",      icon: "🎯", label: "Run Draw" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ ...s.navItem, ...(activeTab === item.id ? s.navItemActive : {}) }}
            >
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={s.sidebarFooter}>
          <div style={s.adminBadge}>🔐 Admin Access</div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={s.main}>
        {/* HEADER */}
        <div style={s.header}>
          <div>
            <h1 style={s.pageTitle}>
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "users" && "User Management"}
              {activeTab === "winners" && "Winners"}
              {activeTab === "draw" && "Monthly Draw"}
            </h1>
            <p style={s.pageSub}>Golf Charity Tournament · 2026</p>
          </div>
          <div style={s.headerRight}>
            <div style={s.liveBadge}>● LIVE</div>
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div>
            <div style={s.statsGrid}>
              {statCards.map((c, i) => (
                <div key={i} style={s.statCard}>
                  <div style={{ ...s.statIcon, background: c.color + "22", color: c.color }}>
                    {c.icon}
                  </div>
                  <div style={s.statValue}>{c.value}</div>
                  <div style={s.statLabel}>{c.label}</div>
                  <div style={{ ...s.statBar, background: c.color + "33" }}>
                    <div style={{ ...s.statBarFill, background: c.color, width: "65%" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Winners Preview */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <h2 style={s.cardTitle}>🏆 Recent Winners</h2>
                <button onClick={() => setActiveTab("winners")} style={s.linkBtn}>View All →</button>
              </div>
              <table style={s.table}>
                <thead>
                  <tr>
                    {["Player", "Match Count", "Prize", "Status"].map(h => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {winners.slice(0, 5).map((w) => (
                    <tr key={w._id} style={s.tr}>
                      <td style={s.td}>{w.userId?.name ?? "—"}</td>
                      <td style={s.td}>{w.matchCount}</td>
                      <td style={s.td}><span style={s.prize}>₹{w.prize}</span></td>
                      <td style={s.td}>
                        <span style={{ ...s.badge, ...(w.status === "pending" ? s.badgePending : s.badgePaid) }}>
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {winners.length === 0 && (
                    <tr><td colSpan={4} style={{ ...s.td, textAlign: "center", color: "#666" }}>No winners yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div style={s.card}>
            <div style={s.cardHeader}>
              <h2 style={s.cardTitle}>👤 All Users</h2>
              <span style={s.countBadge}>{users.length} total</span>
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  {["#", "Name", "Email", "Joined"].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id} style={s.tr}>
                    <td style={{ ...s.td, color: "#555", width: 40 }}>{i + 1}</td>
                    <td style={s.td}>
                      <div style={s.userRow}>
                        <div style={s.avatar}>{u.name?.[0]?.toUpperCase() ?? "?"}</div>
                        {u.name}
                      </div>
                    </td>
                    <td style={{ ...s.td, color: "#888" }}>{u.email}</td>
                    <td style={{ ...s.td, color: "#888" }}>
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={4} style={{ ...s.td, textAlign: "center", color: "#666" }}>No users found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* WINNERS TAB */}
        {activeTab === "winners" && (
          <div style={s.card}>
            <div style={s.cardHeader}>
              <h2 style={s.cardTitle}>🏆 All Winners</h2>
              <span style={s.countBadge}>{winners.length} total</span>
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  {["Player", "Match Count", "Prize", "Status", "Action"].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {winners.map((w) => (
                  <tr key={w._id} style={s.tr}>
                    <td style={s.td}>
                      <div style={s.userRow}>
                        <div style={{ ...s.avatar, background: "#c9a84c22", color: "#c9a84c" }}>
                          {w.userId?.name?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        {w.userId?.name ?? "—"}
                      </div>
                    </td>
                    <td style={s.td}>{w.matchCount}</td>
                    <td style={s.td}><span style={s.prize}>₹{w.prize}</span></td>
                    <td style={s.td}>
                      <span style={{ ...s.badge, ...(w.status === "pending" ? s.badgePending : s.badgePaid) }}>
                        {w.status}
                      </span>
                    </td>
                    <td style={s.td}>
                      {w.status === "pending" ? (
                        <button onClick={() => markPaid(w._id)} style={s.payBtn}>
                          Mark Paid
                        </button>
                      ) : (
                        <span style={{ color: "#555", fontSize: "0.8rem" }}>✓ Done</span>
                      )}
                    </td>
                  </tr>
                ))}
                {winners.length === 0 && (
                  <tr><td colSpan={5} style={{ ...s.td, textAlign: "center", color: "#666" }}>No winners yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* DRAW TAB */}
        {activeTab === "draw" && (
          <div style={s.drawPage}>
            <div style={s.drawCard}>
              <div style={s.drawEmoji}>🎯</div>
              <h2 style={s.drawTitle}>Monthly Prize Draw</h2>
              <p style={s.drawSub}>
                Run the monthly draw to automatically select winners based on match scores and allocate prizes to eligible players.
              </p>
              <div style={s.drawStats}>
                <div style={s.drawStat}>
                  <div style={s.drawStatVal}>{users.length}</div>
                  <div style={s.drawStatLabel}>Eligible Players</div>
                </div>
                <div style={s.drawDivider} />
                <div style={s.drawStat}>
                  <div style={s.drawStatVal}>{winners.filter(w => w.status === "pending").length}</div>
                  <div style={s.drawStatLabel}>Pending Payouts</div>
                </div>
                <div style={s.drawDivider} />
                <div style={s.drawStat}>
                  <div style={s.drawStatVal}>{winners.filter(w => w.status === "paid").length}</div>
                  <div style={s.drawStatLabel}>Paid Out</div>
                </div>
              </div>
              <button onClick={runDraw} disabled={drawLoading} style={{ ...s.drawBtn, opacity: drawLoading ? 0.7 : 1 }}>
                {drawLoading ? "Running Draw..." : "🎯 Run Monthly Draw"}
              </button>
              <p style={s.drawWarning}>⚠️ This action will create new winner records. Use once per month.</p>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0f0a; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes toastIn { from{opacity:0;transform:translateX(100px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    display: "flex", minHeight: "100vh",
    background: "#0a0f0a", fontFamily: "'DM Sans', sans-serif",
    color: "#f0f4f0",
  },
  toast: {
    position: "fixed", top: 20, right: 20, zIndex: 999,
    padding: "0.8rem 1.5rem", borderRadius: "10px",
    color: "#fff", fontWeight: 600, fontSize: "0.9rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    animation: "toastIn 0.3s ease",
  },

  // SIDEBAR
  sidebar: {
    width: 240, background: "#0d130d",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    display: "flex", flexDirection: "column",
    padding: "1.5rem 1rem",
    position: "sticky", top: 0, height: "100vh",
  },
  sidebarLogo: {
    display: "flex", alignItems: "center", gap: "0.8rem",
    padding: "0.5rem 0.5rem 1.5rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    marginBottom: "1.5rem",
  },
  logoTitle: { fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#f0f4f0" },
  logoSub: { fontSize: "0.7rem", color: "#556655", fontWeight: 500, marginTop: "0.1rem" },
  sideNav: { display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 },
  navItem: {
    display: "flex", alignItems: "center", gap: "0.75rem",
    padding: "0.75rem 1rem", borderRadius: "10px",
    background: "transparent", border: "none",
    color: "#7a8f7a", fontSize: "0.9rem", fontWeight: 500,
    cursor: "pointer", textAlign: "left", width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease",
  },
  navItemActive: {
    background: "rgba(45,158,95,0.15)",
    color: "#2d9e5f",
    fontWeight: 700,
  },
  sidebarFooter: { marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" },
  adminBadge: {
    background: "rgba(201,168,76,0.1)", color: "#c9a84c",
    border: "1px solid rgba(201,168,76,0.2)",
    padding: "0.5rem 1rem", borderRadius: "8px",
    fontSize: "0.78rem", fontWeight: 600, textAlign: "center",
  },

  // MAIN
  main: { flex: 1, padding: "2rem 2.5rem", overflowY: "auto", animation: "fadeIn 0.4s ease" },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: "2rem", paddingBottom: "1.5rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  pageTitle: { fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 900, color: "#f0f4f0" },
  pageSub: { color: "#556655", fontSize: "0.85rem", marginTop: "0.3rem" },
  headerRight: { display: "flex", alignItems: "center", gap: "1rem" },
  liveBadge: {
    background: "rgba(224,92,110,0.15)", color: "#e05c6e",
    border: "1px solid rgba(224,92,110,0.3)",
    padding: "0.4rem 1rem", borderRadius: "999px",
    fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em",
  },

  // STAT CARDS
  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.2rem", marginBottom: "2rem",
  },
  statCard: {
    background: "#0d130d", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px", padding: "1.5rem",
  },
  statIcon: { width: 44, height: 44, borderRadius: "12px", display: "grid", placeItems: "center", fontSize: "1.3rem", marginBottom: "1rem" },
  statValue: { fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#f0f4f0", lineHeight: 1 },
  statLabel: { color: "#7a8f7a", fontSize: "0.8rem", marginTop: "0.4rem", fontWeight: 500 },
  statBar: { height: 4, borderRadius: 999, marginTop: "1rem", overflow: "hidden" },
  statBarFill: { height: "100%", borderRadius: 999 },

  // CARD
  card: {
    background: "#0d130d", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" },
  cardTitle: { fontSize: "1rem", fontWeight: 700, color: "#f0f4f0" },
  linkBtn: {
    background: "transparent", border: "none", color: "#2d9e5f",
    fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  countBadge: {
    background: "rgba(255,255,255,0.05)", color: "#7a8f7a",
    padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600,
  },

  // TABLE
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "0.7rem 1rem", textAlign: "left",
    color: "#556655", fontSize: "0.75rem", fontWeight: 700,
    letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" },
  td: { padding: "0.85rem 1rem", fontSize: "0.88rem", color: "#c0d0c0" },
  prize: { color: "#c9a84c", fontWeight: 700 },
  badge: {
    padding: "0.25rem 0.7rem", borderRadius: "999px",
    fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize",
  },
  badgePending: { background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" },
  badgePaid: { background: "rgba(45,158,95,0.15)", color: "#2d9e5f", border: "1px solid rgba(45,158,95,0.3)" },
  userRow: { display: "flex", alignItems: "center", gap: "0.7rem" },
  avatar: {
    width: 32, height: 32, borderRadius: "50%",
    background: "rgba(45,158,95,0.2)", color: "#2d9e5f",
    display: "grid", placeItems: "center",
    fontSize: "0.8rem", fontWeight: 700, flexShrink: 0,
  },
  payBtn: {
    background: "rgba(45,158,95,0.15)", color: "#2d9e5f",
    border: "1px solid rgba(45,158,95,0.3)",
    padding: "0.35rem 0.9rem", borderRadius: "6px",
    fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },

  // DRAW
  drawPage: { display: "flex", justifyContent: "center", paddingTop: "2rem" },
  drawCard: {
    background: "#0d130d", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "20px", padding: "3rem",
    maxWidth: 520, width: "100%", textAlign: "center",
    boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
  },
  drawEmoji: { fontSize: "3.5rem", marginBottom: "1rem" },
  drawTitle: { fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "#f0f4f0", marginBottom: "0.8rem" },
  drawSub: { color: "#7a8f7a", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" },
  drawStats: { display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px" },
  drawStat: { textAlign: "center" },
  drawStatVal: { fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "#c9a84c" },
  drawStatLabel: { color: "#7a8f7a", fontSize: "0.75rem", marginTop: "0.3rem" },
  drawDivider: { width: 1, background: "rgba(255,255,255,0.06)" },
  drawBtn: {
    background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
    color: "#0a0f0a", border: "none",
    padding: "1rem 3rem", borderRadius: "10px",
    fontWeight: 700, fontSize: "1rem", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 24px rgba(201,168,76,0.4)",
    marginBottom: "1rem",
  },
  drawWarning: { color: "#556655", fontSize: "0.78rem" },
};
