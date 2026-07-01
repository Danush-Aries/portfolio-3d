import { ImageResponse } from "next/og";

export const alt =
  "Dhanush Shankar — I build the AI. I break the AI. I ship with the AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "radial-gradient(circle at 30% 40%, #12181B 0%, #0A0E10 70%)",
          fontFamily: "monospace",
          color: "#E6EDE9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              background: "#7CFFB0",
              boxShadow: "0 0 12px #7CFFB0",
            }}
          />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              color: "#7CFFB0",
              textTransform: "uppercase",
            }}
          >
            attack-surface / live
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -1,
            }}
          >
            I build the AI.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -1,
              color: "#FF6B6B",
            }}
          >
            I break the AI.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -1,
              color: "#7CFFB0",
            }}
          >
            I ship with the AI.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#6B7772",
          }}
        >
          <div style={{ display: "flex" }}>
            dhanush shankar &nbsp;·&nbsp; full-stack agent engineer
          </div>
          <div style={{ display: "flex", color: "#5AB0FF" }}>dhanush.dev</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
