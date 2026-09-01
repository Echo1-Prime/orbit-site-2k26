'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './ProductHeroMedia.module.css';

/**
 * Product-page hero media: an autoplaying, muted, looping demo video with the
 * product's poster as the pre-load / reduced-motion still. Reduced motion shows
 * the poster only (no video). Poster URLs are the designed per-product frames.
 */
export default function ProductHeroMedia({
  video,
  poster,
  alt,
}: {
  video: string;
  poster: string;
  alt: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={styles.frame}>
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.media} src={poster} alt={alt} loading="lazy" />
      ) : (
        <video
          className={styles.media}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt}
        />
      )}
    </div>
  );
}
