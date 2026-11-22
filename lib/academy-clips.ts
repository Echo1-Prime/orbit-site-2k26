// Clip ids look like D01 or T15. The private blob path is derived from the id only
// after it matches this pattern, so a request can never choose an arbitrary path.
export const CLIP_ID = /^[DT]\d{2}$/;
export const clipPath = (id: string) => `academy/videos/${id}.mp4`;
