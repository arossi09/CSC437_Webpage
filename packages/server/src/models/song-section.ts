export interface SongSection{
	type: SectionType;
	lyrics: string;
}

export type SectionType=
	| "intro"
  | "verse"
  | "prechorus"
  | "chorus"
  | "bridge"
  | "solo"
  | "outro"
  | "other";
