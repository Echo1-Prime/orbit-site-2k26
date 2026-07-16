// Shared contract for Orbit's agent avatar so flame / sun / nebula variants are
// interchangeable at every call-site (Hero + Concierge).
export type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'reveal';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';

export interface AvatarProps {
  state?: AvatarState;
  size?: AvatarSize;
  /** 0..1 live TTS amplitude — drives glow/flare intensity. */
  level?: number;
  reduced?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const AVATAR_SIZE_PX: Record<AvatarSize, number> = {
  xs: 24, sm: 44, md: 64, lg: 96, xl: 140, hero: 240,
};
