import { test, expect } from '@playwright/test';

test('carga recursos iniciales', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontCgm');

  await page.waitForTimeout(2000);
  await page.click('button:has-text("Cargar recursos")');

  const mensajeExito = page.locator('.alert');
  await expect(mensajeExito).toHaveText(' Recurso/s cargado/s correctamente');
});


  
// test('borra un recurso', async ({ page }) => {
//   await page.goto('https://sos2223-22.appspot.com/frontCgm');

//   await page.waitForTimeout(2000);
//   await page.click('button:has-text("Borrar"):only-child');
//  // const button = await page.$('button:has-text("Borrar"):only-child');

//   const mensajeExito = page.locator('#messages');
//   await expect(mensajeExito).toHaveText('borrado correctamente');
// });

test('borra todos los recursos', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontCgm');

  await page.waitForTimeout(2000);
  await page.click('button:has-text("Borrar recursos")');
  await page.click('button:has-text("Eliminar")');

  const mensajeExito = page.locator('.alert');
  await expect(mensajeExito).toHaveText('Recursos borrados correctamente');
});