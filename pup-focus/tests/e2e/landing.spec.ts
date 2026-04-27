import { test, expect } from "@playwright/test";

test("landing page shows project title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "PUP FOCUS" })).toBeVisible();
});
