import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";

import { Rating } from "./rating";

afterEach(cleanup);

const radio = (name: string) => screen.getByRole("radio", { name });

test("renders five stars with the default score checked", () => {
  render(<Rating aria-label="Rating" defaultValue={3} />);

  expect(screen.getByRole("radiogroup", { name: "Rating" })).toBeTruthy();
  expect(screen.getAllByRole("radio")).toHaveLength(5);
  expect(radio("3 stars").getAttribute("aria-checked")).toBe("true");
});

test("arrow keys move between stars and choose a rating", async () => {
  const user = userEvent.setup();
  const values: (number | null)[] = [];

  render(
    <Rating
      aria-label="Rating"
      defaultValue={2}
      onValueChange={(value) => values.push(value)}
    />
  );

  const second = radio("2 stars");
  const third = radio("3 stars");

  await user.tab();
  expect(document.activeElement).toBe(second);

  await user.keyboard("{ArrowRight}");
  expect(document.activeElement).toBe(third);
  expect(third.getAttribute("aria-checked")).toBe("true");
  expect(values.at(-1)).toBe(3);

  await user.keyboard("{ArrowLeft}");
  expect(document.activeElement).toBe(second);
  expect(second.getAttribute("aria-checked")).toBe("true");
  expect(values.at(-1)).toBe(2);
});

test("arrow keys stop at the ends by default", async () => {
  const user = userEvent.setup();
  const values: (number | null)[] = [];

  render(
    <Rating
      aria-label="Rating"
      defaultValue={5}
      onValueChange={(value) => values.push(value)}
    />
  );

  await user.tab();
  expect(document.activeElement).toBe(radio("5 stars"));

  await user.keyboard("{ArrowRight}");
  expect(document.activeElement).toBe(radio("5 stars"));
  expect(values).toHaveLength(0);
});

test("loop wraps from the last star to the first", async () => {
  const user = userEvent.setup();
  const values: (number | null)[] = [];

  render(
    <Rating
      aria-label="Rating"
      defaultValue={5}
      loop
      onValueChange={(value) => values.push(value)}
    />
  );

  await user.tab();
  await user.keyboard("{ArrowRight}");

  expect(document.activeElement).toBe(radio("1 star"));
  expect(radio("1 star").getAttribute("aria-checked")).toBe("true");
  expect(values.at(-1)).toBe(1);
});

test("clicking a star chooses that rating", async () => {
  const user = userEvent.setup();

  render(<Rating aria-label="Rating" />);

  await user.click(radio("4 stars"));

  expect(radio("4 stars").getAttribute("aria-checked")).toBe("true");
});

test("filled stars follow the chosen rating", async () => {
  const user = userEvent.setup();

  const { container } = render(<Rating aria-label="Rating" defaultValue={3} />);

  const filled = () =>
    container.querySelectorAll('[data-slot="rating-item"][data-filled]');

  expect(filled()).toHaveLength(3);

  await user.click(radio("5 stars"));
  expect(filled()).toHaveLength(5);
});
