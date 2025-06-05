export type Language = "English" | "Russian";
export type Mode = "time" | "words" | "quote" | "zen";

export interface TestOptions {
  language: Language;
  mode: Mode;
  duration: 15 | 30 | 60;
}
