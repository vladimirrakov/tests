import { test, expect } from "@playwright/test";

test("phone input value", async ({ page }) => {
  //1. (ARRANGE) GOTO Restful Booker main page
  await page.goto("https://booker.govza.com/");

  // 2. (ACT) Make a booking with some invalid fields
  await page.getByRole("button", { name: "Book this room" }).click();
  await page.locator('input[name="phone"]').click();
  await page.locator('input[name="phone"]').fill("123");
  await page.getByRole("button", { name: "Book" }).click();

  // 3. (ASSERT) Assert that the error is showed
  await expect(page.locator("#root")).toContainText(
    "size must be between 11 and 21"
  );
});
