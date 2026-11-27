import {
  IGNITION_DEMO_TEL,
  IGNITION_DEMO_TEL_DISPLAY,
  IGNITION_IMG,
  SAMPLE_LABEL,
  VOICE_HEADLINE,
  VOICE_LINES,
  VOICE_PHONE_CAPTIONS,
} from '@/lib/ignition';
import s from './Ignition.module.css';

/* The two phone screens from the Ignition teaser (sample data) beside the voice agent capabilities:
   intake, compliance, dispatch and 24/7 coverage (Josh, 2026-11-27). Used on the home page, the voice agents page,
   the Ignition page and the spill use case. Copy lives in lib/ignition.ts. */
export default function VoiceProof({
  eyebrow = 'Voice agents · Every stage',
  headingId = 'voice-proof',
  as: H = 'h2',
}: {
  eyebrow?: string;
  headingId?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className={s.voice}>
      <div className={s.phones}>
        <figure className={s.phone}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IGNITION_IMG.pumper.src} alt={IGNITION_IMG.pumper.alt} width={IGNITION_IMG.pumper.width} height={IGNITION_IMG.pumper.height} loading="lazy" decoding="async" />
          <figcaption>
            <b>Pumper</b>
            {VOICE_PHONE_CAPTIONS.pumper.replace(/^Pumper: /, '')}
          </figcaption>
        </figure>
        <figure className={s.phone}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IGNITION_IMG.onCall.src} alt={IGNITION_IMG.onCall.alt} width={IGNITION_IMG.onCall.width} height={IGNITION_IMG.onCall.height} loading="lazy" decoding="async" />
          <figcaption>
            <b>On-call</b>
            {VOICE_PHONE_CAPTIONS.onCall.replace(/^On-call: /, '')}
          </figcaption>
        </figure>
      </div>
      <div>
        <p className={s.eyebrow}>{eyebrow}</p>
        <H id={headingId} className={s.h2}>
          {VOICE_HEADLINE}
        </H>
        <ul className={s.vlist}>
          {VOICE_LINES.map((v) => (
            <li key={v.title}>
              <b>{v.title}</b>
              <span>{v.text}</span>
            </li>
          ))}
        </ul>
        <div className={s.ctas}>
          <a className={s.btn} href={`tel:${IGNITION_DEMO_TEL}`}>
            Call the demo dispatch agent · {IGNITION_DEMO_TEL_DISPLAY}
          </a>
        </div>
        <p className={s.meta}>{SAMPLE_LABEL}. The voice agent never claims to be a person.</p>
      </div>
    </div>
  );
}
