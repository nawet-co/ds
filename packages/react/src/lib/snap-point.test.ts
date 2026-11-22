import { expect, test } from "vitest";

import {
  DEFAULTS,
  favourite,
  parseStoredSnap,
  record,
  releaseSnap,
  stepDrag,
  type DragState,
} from "./snap-point";

const at = (width: number, index: number) => ({ width, at: index * 10_000 });

test("stays unset until recent let-gos agree", () => {
  expect(favourite([at(256, 0)])).toBeNull();
  expect(favourite([at(256, 0), at(400, 1)])).toBeNull();

  const point = favourite([at(256, 0), at(258, 1), at(260, 2)]);
  expect(point).not.toBeNull();
  expect(point!.width).toBeGreaterThanOrEqual(256);
  expect(point!.width).toBeLessThanOrEqual(260);
  expect(point!.support).toBeGreaterThanOrEqual(DEFAULTS.minWeight);
});

test("keeps the snap point until the tallest hill leaves the zone", () => {
  const agreed = [0, 1, 2, 3, 4, 5].map((index) => at(300, index));
  expect(favourite(agreed)?.width).toBe(300);

  const nearby = favourite([...agreed, at(308, 6)]);
  expect(nearby?.width).toBe(300);

  const moved = favourite([
    ...agreed,
    ...[7, 8, 9, 10, 11, 12].map((index) => at(420, index)),
  ]);
  expect(moved?.width).toBeGreaterThanOrEqual(416);
  expect(moved?.width).toBeLessThanOrEqual(424);
});

test("treats a quick follow-up let-go as a correction", () => {
  const first = record([], 240, 1_000);
  const corrected = record(first, 248, 1_000 + DEFAULTS.correctionMs - 1);
  expect(corrected).toEqual([{ width: 248, at: 2_999 }]);

  const appended = record(corrected, 260, 2_999 + DEFAULTS.correctionMs);
  expect(appended.map((sample) => sample.width)).toEqual([248, 260]);
});

test("drops samples older than the keep window", () => {
  let samples = [] as ReturnType<typeof record>;
  for (let index = 0; index < DEFAULTS.keep + 5; index += 1) {
    samples = record(samples, 200 + index, index * DEFAULTS.correctionMs);
  }
  expect(samples).toHaveLength(DEFAULTS.keep);
  expect(samples[0]?.width).toBe(205);
  expect(samples.at(-1)?.width).toBe(200 + DEFAULTS.keep + 4);
});

test("holds the edge on the snap point and lets a pause release it", () => {
  const idle: DragState = { holding: false, free: null, still: 0, edge: 256 };
  const held = stepDrag(idle, 258, 256, DEFAULTS.snap, 192, 512);
  expect(held.edge).toBe(256);
  expect(held.holding).toBe(true);
  expect(held.dwell).toBe("restart");

  const resting = stepDrag(held, 259, 256, DEFAULTS.snap, 192, 512);
  expect(resting.edge).toBe(256);
  expect(resting.dwell).toBe("keep");

  const released = releaseSnap(held, held.hand);
  const fine = stepDrag(released, held.hand + 5, 256, DEFAULTS.snap, 192, 512);
  expect(fine.edge).toBe(261);
  expect(fine.holding).toBe(false);

  const outside = stepDrag(held, 270, 256, DEFAULTS.snap, 192, 512);
  expect(outside.edge).toBe(270);
  expect(outside.dwell).toBe("clear");
  expect(outside.free).toBeNull();
});

test("ignores a stored history that is not usable", () => {
  expect(parseStoredSnap(null)).toBeNull();
  expect(parseStoredSnap("not-json")).toBeNull();
  expect(parseStoredSnap('{"samples":[{"width":"no","at":1}]}')).toBeNull();
  expect(
    parseStoredSnap(
      '{"width":280,"samples":[{"width":280,"at":5},{"width":null}]}'
    )
  ).toEqual({
    width: 280,
    samples: [{ width: 280, at: 5 }],
  });
});
