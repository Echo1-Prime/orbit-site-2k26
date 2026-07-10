import type { Metadata } from "next";
import styles from "./style.module.css";

export const metadata: Metadata = {
  title: "Style",
  description:
    "Echo 1 Labs living style guide — brand kit v4 tokens materialized in the site itself.",
  robots: { index: false, follow: false },
};

// Living style guide implementing Brand Kit v4 Part A (9 sections).
// Serves as internal reference + smoke test that all canonical tokens work.
// Pair with e1-v3-final-brand-kit/e1-orbit-brand-kit-2K26-v4.html.

const swatches = {
  Neutrals: [
    { name: "Void", token: "--color-void", hex: "#0A0A0E" },
    { name: "Void Card", token: "--color-void-card", hex: "#111118" },
    { name: "Orbit White", token: "--color-white", hex: "#FFFFFF" },
    { name: "Surface 2", token: "--color-surface-2", hex: "#F8F8FA" },
  ],
  "Brand primaries": [
    { name: "Solar Orange", token: "--color-solar", hex: "#FF7515" },
    { name: "Yellow", token: "--color-yellow", hex: "#FFFAA0" },
    { name: "Blue (links/info)", token: "--color-blue", hex: "#274578" },
    { name: "Violet (2nd accent)", token: "--color-violet", hex: "#8B5CF6" },
    { name: "Red (accent/error)", token: "--color-red", hex: "#D1312D" },
  ],
  Semantic: [
    { name: "Info", token: "--color-info", hex: "#274578" },
    { name: "Success", token: "--color-success", hex: "#22c55e" },
    { name: "Warning", token: "--color-warning", hex: "#E9A84C" },
    { name: "Danger", token: "--color-danger", hex: "#D1312D" },
  ],
  "MARK ONLY (never UI)": [
    { name: "Purple (mark arm)", token: "--color-purple", hex: "#655596" },
    { name: "Sage (mark)", token: "--color-sage", hex: "#72A574" },
  ],
} as const;

const typeScale: Array<[string, string]> = [
  ["2xs", "8.5px"], ["xs", "9.5px"], ["sm", "10.5px"], ["base", "12px"],
  ["md", "13px"], ["lg", "13.5px"], ["xl", "14px"], ["2xl", "16px"],
  ["3xl", "22px"], ["4xl", "28px"], ["5xl", "36px"], ["6xl", "48px"],
];

const spaceScale: Array<[string, string]> = [
  ["1", "4"], ["2", "6"], ["3", "8"], ["4", "10"], ["5", "12"], ["6", "14"],
  ["7", "16"], ["8", "18"], ["9", "20"], ["10", "22"], ["12", "24"],
  ["14", "28"], ["16", "32"], ["20", "40"], ["24", "48"],
];

const radii: Array<[string, string]> = [
  ["xs", "3px"], ["sm", "4px"], ["md", "7px"], ["lg", "8px"],
  ["xl", "10px"], ["2xl", "12px"], ["full", "999px"],
];

