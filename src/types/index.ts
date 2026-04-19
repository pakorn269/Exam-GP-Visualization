export interface Example {
  q: string;
  seq: (number | string)[];
  ops?: string[];
  ans: number | string;
  steps: string[];
  tableHtml?: string;
}

export interface Lesson {
  id: string;
  ico: string;
  tt: string;
  sub: string;
  diff: 1 | 2 | 3;
  desc: string;
  seq: (number | string)[];
  dlbl: string;
  ans: number | string;
  vt: 'ar' | 'geo' | 'sq' | 'tri' | 'fib' | 'dif' | 'math' | 'sym' | 'svg_layer';
  svgConfig?: {
    viewBox: string;
    layers: {
      id: string;
      content: string;
      animation: 'fade-in' | 'draw-line' | 'pop' | 'slide-up' | 'none';
      delayMs: number;
    }[];
  };
  def: string;
  rule: string;
  fm: string;
  tip: string;
  exs: Example[];
}

export interface PracticeQuestion {
  q: string;
  seq: (number | string)[];
  ans: number | string;
  hint: string;
  sol: string;
  tableHtml?: string;
}

export interface ExamQuestion {
  tp: string;
  instr?: string;
  seq: (number | string)[];
  ans: number | string;
  opts: (number | string)[];
  expl: string;
  tip: string;
  tableHtml?: string;
}

export interface Topic {
  id: string;
  ico: string;
  title: string;
  subtitle: string;
  color: string;
  desc: string;
  tag: string;
  tagStyle: string;
  lessons: Lesson[];
  practice: PracticeQuestion[];
  exam: ExamQuestion[];
}

export interface ExamState {
  idx: number;
  correct: number;
  wrong: number;
  answered: boolean;
  startTime: number;
  elapsed: number;
}
