'use client';

import Atom from './Atom';
import type { AvatarProps } from './types';

export const ORBIT_VARIANT = 'atom' as const;

export default function OrbitAvatar(props: AvatarProps) {
  return <Atom {...props} />;
}

export type { AvatarState, AvatarSize } from './types';
