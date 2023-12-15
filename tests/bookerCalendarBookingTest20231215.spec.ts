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
  var Firstname =  page.getByPlaceholder("Firstname");
  var Lastname =  page.getByPlaceholder("Lastname");
  var email = page.locator('input[name="email"]');

  await page.getByRole("button", { name: "Let me hack!" }).click();
  await page.getByRole("button", { name: "Book this room" }).click();
  await page.getByText("CancelBook").click();
  await Firstname.click();
  await Firstname.fill("john");
  await Firstname.press("Tab");
  await Lastname.fill("doe");
  await Lastname.press("Tab");
  await email.fill("foo@bar.com");
  await email.press("Tab");
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
