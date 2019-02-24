export interface StopwatchDisplay {
  global: Stopwatch;
  current: Stopwatch;
}

export interface Stopwatch {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}
