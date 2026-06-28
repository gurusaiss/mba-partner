"use client";

const colleges = [
  { name: "MDI Gurgaon", count: 12 },
  { name: "NMIMS Mumbai", count: 9 },
  { name: "IIM Kozhikode", count: 8 },
  { name: "XLRI Jamshedpur", count: 7 },
  { name: "JBIMS", count: 5 },
  { name: "IIM Lucknow", count: 5 },
  { name: "IIM Bangalore", count: 6 },
  { name: "IIM Indore", count: 4 },
  { name: "FMS Delhi", count: 4 },
  { name: "SIBM Bangalore", count: 3 },
  { name: "IIM Mumbai", count: 2 },
  { name: "IIM Ranchi", count: 2 },
  { name: "IMT Ghaziabad", count: 2 },
  { name: "IIM Amritsar", count: 1 },
  { name: "Others", count: 50 },
];

const testimonials = [
  {
    name: "Pavan Pawar",
    college: "SIBM Bangalore",
    placed: "Ediglobe (SIP)",
    quote: "I took Marketing, Product Management, and Consulting live projects simultaneously with the Case Competition Bootcamp. The real deliverables gave me concrete talking points in every SIP interview. Placed at Ediglobe.",
    tag: "Case Comp + 3 Live Projects",
    tagClass: "tag-green",
  },
  {
    name: "Vedanshi",
    college: "XLRI Jamshedpur",
    placed: "Amazon (SIP)",
    quote: "The Consulting Live Project under Prodmark gave me an actual strategy deliverable to show in interviews. Amazon shortlisted me directly based on my CV — the ATS-optimised CV points made all the difference.",
    tag: "Live Project — Consulting",
    tagClass: "tag-blue",
  },
  {
    name: "Divyanshi Jaiswal",
    college: "NMIMS Mumbai",
    placed: "Nomura (Final)",
    quote: "Final placements at Nomura. The Master Placement Bootcamp — especially the finance-domain Mock PIs and the interview transcripts from Goldman and JP Morgan — prepared me for exactly the type of questions asked.",
    tag: "Master Placements",
    tagClass: "tag",
  },
  {
    name: "Ananyo Sharma Roy",
    college: "XLRI Jamshedpur",
    placed: "TAS (Final)",
    quote: "TAS is one of the most selective final placement roles. The 1:1 mentorship from an alumnus who had cracked TAS the previous year, combined with the domain sessions, made the preparation feel structured rather than overwhelming.",
    tag: "1:1 Mentorship",
    tagClass: "tag-rose",
  },
  {
    name: "Megha",
    college: "IIM Mumbai",
    placed: "Kearney (SIP)",
    quote: "Kearney was my dream SIP. The Case Competition Bootcamp by AIR 1 taught me frameworks that I directly applied in the Kearney case interview. I also did the Marketing and Operations live projects — both featured in my CV.",
    tag: "Case Comp + Live Projects",
    tagClass: "tag-indigo",
  },
  {
    name: "Madhumitha",
    college: "IIM Bangalore",
    placed: "Accenture (SIP)",
    quote: "The domain-specific coaching for consulting roles was exceptional. 7 Mock GDs and 7 Mock PIs over 6 weeks completely transformed how I present myself. Placed at Accenture Strategy.",
    tag: "Master Placements",
    tagClass: "tag-green",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div className="section-label">700+ Verified Reviews</div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            Students Who Made It
          </h2>
        </div>

        {/* Part A: College chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "52px" }}>
          {colleges.map((c) => (
            <div
              key={c.name}
              style={{
                background: "var(--card2)",
                border: "1px solid var(--border)",
                borderRadius: "100px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>
                {c.name}
              </span>
              <span
                style={{
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "100px",
                  padding: "1px 8px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                }}
              >
                {c.count === 50 ? "50+" : c.count}
              </span>
            </div>
          ))}
        </div>

        {/* Part B: Testimonial cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "56px",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card"
              style={{ padding: "28px", display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    flexShrink: 0,
                    background: "var(--card2)",
                    border: "1px solid var(--border)",
                    color: "var(--gold)",
                  }}
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text)" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{t.college}</div>
                </div>
              </div>
              <blockquote
                style={{
                  fontSize: "0.93rem",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  flex: 1,
                  marginBottom: "20px",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border)",
                  flexWrap: "wrap",
                }}
              >
                <span className={`tag ${t.tagClass}`} style={{ fontSize: "0.65rem" }}>
                  {t.tag}
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--dim)" }}>→ {t.placed}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Part C: Summary stats strip */}
        <div
          style={{
            textAlign: "center",
            padding: "28px 32px",
            background: "var(--card2)",
            borderRadius: "14px",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--muted)",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            <span style={{ color: "var(--gold)", fontWeight: 700 }}>Students placed across 40+ companies</span>
            <span style={{ color: "var(--dim)", margin: "0 12px" }}>·</span>
            <span>IIM A · B · C · L · K · I</span>
            <span style={{ color: "var(--dim)", margin: "0 12px" }}>·</span>
            <span>XLRI · MDI · NMIMS · JBIMS · FMS</span>
            <span style={{ color: "var(--dim)", margin: "0 12px" }}>·</span>
            <span style={{ color: "var(--gold)", fontWeight: 600 }}>and 30 more B-schools</span>
          </p>
        </div>

      </div>
    </section>
  );
}
