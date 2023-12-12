import { test, expect } from "@playwright/test";

import fs from "fs";
import path from "path";
// import { test, expect, type Page } from '@playwright/test';

const data = fs.readFileSync(path.join(__dirname, "booking-test.json"), "utf8");
let testData = JSON.parse(data.toString());

// TESTS HERE
test.beforeEach(async ({ page }) => {
    //1. (ARRANGE) GOTO Restful Booker main page
    await page.goto("https://booker.govza.com/");
});

// A CYCLE BEGINS HERE FOR testData

testData.forEach((element) => {
  test("email input value", async ({ page }) => {
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
});