export default function StylePage() {
  return (
    <div className={styles.wrap}>
      {/* 1. Brand Identity */}
      <section className={styles.section}>
        <p className="eyebrow">01 · Brand Identity</p>
        <h1>Echo 1 Labs — Orbit v5 / 2k26 kit.</h1>
        <div className={styles.identityRow}>
          <div className={styles.wordmarkPanel}>
            <span className={styles.wordmarkEcho}>ECHO-1</span>
            <span className={styles.wordmarkLabs}>LABS</span>
          </div>
          <div className={styles.markPanel}>
            <img src="/orbit-mark-dark.svg" alt="Orbit Compass Mark (dark)" width={128} height={128} />
            <p className={styles.caption}>Compass Mark 2K26 v1 — copy SVG verbatim, never reconstruct.</p>
          </div>
        </div>

        {/* Canonical sizes: 128 app-icon, 64 toolbar, 32 favicon, 16 minimum */}
        <h3 className={styles.subhead}>Compass mark — canonical sizes</h3>
        <div className={styles.sizesRow}>
          {[128, 64, 32, 16].map((size) => (
            <div key={size} className={styles.sizeItem}>
              <div className={styles.sizeStage} style={{ minHeight: 148 }}>
                <img src="/orbit-mark-dark.svg" alt={`Compass mark ${size}px`} width={size} height={size} />
              </div>
              <span className={styles.sizeLabel}>{size}px</span>
              <span className={styles.sizeUse}>
                {size === 128 ? "app icon" : size === 64 ? "toolbar" : size === 32 ? "favicon" : "minimum"}
              </span>
            </div>
          ))}
        </div>

        <h3 className={styles.subhead}>Dark + light variants (same polygons)</h3>
        <div className={styles.variantsRow}>
          <div className={styles.variantDark}>
            <img src="/orbit-mark-dark.svg" alt="Orbit Compass Mark — dark theme fills" width={128} height={128} />
            <span className={styles.caption}>Dark theme (Void bg)</span>
          </div>
          <div className={styles.variantLight}>
            <img src="/orbit-mark-light.svg" alt="Orbit Compass Mark — light theme fills" width={128} height={128} />
            <span className={styles.caption}>Light theme (Orbit White bg)</span>
          </div>
        </div>

        <h3 className={styles.subhead}>Wordmark rule</h3>
        <div className={styles.wordmarkRule}>
          <div className={styles.wordmarkRuleDark}>
            <span className={styles.wruleEcho}>ECHO-1</span>{" "}
            <span className={styles.wruleLabs}>LABS</span>
            <p className={styles.caption}>On dark: ECHO-1 in Orbit White · LABS in Solar Orange.</p>
          </div>
          <div className={styles.wordmarkRuleLight}>
            <span className={styles.wruleEchoLight}>ECHO-1</span>{" "}
            <span className={styles.wruleLabs}>LABS</span>
            <p className={styles.captionOnLight}>On light: ECHO-1 in Void Black · LABS in Solar Orange.</p>
          </div>
        </div>

        <h3 className={styles.subhead}>Size + placement reference frames</h3>
        <p className={styles.helper}>
          Canonical size/spacing/area reference — the compass at multiple placements on one canvas. Copy verbatim from these when applying the mark in new contexts.
        </p>
        <div className={styles.referenceFrames}>
          {[1, 2, 3].map((n) => (
            <figure key={n} className={styles.referenceFrame}>
              <img
                src={`/compass-reference/${n}.svg`}
                alt={`Compass size reference sheet ${n}`}
                loading="lazy"
              />
              <figcaption className={styles.caption}>Reference frame {n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 2. Color System */}
      <section className={styles.section}>
        <p className="eyebrow">02 · Color System</p>
        <h2>Palette & semantic tokens.</h2>
        {Object.entries(swatches).map(([group, list]) => (
          <div key={group} className={styles.swatchGroup}>
            <h3 className={styles.groupHead}>{group}</h3>
            <div className={styles.swatches}>
              {list.map((s) => (
                <div key={s.name} className={styles.swatch}>
                  <span className={styles.chip} style={{ background: s.hex }} aria-hidden="true" />
                  <span className={styles.swatchName}>{s.name}</span>
                  <code className={styles.swatchToken}>{s.token}</code>
                  <code className={styles.swatchHex}>{s.hex}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 3. Card Modes — the signature move */}
      <section className={styles.section}>
        <p className="eyebrow">03 · Card Modes</p>
        <h2>Dark cards on light page. Light cards on dark page.</h2>
        <p className="lede">
          The signature composition move. Cards scope their own text tokens so
          descendants inherit the correct on-dark or on-light palette.
        </p>
        <div className={styles.cardModeRow}>
          <div className={styles.darkOnLight}>
            <span className={styles.caption}>Dark card on light page</span>
            <div className={styles.demoDarkCard}>
              <h4>Card heading</h4>
              <p>Body text inherits on-dark tokens automatically.</p>
              <a href="#" className="btn btn-primary">Primary CTA</a>
            </div>
          </div>
          <div className={styles.lightOnDark}>
            <span className={styles.captionOnDark}>Light card on dark page</span>
            <div className={styles.demoLightCard}>
              <h4>Card heading</h4>
              <p>Same component, inverted context.</p>
              <a href="#" className="btn btn-outline">Outline CTA</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Themes */}
      <section className={styles.section}>
        <p className="eyebrow">04 · Themes</p>
        <h2>Backgrounds — light default, dark toggle.</h2>
        <div className={styles.themeSwatches}>
          {[
            { name: "Void", hex: "#0A0A0E" },
            { name: "Depth", hex: "#111118" },
            { name: "Orbit White", hex: "#FFFFFF" },
            { name: "Surface 2", hex: "#F8F8FA" },
          ].map((t) => (
            <div key={t.name} className={styles.themeSwatch} style={{ background: t.hex }}>
              <span style={{ color: t.hex === "#FFFFFF" || t.hex === "#F8F8FA" ? "#0A0A0E" : "#FFFFFF" }}>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Typography */}
      <section className={styles.section}>
        <p className="eyebrow">05 · Typography</p>
        <h2>Space Grotesk (display) + DM Sans (body).</h2>
        <div className={styles.typeSample}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "-0.03em", fontWeight: 700, margin: 0 }}>
            Break free from business gravity.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>
            Body copy runs in DM Sans, 400/500 weights, generous line-height.
          </p>
        </div>
        <div className={styles.typeScale}>
          {typeScale.map(([k, v]) => (
            <div key={k} className={styles.typeScaleRow}>
              <code>--font-size-{k}</code>
              <span style={{ fontSize: v }}>Aa · {v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Spacing */}
      <section className={styles.section}>
        <p className="eyebrow">06 · Spacing</p>
        <h2>4px base scale.</h2>
        <div className={styles.spaceScale}>
          {spaceScale.map(([k, v]) => (
            <div key={k} className={styles.spaceRow}>
              <code>--space-{k}</code>
              <span className={styles.spaceBar} style={{ width: `${v}px` }} />
              <span>{v}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Radius */}
      <section className={styles.section}>
        <p className="eyebrow">07 · Radius</p>
        <h2>Corner tokens.</h2>
        <div className={styles.radiiRow}>
          {radii.map(([k, v]) => (
            <div key={k} className={styles.radiusItem}>
              <div className={styles.radiusBox} style={{ borderRadius: v }} />
              <code>--radius-{k}</code>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Components */}
      <section className={styles.section}>
        <p className="eyebrow">08 · Components</p>
        <h2>Buttons, badges, KPI card.</h2>
        <div className={styles.componentsRow}>
          <div className={styles.componentGroup}>
            <span className={styles.caption}>Buttons</span>
            <div className={styles.btnRow}>
              <a href="#" className="btn btn-primary">Primary</a>
              <a href="#" className="btn btn-outline">Outline</a>
              <a href="#" className="btn btn-ghost">Ghost</a>
            </div>
          </div>
          <div className={styles.componentGroup}>
            <span className={styles.caption}>Status Badges</span>
            <div className={styles.badgeRow}>
              <span className={`${styles.badge} ${styles.badgeInReview}`}>In Review · 78%</span>
              <span className={`${styles.badge} ${styles.badgeApproved}`}>Approved · 94%</span>
              <span className={`${styles.badge} ${styles.badgePending}`}>Pending · 42%</span>
            </div>
          </div>
        </div>
        <div className={styles.kpiRow}>
          <div className={styles.kpi}>
            <span className={styles.kpiLabel}>Active Projects</span>
            <span className={styles.kpiValue}>18</span>
            <span className={styles.kpiDelta}>+3 QoQ</span>
          </div>
          <div className={styles.kpi}>
            <span className={styles.kpiLabel}>Avg Confidence</span>
            <span className={styles.kpiValue}>81%</span>
            <span className={styles.kpiDelta}>on target</span>
          </div>
          <div className={styles.kpi}>
            <span className={styles.kpiLabel}>Risk Alerts</span>
            <span className={styles.kpiValue}>2</span>
            <span className={styles.kpiDeltaWarn}>needs review</span>
          </div>
        </div>
      </section>

      {/* 9. CSS Tokens reference */}
      <section className={styles.section}>
        <p className="eyebrow">09 · CSS Tokens</p>
        <h2>Canonical source of truth.</h2>
        <p className="lede">
          All tokens live in <code>tokens-v5.css</code>, verbatim from{" "}
          <code>e1_orbit_design_kit_v4.css</code> (locked 2026-07-08). Reference
          the file directly — nothing here should override the canonical values.
        </p>
      </section>
    </div>
  );
}
