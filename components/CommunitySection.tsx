"use client";

const channels = [
  {
    name: "WhatsApp Community",
    desc: "Daily placement tips, job alerts, peer support",
    members: "3,200+ members",
    icon: "whatsapp",
    color: "#25D366",
    colorAlpha: "rgba(37,211,102,0.10)",
    borderColor: "rgba(37,211,102,0.25)",
    link: "https://wa.me/918686863183",
    cta: "Join WhatsApp Group",
    badge: "Most Active",
  },
  {
    name: "Telegram Channel",
    desc: "Instant updates, resources, mock test links",
    members: "1,800+ subscribers",
    icon: "telegram",
    color: "#229ED9",
    colorAlpha: "rgba(34,158,217,0.10)",
    borderColor: "rgba(34,158,217,0.25)",
    link: "https://t.me/mbapartner",
    cta: "Join Telegram",
    badge: "Quick Updates",
  },
  {
    name: "MBA Partner Network",
    desc: "Alumni network, referrals, LinkedIn connections",
    members: "5,000+ alumni",
    icon: "network",
    color: "#8B5CF6",
    colorAlpha: "rgba(139,92,246,0.10)",
    borderColor: "rgba(139,92,246,0.25)",
    link: "#enroll",
    cta: "Join the Network",
    badge: "Exclusive",
  },
];

const activities = [
  "Sneha from NMIMS shared a Goldman Sachs PI transcript",
  "Priya's CV got reviewed — 3 offers in hand ✓",
  "New Kearney case study added to resource repo",
  "Arjun cracked TAS final round — AIR 1 case comp winner",
  "Free VARC RC material dropped — 200 downloads in 1 hr",
  "Mock GD for consulting domain — tonight 8pm",
];

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="12" y1="7" x2="5" y2="17" />
      <line x1="12" y1="7" x2="19" y2="17" />
      <line x1="5" y1="19" x2="19" y2="19" />
    </svg>
  );
}

function ChannelIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <div style={{
      width: 52,
      height: 52,
      borderRadius: "50%",
      background: `radial-gradient(circle at 30% 30%, ${color}33, ${color}11)`,
      border: `1.5px solid ${color}55`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color,
      flexShrink: 0,
    }}>
      {icon === "whatsapp" && <WhatsAppIcon />}
      {icon === "telegram" && <TelegramIcon />}
      {icon === "network" && <NetworkIcon />}
    </div>
  );
}

export default function CommunitySection() {
  return (
    <section style={{
      padding: "96px 0",
      background: "linear-gradient(180deg, #08100A 0%, #0A1210 100%)",
    }}>
      <style>{`
        @keyframes communityPulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes scrollFeed {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .community-card {
          display: flex;
          align-items: center;
          gap: 20px;
          border-radius: 16px;
          padding: 24px;
          transition: all 0.22s ease;
          cursor: default;
          position: relative;
        }
        .community-card:hover {
          transform: translateX(4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        [data-theme="light"] .community-card {
          background: #fff !important;
        }
        [data-theme="light"] .community-activity-card {
          background: #fff !important;
          border-color: rgba(0,0,0,0.1) !important;
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{
            display: "inline-block",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: "16px",
            padding: "5px 14px",
            border: "1px solid rgba(240,170,0,0.25)",
            borderRadius: "100px",
          }}>
            Community
          </div>
          <h2 style={{
            fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            color: "var(--text)",
            margin: "0 0 16px",
            lineHeight: 1.15,
          }}>
            Join 5,000+ MBA Students
          </h2>
          <p style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            margin: 0,
            maxWidth: "540px",
          }}>
            The most active MBA prep community in India. Free resources, peer support, and alumni connections.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "60% 40%",
          gap: "32px",
          alignItems: "start",
        }}>

          {/* Left: Channel cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="community-card"
                style={{
                  background: ch.colorAlpha,
                  border: `1px solid ${ch.borderColor}`,
                }}
              >
                <ChannelIcon icon={ch.icon} color={ch.color} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Badge */}
                  <span style={{
                    display: "inline-block",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "2px 10px",
                    borderRadius: "100px",
                    background: `${ch.color}22`,
                    color: ch.color,
                    border: `1px solid ${ch.color}44`,
                    marginBottom: "6px",
                  }}>
                    {ch.badge}
                  </span>
                  <div style={{
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    color: "var(--text)",
                  }}>
                    {ch.name}
                  </div>
                  <div style={{
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    marginTop: 4,
                  }}>
                    {ch.desc}
                  </div>
                  <div style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: ch.color,
                    marginTop: 8,
                  }}>
                    {ch.members}
                  </div>
                </div>

                <a
                  href={ch.link}
                  target={ch.link.startsWith("http") ? "_blank" : undefined}
                  rel={ch.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-block",
                    padding: "9px 18px",
                    borderRadius: "100px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    background: `linear-gradient(135deg, ${ch.color}, ${ch.color}CC)`,
                    color: ch.icon === "whatsapp" ? "#071A0D" : "#fff",
                    flexShrink: 0,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {ch.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Right: Live activity feed */}
          <div
            className="community-activity-card"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "24px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                animation: "communityPulse 2s infinite",
              }} />
              <span style={{
                fontWeight: 700,
                fontSize: "0.88rem",
                color: "var(--text)",
              }}>
                Live Activity
              </span>
            </div>

            {/* Activity list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {activities.map((item, i) => {
                const isLast = i === activities.length - 1;
                return (
                  <div
                    key={i}
                    style={{
                      borderLeft: isLast
                        ? "3px solid rgba(240,170,0,0.7)"
                        : "3px solid rgba(240,170,0,0.3)",
                      paddingLeft: 12,
                      paddingTop: 10,
                      paddingBottom: 10,
                      fontSize: "0.82rem",
                      color: isLast ? "var(--text)" : "var(--muted)",
                      background: isLast ? "rgba(240,170,0,0.05)" : "transparent",
                      borderRadius: isLast ? "0 6px 6px 0" : 0,
                      marginBottom: i < activities.length - 1 ? 2 : 0,
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{
              marginTop: "18px",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.25)",
              paddingTop: "14px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}>
              Updated 2 minutes ago
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
