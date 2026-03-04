import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface PolicySection {
  number: number;
  title: string;
  content: ReactNode;
  prohibited?: string[];
}

interface SectionCardProps {
  section: PolicySection;
  index: number;
}

type FadeStyle = (delayMs: number) => CSSProperties;

// ── Data ───────────────────────────────────────────────────────────────────

const sections: PolicySection[] = [
  {
    number: 1,
    title: "Personal Information",
    content: (
      <>
        We do <strong>not collect, store, or share</strong> any personal
        information from group members. Your phone number and any personal data
        shared in the group remain private and are not used for any other
        purpose.
      </>
    ),
  },
  {
    number: 2,
    title: "Content Responsibility",
    content: (
      <>
        Each member is <strong>fully responsible</strong> for the content they
        share. We do not endorse or take responsibility for any hateful,
        offensive, or harmful content shared within the group. Members must
        adhere to community guidelines and show respect to others.
      </>
    ),
  },
  {
    number: 3,
    title: "Community Conduct",
    content: (
      <>
        Sharing <strong>hateful content</strong> against individuals or the
        community is strictly prohibited. Any member found violating this rule
        will be held responsible.
      </>
    ),
    prohibited: [
      "Hateful or discriminatory messages",
      "Offensive or harmful content",
      "Disrespectful behaviour towards members",
    ],
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────

const WhatsAppIcon: FC = () => (
  <svg
    className="w-9 h-9 fill-current text-white"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="WhatsApp"
    role="img"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SectionCard: FC<SectionCardProps> = ({ section, index }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200 + index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  const cardStyle: CSSProperties = {
    borderLeft: `4px solid ${hovered ? "#c49a28" : "#1a7a4a"}`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition:
      "opacity 0.5s ease, transform 0.5s ease, border-color 0.2s, box-shadow 0.2s",
    boxShadow: hovered
      ? "0 4px 24px rgba(26,122,74,0.10)"
      : "0 1px 3px rgba(0,0,0,0.06)",
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={cardStyle}
      className="bg-white rounded-2xl p-7 mb-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base text-white shadow flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #1a7a4a, #0e5c35)" }}
        >
          {section.number}
        </span>
        <h2 className="text-xl font-bold" style={{ color: "#1a5c35" }}>
          {section.title}
        </h2>
      </div>

      <p className="text-gray-600 leading-relaxed">{section.content}</p>

      {section.prohibited && (
        <ul className="mt-4 space-y-2">
          {section.prohibited.map((item: string, i: number) => (
            <li
              key={i}
              className="flex items-start gap-2 text-gray-500 text-sm"
            >
              <span className="mt-1 w-4 h-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────

const PrivacyPolicy: FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeStyle: FadeStyle = (delayMs) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`,
  });

  const rootStyle: CSSProperties = {
    backgroundColor: "#f4f9f6",
    fontFamily: "'Nunito', sans-serif",
    color: "#1c2e22",
  };

  const headerStyle: CSSProperties = {
    backgroundColor: "#0f1f16",
    backgroundImage: `
      radial-gradient(circle at 20% 50%, rgba(26,122,74,0.35) 0%, transparent 60%),
      radial-gradient(circle at 80% 20%, rgba(196,154,40,0.2) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
    `,
  };

  return (
    <div className="min-h-screen" style={rootStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;500;600;700&display=swap');
        .amiri { font-family: 'Amiri', serif; }
        .divider-ornament { display: flex; align-items: center; gap: 12px; }
        .divider-ornament::before, .divider-ornament::after {
          content: ''; flex: 1; height: 1px;
        }
        .divider-ornament::before { background: linear-gradient(to right, transparent, #c8ddd2); }
        .divider-ornament::after  { background: linear-gradient(to left,  transparent, #c8ddd2); }
      `}</style>

      {/* ── HERO HEADER ── */}
      <header
        className="py-14 px-6 text-center relative overflow-hidden"
        style={headerStyle}
      >
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-6"
          style={{
            background: "linear-gradient(135deg, #25d366, #128c7e)",
            ...fadeStyle(0),
          }}
        >
          <WhatsAppIcon />
        </div>

        <h1
          className="amiri text-white text-4xl md:text-5xl font-bold leading-tight"
          style={fadeStyle(100)}
        >
          JAMAUTIYA SADAT NEWS
        </h1>

        <p
          className="text-lg mt-2 tracking-widest uppercase font-semibold"
          style={{ color: "#86efac", ...fadeStyle(200) }}
        >
          WhatsApp Group
        </p>

        <div className="mt-5" style={fadeStyle(300)}>
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-bold tracking-wide text-white shadow"
            style={{ background: "linear-gradient(135deg, #1a7a4a, #0e5c35)" }}
          >
            Privacy Policy
          </span>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-3xl mx-auto px-4 py-12">

        {/* Intro */}
        <p
          className="text-base md:text-lg text-gray-600 text-center leading-relaxed mb-10"
          style={fadeStyle(100)}
        >
          Welcome to the{" "}
          <strong style={{ color: "#1a7a4a" }}>JAMAUTIYA SADAT NEWS</strong>{" "}
          WhatsApp Group. We are committed to maintaining your privacy and
          ensuring a safe space for sharing news relevant to our hometown.
          Please review the following policy to understand how we handle your
          information.
        </p>

        {/* Policy Sections */}
        {sections.map((section: PolicySection, i: number) => (
          <SectionCard key={section.number} section={section} index={i} />
        ))}

        {/* Divider */}
        <div
          className="divider-ornament mb-10"
          style={{ color: "#86efac", fontSize: "1.125rem" }}
        >
          <span>✦</span>
        </div>

        {/* Agreement Box */}
        <div
          className="text-white rounded-2xl p-7 mb-8 shadow-lg"
          style={{ backgroundColor: "#1a7a4a", ...fadeStyle(500) }}
        >
          <p className="text-base leading-relaxed">
            By participating in this group, you{" "}
            <strong>agree to adhere</strong> to this Privacy Policy. Thank you
            for helping us maintain a respectful and informative space for our
            hometown news.
          </p>
        </div>

        {/* Note Box */}
        <div
          className="rounded-2xl p-6 mb-10"
          style={{
            background: "linear-gradient(135deg, #fffbea, #fff8d6)",
            borderLeft: "4px solid #c49a28",
            ...fadeStyle(600),
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl" role="img" aria-label="Pin">📌</span>
            <div>
              <p className="font-bold mb-1" style={{ color: "#92600a" }}>
                NOTE
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#78450a" }}
              >
                If you have any questions or concerns about this policy, please
                reach out to the <strong>group admin</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Updated Date */}
        <div className="text-center" style={fadeStyle(700)}>
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-semibold tracking-wide"
            style={{
              background: "rgba(196,154,40,0.12)",
              border: "1px solid rgba(196,154,40,0.4)",
              color: "#8a6a10",
            }}
          >
            🗓 Last Updated: 21 July 2024
          </span>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="text-center py-8 text-gray-400 text-xs border-t border-gray-200 mt-4">
        © 2024 JAMAUTIYA SADAT NEWS WhatsApp Group &nbsp;·&nbsp; All rights
        reserved
      </footer>
    </div>
  );
};

export default PrivacyPolicy;