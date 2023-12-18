/*
The following INVALID email address entries
of the equivalence class EC4 are tested:
  admin@softwaretestingo.admin..com
  .admin@softwaretestingo.com
  admin.@softwaretestingo.com
  admin@softwaretestingo..com
  admin@.softwaretestingo.com
  admin@softwaretestingo.com.

The test checks if an error message 
"must be a well-formed email address"
is displayed.
*/

import { test, expect } from "@playwright/test";

const MOCK_DATA = [
  {
    Firstname: "Katya",
    Lastname: "Elsegood",
    Phone: "706-357-6844",
    Email: "admin@softwaretestingo.admin..com",
  },
  {
    Firstname: "Katya",
    Lastname: "Elsegood",
    Phone: "706-357-6844",
    Email: ".admin@softwaretestingo.com",
  },
  {
    Firstname: "Katya",
    Lastname: "Elsegood",
    Phone: "706-357-6844",
    Email: "admin.@softwaretestingo.com",
  },
  {
    Firstname: "Katya",
    Lastname: "Elsegood",
    Phone: "706-357-6844",
    Email: "admin@softwaretestingo..com",
  },
  {
    Firstname: "Katya",
    Lastname: "Elsegood",
    Phone: "706-357-6844",
    Email: "admin@.softwaretestingo.com",
  },
  {
    Firstname: "Katya",
    Lastname: "Elsegood",
    Phone: "706-357-6844",
    Email: "admin@softwaretestingo.com.",
  },
];

for (const [index, user] of MOCK_DATA.entries()) {
  test(`testing with ${index + 1}`, async ({ page }) => {
    await page.goto("https://booker.govza.com/");

    await page.getByRole("button", { name: "Let me hack!" }).click();
    await page.getByRole("button", { name: "Book this room" }).click();
    await page.getByPlaceholder("Firstname").click();
    await page.getByPlaceholder("Firstname").fill(user.Firstname);
    await page.getByPlaceholder("Lastname").click();
    await page.getByPlaceholder("Lastname").fill(user.Lastname);
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill(user.Email);
    await page.locator('input[name="phone"]').click();
    await page.locator('input[name="phone"]').fill(user.Phone);
    await page.getByRole("button", { name: "Book" }).click();

    await expect(page.locator("#root")).toContainText(
      "must be a well-formed email address"
    );
  });
}
