/**
 * Learned snap point for a resized edge.
 *
 * Adapted from "Snappy resizable panels" by Harsh Sharma (November 2026):
 * https://imharsh.in/snappy-resizable-panels
 *
 * The algorithm and tuning defaults (spread, half-life, min weight, snap zone,
 * correction window, keep count) are ported from that article for the sidebar.
 * This is a standalone port, not the article's `useSnapPoint` / `favourite`
 * source files.
 *
 * Each let-go is a sample. Newer samples count more, and samples that land
 * near each other pile into a hill. The snap point is the top of the tallest
 * hill, and it only exists once that hill is tall enough. It then stays put
 * until the tallest hill moves outside its snap zone.
 *
 * The drag step holds the edge on that point. A pause inside the zone lets
 * the snap go so the widths next to it can still be reached.
 */

export type Sample = { width: number; at: number };

export type Tuning = {
  /** How wide one sample's bell is. Let-gos within about this much agree. */
  spread: number;
  /** After this many newer let-gos, a sample counts half as much. */
  halfLife: number;
  /** Weight a hill needs before it becomes a snap point. */
  minWeight: number;
  /** Distance from the snap point where the edge holds. */
  snap: number;
  /** A let-go this soon after the last one corrects it instead of adding a vote. */
  correctionMs: number;
  /** How many let-gos to keep. */
  keep: number;
};

/** Pixel defaults from the "snappy-panels" tuning (Harsh Sharma). */
export const DEFAULTS: Tuning = {
  spread: 8,
  halfLife: 5,
  minWeight: 2.5,
  snap: 10,
  correctionMs: 2000,
  keep: 40,
};

export type DragState = {
  holding: boolean;
  free: { from: number } | null;
  still: number;
  edge: number;
};

export type DragStep = DragState & {
  hand: number;
  dwell: "clear" | "restart" | "keep";
};

export type StoredSnap = {
  width: number | null;
  samples: Sample[];
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** The newest sample weighs 1. Each older one halves every `halfLife` samples. */
export function weights(samples: Sample[], halfLife: number) {
  const count = samples.length;
  return samples.map((_, index) => 0.5 ** ((count - 1 - index) / halfLife));
}

/** Summed bells at `width`. */
export function density(
  samples: Sample[],
  sampleWeights: number[],
  width: number,
  spread: number
) {
  let sum = 0;
  for (let index = 0; index < samples.length; index += 1) {
    const distance = width - samples[index].width;
    sum +=
      sampleWeights[index] *
      Math.exp(-(distance * distance) / (2 * spread * spread));
  }
  return sum;
}

function support(
  samples: Sample[],
  sampleWeights: number[],
  width: number,
  spread: number
) {
  return samples.reduce(
    (total, sample, index) =>
      Math.abs(sample.width - width) <= 2 * spread
        ? total + sampleWeights[index]
        : total,
    0
  );
}

function peak(samples: Sample[], tuning: Tuning) {
  const sampleWeights = weights(samples, tuning.halfLife);
  const from = Math.floor(Math.min(...samples.map((sample) => sample.width)));
  const to = Math.ceil(Math.max(...samples.map((sample) => sample.width)));
  let best = from;
  let top = -1;
  for (let width = from; width <= to; width += 1) {
    const value = density(samples, sampleWeights, width, tuning.spread);
    if (value > top) {
      top = value;
      best = width;
    }
  }
  return {
    width: best,
    support: support(samples, sampleWeights, best, tuning.spread),
  };
}

/**
 * The snap point, or null while no hill is tall enough.
 * Replays the history so the same samples always resolve to the same point.
 */
export function favourite(samples: Sample[], tuning: Tuning = DEFAULTS) {
  let current: { width: number; support: number } | null = null;
  for (let count = 1; count <= samples.length; count += 1) {
    const seen = samples.slice(0, count);
    const next = peak(seen, tuning);
    if (next.support < tuning.minWeight) {
      current = null;
    } else if (current && Math.abs(next.width - current.width) <= tuning.snap) {
      current = {
        width: current.width,
        support: support(
          seen,
          weights(seen, tuning.halfLife),
          current.width,
          tuning.spread
        ),
      };
    } else {
      current = next;
    }
  }
  return current;
}

/** Replaces the last sample when it was a quick correction. Otherwise appends. */
export function record(
  samples: Sample[],
  width: number,
  at: number,
  tuning: Tuning = DEFAULTS
) {
  const last = samples[samples.length - 1];
  const corrected = last !== undefined && at - last.at < tuning.correctionMs;
  const next = corrected
    ? [...samples.slice(0, -1), { width, at }]
    : [...samples, { width, at }];
  return next.slice(-tuning.keep);
}

/**
 * One pointer move.
 * `hand` is where the pointer would put the edge. While the snap holds, the
 * edge stays on the point. After a dwell release, the edge follows the hand
 * from that point without jumping to the cursor.
 */
export function stepDrag(
  state: DragState,
  rawHand: number,
  point: number | null,
  snap: number,
  min: number,
  max: number
): DragStep {
  const hand = clamp(rawHand, min, max);

  if (state.free && point != null) {
    return {
      holding: false,
      free: state.free,
      still: state.still,
      edge: clamp(point + (hand - state.free.from), min, max),
      hand,
      dwell: "clear",
    };
  }

  const inZone = point != null && Math.abs(hand - point) <= snap;
  if (!inZone || point == null) {
    return {
      holding: false,
      free: null,
      still: hand,
      edge: hand,
      hand,
      dwell: "clear",
    };
  }

  const moved = !state.holding || Math.abs(hand - state.still) > snap / 6;
  return {
    holding: true,
    free: null,
    still: moved ? hand : state.still,
    edge: clamp(point, min, max),
    hand,
    dwell: moved ? "restart" : "keep",
  };
}

export function releaseSnap(state: DragState, hand: number): DragState {
  return { ...state, holding: false, free: { from: hand } };
}

function isSample(value: unknown): value is Sample {
  if (typeof value !== "object" || value == null) return false;
  const sample = value as { width?: unknown; at?: unknown };
  return (
    typeof sample.width === "number" &&
    Number.isFinite(sample.width) &&
    typeof sample.at === "number" &&
    Number.isFinite(sample.at)
  );
}

export function parseStoredSnap(raw: string | null): StoredSnap | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as { width?: unknown; samples?: unknown };
    const samples = Array.isArray(value.samples)
      ? value.samples.filter(isSample).slice(-DEFAULTS.keep)
      : [];
    const width =
      typeof value.width === "number" && Number.isFinite(value.width)
        ? value.width
        : null;
    if (width == null && samples.length === 0) return null;
    return { width, samples };
  } catch {
    return null;
  }
}
