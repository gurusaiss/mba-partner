"use client";
import type { CourseData } from "@/components/Courses";

export type { CourseData };

interface CompareRow {
  courseType: string;
  duration: string;
  mentorship: string;
  cvPoints: string;
  mockSessions: string;
  certificate: string;
  aiPlatform: string;
  groupDiscount: string;
  price: string;
  link: string;
}

const compareData: Record<number, CompareRow> = {
  1: {
    courseType: "Placement Prep",
    duration: "Ongoing",
    mentorship: "1:1 IIM Alumni",
    cvPoints: "5 CV reviews",
    mockSessions: "7 PI + 7 GD",
    certificate: "No",
    aiPlatform: "Yes",
    groupDiscount: "20% / 30%",
    price: "₹3,499",
    link: "https://www.mbapartner.in/product/sip-placement-bootcamp/"
  },
  2: {
    courseType: "Placement Prep",
    duration: "Ongoing",
    mentorship: "1:1 IIM Alumni",
    cvPoints: "3 CV reviews",
    mockSessions: "5 PI + 5 GD",
    certificate: "No",
    aiPlatform: "No",
    groupDiscount: "—",
    price: "₹2,499",
    link: "https://www.mbapartner.in/product/sip-placement-bootcamp/"
  },
  3: {
    courseType: "Case Competition",
    duration: "8 hrs sessions",
    mentorship: "Group + 1:1 if shortlisted",
    cvPoints: "1 CV point",
    mockSessions: "Case practice",
    certificate: "No",
    aiPlatform: "Yes",
    groupDiscount: "30% / 40%",
    price: "₹3,499",
    link: "https://www.mbapartner.in/product/case-competition-bootcamp/"
  },
  4: {
    courseType: "Live Project",
    duration: "2 months",
    mentorship: "IIM Alumni oversight",
    cvPoints: "5 ATS points",
    mockSessions: "No",
    certificate: "Yes",
    aiPlatform: "Yes",
    groupDiscount: "30%",
    price: "₹3,999",
    link: "https://www.mbapartner.in/product/live-project-consulting/"
  },
  5: {
    courseType: "Live Project",
    duration: "1 month",
    mentorship: "IIM Alumni oversight",
    cvPoints: "2 ATS points",
    mockSessions: "No",
    certificate: "Yes",
    aiPlatform: "No",
    groupDiscount: "30%",
    price: "₹2,499",
    link: "https://www.mbapartner.in/product/live-project-consulting/"
  },
  6: {
    courseType: "Combo",
    duration: "Full package",
    mentorship: "Priority matching",
    cvPoints: "Everything",
    mockSessions: "7 PI + 7 GD",
    certificate: "Yes",
    aiPlatform: "Yes",
    groupDiscount: "—",
    price: "₹13,999",
    link: "https://www.mbapartner.in/product/master-bootcamp-case-comp-live-project/"
  },
  7: {
    courseType: "Combo",
    duration: "Full package",
    mentorship: "1:1",
    cvPoints: "5 + 1",
    mockSessions: "7 PI + 7 GD",
    certificate: "No",
    aiPlatform: "Yes",
    groupDiscount: "—",
    price: "₹5,999",
    link: "https://www.mbapartner.in/product/placement-case-competition-combo/"
  },
  8: {
    courseType: "Certification",
    duration: "Self-paced",
    mentorship: "No",
    cvPoints: "No",
    mockSessions: "No",
    certificate: "Yes",
    aiPlatform: "No",
    groupDiscount: "30% / 40%",
    price: "₹1,999",
    link: "https://www.mbapartner.in"
  },
  9: {
    courseType: "Certification",
    duration: "Self-paced",
    mentorship: "No",
    cvPoints: "No",
    mockSessions: "No",
    certificate: "Yes",
    aiPlatform: "No",
    groupDiscount: "30% / 40%",
    price: "₹1,999",
    link: "https://www.mbapartner.in"
  },
};

const featureRows: { key: keyof CompareRow; label: string }[] = [
  { key: "courseType", label: "Course Type" },
  { key: "duration", label: "Duration" },
  { key: "mentorship", label: "Mentorship" },
  { key: "cvPoints", label: "CV Points / Reviews" },
  { key: "mockSessions", label: "Mock Sessions" },
  { key: "certificate", label: "Certificate" },
  { key: "aiPlatform", label: "AI Platform Access" },
  { key: "groupDiscount", label: "Group Discount" },
];

interface CourseComparisonProps {
  selectedIds: number[];
  courses: CourseData[];
  onRemove: (id: number) => void;
  onAdd: () => void;
}

