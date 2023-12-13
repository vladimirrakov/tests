import { test, expect } from "@playwright/test";

const emails = [  "name@email.com", "nameemail.com", "name@@email.com"];



// See https://playwright.dev/docs/test-parameterize
for (const email of emails) {
  test(`testing with ${email}`, async ({ page }) => {
    //1. (ARRANGE) Go to Restful Booker main page
    await page.goto("https://booker.govza.com/");

    // 2. (ACT) Make a booking with test data
    await page.getByRole("button", { name: "Book this room" }).click();
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill(email);
    await page.getByRole("button", { name: "Book" }).click();

    // 3. (ASSERT) Assert that the error is showed
    await expect(page.locator("#root")).toContainText(
      "must be a well-formed email address"
    );
  });
}