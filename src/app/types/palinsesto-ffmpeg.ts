
// src/app/types/palinsesto-ffmpeg.ts
export interface OnAirItem {
  vod: string;
  title: string;
  startAt: string;
  endAt?: string;
}

export interface OnAirResponse {
  current: OnAirItem | null;
  next: OnAirItem | null;
}

export interface FfmpegVodItem {
  id: string;
  title: string;
  filename: string;
  durationMs: number;
}

export interface FfmpegScheduleItem {
  videoId: string;
  title: string;
  filename: string;
  order: number;
  startAt?: string;
  endAt?: string;

  durationMs: number;
}