export default function CourseComparison({ selectedIds, courses, onRemove, onAdd }: CourseComparisonProps) {
  const selectedCourses = selectedIds.map(id => courses.find(c => c.id === id)).filter(Boolean) as CourseData[];
  const isEmpty = selectedIds.length === 0;

  // Responsive grid: label col + up to 3 course cols
  const colCount = 1 + (isEmpty ? 3 : selectedCourses.length);
  const colWidths = `200px ${Array(colCount - 1).fill("1fr").join(" ")}`;

  return (
    <section id="course-compare" style={{ padding: "96px 0", background: "var(--card)" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div className="section-label">Course Comparison</div>
          <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "10px" }}>
            Compare Courses Side by Side
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            Add up to 3 courses to compare features, pricing, and what&apos;s included.
          </p>
        </div>

        {/* Placeholder */}
        {isEmpty ? (
          <div style={{
            textAlign: "center",
            padding: "72px 40px",
            border: "1px dashed var(--border)",
            borderRadius: "16px",
            color: "var(--muted)"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>📊</div>
            <p style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              Click <strong style={{ color: "var(--text)" }}>+ Compare</strong> on any course card above to add it here.
              <br />Compare up to 3 courses.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: colWidths,
              minWidth: "600px"
            }}>
              {/* Header row */}
              {/* Empty label cell */}
              <div style={{ padding: "16px", borderBottom: "1px solid var(--border)" }} />
              {selectedCourses.map(c => (
                <div
                  key={c.id}
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid var(--border)",
                    borderLeft: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <span className={`tag ${c.tag}`} style={{ fontSize: "0.7rem" }}>{c.tagLabel}</span>
                    <button
                      onClick={() => onRemove(c.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--muted)",
                        cursor: "pointer",
                        fontSize: "1rem",
                        lineHeight: 1,
                        padding: "2px 4px",
                        flexShrink: 0
                      }}
                      aria-label="Remove from comparison"
                    >
                      ✕
                    </button>
                  </div>
                  <span className="serif" style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.4 }}>
                    {c.title}
                  </span>
                </div>
              ))}

              {/* Empty slot headers if < 3 */}
              {Array.from({ length: 3 - selectedCourses.length }).map((_, i) => (
                <div
                  key={`empty-header-${i}`}
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid var(--border)",
                    borderLeft: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <button
                    onClick={onAdd}
                    style={{
                      background: "transparent",
                      border: "1px dashed var(--border)",
                      borderRadius: "8px",
                      color: "var(--muted)",
                      fontSize: "0.8rem",
                      padding: "8px 16px",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    + Add Course
                  </button>
                </div>
              ))}

              {/* Feature rows */}
              {featureRows.map((row, rowIdx) => {
                const isAlt = rowIdx % 2 === 1;
                const rowBg = isAlt ? "rgba(255,255,255,0.015)" : "transparent";

                return (
                  <>
                    {/* Label */}
                    <div
                      key={`label-${row.key}`}
                      style={{
                        padding: "14px 16px",
                        background: rowBg,
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: "var(--text)",
                        borderBottom: "1px solid var(--border)"
                      }}
                    >
                      {row.label}
                    </div>
                    {/* Course values */}
                    {selectedCourses.map(c => {
                      const data = compareData[c.id];
                      const val = data ? data[row.key] : "—";
                      const isYes = val === "Yes";
                      const isNo = val === "No";
                      return (
                        <div
                          key={`val-${row.key}-${c.id}`}
                          style={{
                            padding: "14px 16px",
                            background: rowBg,
                            fontSize: "0.85rem",
                            color: isYes ? "#4ade80" : isNo ? "var(--dim)" : "var(--muted)",
                            borderBottom: "1px solid var(--border)",
                            borderLeft: "1px solid var(--border)"
                          }}
                        >
                          {isYes ? "✓ Yes" : isNo ? "✗ No" : val}
                        </div>
                      );
                    })}
                    {/* Empty slots */}
                    {Array.from({ length: 3 - selectedCourses.length }).map((_, i) => (
                      <div
                        key={`empty-val-${row.key}-${i}`}
                        style={{
                          padding: "14px 16px",
                          background: rowBg,
                          borderBottom: "1px solid var(--border)",
                          borderLeft: "1px solid var(--border)"
                        }}
                      />
                    ))}
                  </>
                );
              })}

              {/* Price row */}
              {/* Label */}
              <div style={{
                padding: "18px 16px",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "var(--text)",
                borderBottom: "1px solid var(--border)"
              }}>
                Price
              </div>
              {selectedCourses.map(c => {
                const data = compareData[c.id];
                return (
                  <div
                    key={`price-${c.id}`}
                    style={{
                      padding: "18px 16px",
                      borderBottom: "1px solid var(--border)",
                      borderLeft: "1px solid var(--border)"
                    }}
                  >
                    <span className="serif" style={{ fontWeight: 900, fontSize: "1.3rem", color: "var(--gold)" }}>
                      {data?.price ?? "—"}
                    </span>
                  </div>
                );
              })}
              {Array.from({ length: 3 - selectedCourses.length }).map((_, i) => (
                <div
                  key={`empty-price-${i}`}
                  style={{
                    padding: "18px 16px",
                    borderBottom: "1px solid var(--border)",
                    borderLeft: "1px solid var(--border)"
                  }}
                />
              ))}

              {/* Enroll row */}
              <div style={{ padding: "18px 16px" }} />
              {selectedCourses.map(c => {
                const data = compareData[c.id];
                return (
                  <div
                    key={`enroll-${c.id}`}
                    style={{
                      padding: "18px 16px",
                      borderLeft: "1px solid var(--border)"
                    }}
                  >
                    <a
                      href={data?.link ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                      style={{ padding: "9px 18px", fontSize: "0.82rem", display: "inline-block" }}
                    >
                      Enroll →
                    </a>
                  </div>
                );
              })}
              {Array.from({ length: 3 - selectedCourses.length }).map((_, i) => (
                <div
                  key={`empty-enroll-${i}`}
                  style={{
                    padding: "18px 16px",
                    borderLeft: "1px solid var(--border)"
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

