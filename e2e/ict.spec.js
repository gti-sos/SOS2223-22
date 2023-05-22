import { test, expect } from '@playwright/test';

test('carga recursos iniciales', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontCgm');

  await page.waitForTimeout(2000);
  await page.click('button:has-text("Cargar recursos")');

  const mensajeExito = page.locator('.alert');
  await expect(mensajeExito).toHaveText(' Recurso/s cargado/s correctamente');
});

// test('realiza una búsqueda', async ({ page }) => {
//   await page.goto('https://sos2223-22.appspot.com/frontCgm');
//   await page.click('button:has-text("Buscar recursos")');
//   await page.waitForTimeout(2000);
//   await page.fill('input[placeholder=" Territorio"]', '');
//   await page.fill('input[placeholder="Año"]', '2002221');
//   await page.fill('input[placeholder="industria de fabricación de TIC"]', '');
//   await page.fill('input[placeholder="Comercio al por mayor"]', '');
//   await page.fill('input[placeholder="Programa de computadora de edición"]', '');

//   await page.click('button:has-text(" Buscar")');
//   const pageContent = await page.textContent('body');
//   // Verificar que el mensaje no esté presente en el contenido de la página
//   await expect(pageContent).not.toContain('No existen datos para mostrar');
// });



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
