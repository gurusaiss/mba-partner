"use client";

const videoTestimonials = [
  { name: "Ananya", college: "Welingkar", src: "/videos/Ananya-Welingkar.mp4" },
  { name: "Jigar", college: "IIM Amritsar", src: "/videos/Jigar-IIM-Amritsar.mp4" },
  { name: "Mridul", college: "IIM Calcutta", src: "/videos/Mridul-IIM-Calcutta.mp4" },
  { name: "Satwik", college: "IMT Ghaziabad", src: "/videos/Satwik-IMT-Ghaziabad.mp4" },
  { name: "Siddhant", college: "DSE", src: "/videos/Siddhant-DSE.mp4" },
  { name: "Tushar", college: "GLIM Chennai", src: "/videos/Tushar-GLIM-C.mp4" },
];

const youtubeSession = [
  {
    title: "B-School Comparison & CV Skeleton",
    description:
      "How to pick the right B-school for your profile + CV structure that gets shortlisted.",
    url: "https://www.youtube.com/watch?v=zZXBRobYRCE&t=34s",
  },
  {
    title: "MBA Game Plan",
    description:
      "End-to-end strategy for MBA placement season — what to prioritize, when to start, how to stand out.",
    url: "https://www.youtube.com/watch?v=eIgTrOVCyRw",
  },
  {
    title: "HR Contacts Demo",
    description:
      "A live demo of how the HR contact database works and how to use it in outreach.",
    url: "https://www.youtube.com/watch?v=OhVg0Wf9JzU",
  },
];

export default function VideoTestimonials() {
  return (
    <section
      id="video-testimonials"
      style={{ padding: "96px 0", background: "var(--card)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "52px" }}>
          <div className="section-label">Student Stories</div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            Hear It From Them
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--muted)", margin: 0 }}>
            Real students. Real results. Unscripted.
          </p>
        </div>

        {/* Part A: Video cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "72px",
          }}
        >
          {videoTestimonials.map((v) => (
            <div
              key={v.name}
              className="card"
              style={{ padding: 0, overflow: "hidden", borderRadius: "16px" }}
            >
              <video
                src={v.src}
                controls
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  maxHeight: "220px",
                  objectFit: "cover",
                  display: "block",
                  background: "#000",
                }}
              />
              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>
                  {v.name}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px" }}>
                  {v.college}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part B: Free YouTube Sessions */}
        <div>
          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--text)",
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              Free Sessions — Watch Before You Enroll
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", margin: 0 }}>
              Live sessions conducted by our mentors — available for free on YouTube.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {youtubeSession.map((s) => (
              <div key={s.title} className="card" style={{ padding: "24px" }}>
                {/* YouTube play icon */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,0,0,0.18)",
                    border: "1px solid rgba(255,0,0,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                    fontSize: "1.1rem",
                  }}
                >
                  <span style={{ color: "#ff4444", marginLeft: "3px" }}>▶</span>
                </div>

                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--text)",
                    marginBottom: "10px",
                    lineHeight: 1.4,
                  }}
                >
                  {s.title}
                </div>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    lineHeight: 1.65,
                    marginBottom: "20px",
                    flex: 1,
                  }}
                >
                  {s.description}
                </p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 18px",
                    borderRadius: "10px",
                    background: "rgba(255,0,0,0.15)",
                    border: "1px solid rgba(255,0,0,0.3)",
                    color: "#ff6b6b",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                >
                  <span>▶</span>
                  <span>Watch on YouTube</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
