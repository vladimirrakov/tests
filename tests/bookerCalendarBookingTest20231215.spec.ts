import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("https://booker.govza.com/");
});

test.afterEach(async ({ page }, testInfo) => {
  await page.goto("https://booker.govza.com/#/admin/room/1");
  await page.getByTestId("username").click();
  await page.getByTestId("username").fill("admin");
  await page.getByTestId("username").press("Tab");
  await page.getByTestId("password").fill("password");
  await page.getByTestId("password").press("Enter");
  await page.getByTestId("submit").click();
  await page.locator("span:nth-child(2)").first().click();
});

test("test", async ({ page }) => {
  await page.getByRole("button", { name: "Let me hack!" }).click();
  await page.getByRole("button", { name: "Book this room" }).click();
  await page.getByText("CancelBook").click();
  await page.getByPlaceholder("Firstname").click();
  await page.getByPlaceholder("Firstname").fill("john");
  await page.getByPlaceholder("Firstname").press("Tab");
  await page.getByPlaceholder("Lastname").fill("doe");
  await page.getByPlaceholder("Lastname").press("Tab");
  await page.locator('input[name="email"]').fill("foo@bar.com");
  await page.locator('input[name="email"]').press("Tab");
  await page.locator('input[name="phone"]').fill("2343453453345345");
  await page.locator('input[name="phone"]').press("Tab");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();

  // await page.locator('.rbc-row-bg > div:nth-child(7)').first().click();

  const startCell = page.getByText("01", { exact: true }).first();
  await startCell.hover();
  await page.mouse.down();

  await page.mouse.move(0, 0);

  const endCell = page.getByText("02", { exact: true }).first();
  await endCell.hover();
  await page.mouse.up();

  await page.getByRole("button", { name: "Book" }).click();
  await expect(page.getByRole("heading").first()).toContainText(
    "Booking Successful!"
  );
  // await page.getByLabel('onRequestClose Example').click();
});
