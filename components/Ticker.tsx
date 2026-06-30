"use client";

const items = [
  "🏆  Pavan Pawar → SIBM Pune · Ediglobe",
  "🎯  Vedanshi Singh → XLRI Jamshedpur · Amazon",
  "💼  Divyanshi Jaiswal → NMIMS Mumbai · Nomura",
  "✨  Ananyo Roy → XLRI · TAS (Tata)",
  "🔥  Megha Soni → IIM Mumbai · Kearney",
  "⭐  Madhumitha → IIM Bangalore · Accenture",
  "🏅  AIR 1 · AIR 6 · AIR 10 Case Comp Toppers coached here",
  "📊  700+ verified student reviews · 9.6/10 average",
  "🎓  5,000+ students mentored by IIM alumni",
  "💡  98.7% placement success rate",
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div style={{
      background: "linear-gradient(90deg, rgba(249,115,22,0.06) 0%, rgba(249,115,22,0.09) 50%, rgba(249,115,22,0.06) 100%)",
      borderTop: "1px solid rgba(249,115,22,0.14)",
      borderBottom: "1px solid rgba(249,115,22,0.14)",
      padding: "14px 0",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"120px", background:"linear-gradient(90deg,#040B19 30%,transparent)", zIndex:2, pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"120px", background:"linear-gradient(270deg,#040B19 30%,transparent)", zIndex:2, pointerEvents:"none" }} />

      <div style={{ display:"flex", width:"max-content", animation:"ticker-scroll 36s linear infinite" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:"0", paddingRight:"0", fontSize:"0.85rem", color:"var(--muted)", fontWeight:500, whiteSpace:"nowrap" }}>
            <span style={{ paddingLeft:"40px", paddingRight:"40px" }}>{item}</span>
            <span style={{ color:"rgba(249,115,22,0.35)", fontSize:"0.6rem" }}>✦</span>
          </span>
        ))}
      </div>

      <style>{`@keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
