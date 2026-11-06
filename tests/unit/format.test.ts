import { describe, expect, it } from "vitest";
import { formatDate, ageFromDob } from "../../src/utils/format";
describe("format utilities", () => {
  it("formats date as day/month/year", () => expect(formatDate("2026-11-06")).toBe("06/11/2026"));
  it("returns empty age when DOB is missing", () => expect(ageFromDob("")).toBe(""));
});
