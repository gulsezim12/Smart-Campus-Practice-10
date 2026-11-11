
import { describe, expect, it } from "vitest";
import { checkAvailability } from "./availability";

describe("checkAvailability regression tests", () => {
  const base = {
    now: 540,
    blocked: false,
    existing: [{ start: 600, end: 660 }],
  };

  it("rejects an overlapping booking", () => {
    const result = checkAvailability({
      ...base,
      candidateStart: 630,
      candidateEnd: 690,
    });
    expect(result.status).toBe("unavailable");
  });

  it("allows touching endpoints", () => {
    const result = checkAvailability({
      ...base,
      candidateStart: 660,
      candidateEnd: 720,
    });
    expect(result.status).toBe("available");
  });

  it("rejects a blocked room", () => {
    const result = checkAvailability({
      ...base,
      blocked: true,
      candidateStart: 660,
      candidateEnd: 720,
    });
    expect(result.status).toBe("unavailable");
  });
});
