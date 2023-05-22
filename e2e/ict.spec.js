import { test, expect } from '@playwright/test';

test('carga recursos iniciales', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontCgm');

  
  await page.click('button:has-text("Cargar recursos")');
  await page.waitForTimeout(2000);
  const mensajeExito = page.locator('.alert');
  await expect(mensajeExito).toHaveText(' Recurso/s cargado/s correctamente');
});

test('realiza una búsqueda', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontCgm');
  await page.click('button:has-text(" Buscar recursos")');

  await page.fill('input[placeholder=" Territorio"]', '');
  await page.fill('input[placeholder="Año"]', '2021');
  await page.fill('input[placeholder="industria de fabricación de TIC"]', '');
  await page.fill('input[placeholder="Comercio al por mayor"]', '');
  await page.fill('input[placeholder="Programa de computadora de edición"]', '');

  await page.click('button:has-text(" Búsqueda")');
  await page.waitForTimeout(2000);

  const mensajeExito = await page.$('td'); // Agregado el await para esperar a que se encuentre el elemento
  const textoMensaje = await (await mensajeExito.getProperty('innerText')).jsonValue(); // Obtener el texto del elemento
  expect(textoMensaje).toContain('spain');


});


test('borra todos los recursos', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontCgm');

  await page.waitForTimeout(2000);
  await page.click('button:has-text("Borrar recursos")');
  await page.click('button:has-text("Eliminar")');

  const mensajeExito = page.locator('.alert');
  await expect(mensajeExito).toHaveText('Recursos borrados correctamente');
});
