import { test, expect } from '@playwright/test';

/*
Use the same object to enter all my equivalence class test data values to be tested.
Each EC will take a line in the object. The first element in an 
*/

const MOCK_DATA = [
  { "Firstname": "Ermin", "Lastname": "Schruyers", "Email": "eschruyers0@privacy.gov.au", "Phone": "787-902-8661" },
  { "Firstname": "Hank", "Lastname": "Rayne", "Email": "hrayne1@howstuffworks.com", "Phone": "374-142-8024" },
  { "Firstname": "Luis", "Lastname": "Lias", "Email": "llias2@admin.ch", "Phone": "345-118-6423" },
  { "Firstname": "Britteny", "Lastname": "Learmonth", "Email": "blearmonth3@shareasale.com", "Phone": "148-401-9249" },
  { "Firstname": "Simona", "Lastname": "Grigor", "Email": "sgrigor4@archive.org", "Phone": "715-362-7356" },
  { "Firstname": "Seumas", "Lastname": "Biesty", "Email": "sbiesty5@apache.org", "Phone": "332-503-2782" },
  { "Firstname": "Amara", "Lastname": "Woodnutt", "Email": "awoodnutt6@liveinternet.ru", "Phone": "855-315-1287" },
  { "Firstname": "Arline", "Lastname": "Plastow", "Email": "aplastow7@e-recht24.de", "Phone": "937-446-3244" },
  { "Firstname": "Shelba", "Lastname": "Linacre", "Email": "slinacre8@eepurl.com", "Phone": "559-409-6903" },
  { "Firstname": "Katya", "Lastname": "Elsegood", "Email": "kelse@good9hp.com", "Phone": "706-357-6844" }
];

for (const [index, user] of MOCK_DATA.entries()) {
  test(`testing with ${index + 1}`, async ({ page }) => {
    await page.goto('https://booker.govza.com/');

    await page.getByRole('button', { name: 'Let me hack!' }).click();
    await page.getByRole('button', { name: 'Book this room' }).click();
    await page.getByPlaceholder('Firstname').click();
    await page.getByPlaceholder('Firstname').fill(user.Firstname);
    await page.getByPlaceholder('Lastname').click();
    await page.getByPlaceholder('Lastname').fill(user.Lastname);
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill(user.Email);
    await page.locator('input[name="phone"]').click();
    await page.locator('input[name="phone"]').fill(user.Phone);
    await page.getByRole('button', { name: 'Book' }).click();

    // Checking the form that there all fields are filled out
    // If the test data has invalid values, there will be NO test error shown in VSC
    await expect(page.locator('#root')).toContainText('must not be null');
  });
}