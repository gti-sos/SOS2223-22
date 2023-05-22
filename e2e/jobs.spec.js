import { test, expect } from '@playwright/test';

test('carga recursos iniciales', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontAcb');
  
  
// Espera 2 segundos antes de hacer clic en el botón de cargar datos iniciales.
await page.waitForTimeout(2000);
// Hace clic en el botón de cargar datos iniciales.
await page.click('button:has-text("Cargar recursos")');

const mensajeExito = page.locator('#messages');
await expect(mensajeExito).toHaveText('Datos cargados correctamente');
});



test('realiza una búsqueda', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontAcb');

  // Ingresa valores en los campos de búsqueda.
  await page.fill('input[placeholder=" territorio"]', 'andalucia');
  await page.fill('input[placeholder="año"]', '');
  await page.fill('input[placeholder="trabajos"]', '');
  await page.fill('input[placeholder="compañias"]', '');
  await page.fill('input[placeholder="empleos"]', '');

  // Hace clic en el botón de búsqueda.
  await page.click('button:has-text("Buscar")');

  const mensajeExito = page.locator('#messages');
  await expect(mensajeExito).toHaveText('');//Si no se encontraran resultados, apareceria aqui un mensaje de que no existen resultados,
                                            //SI hay resultados no se mostrará nada
});

// Resto de las pruebas...
test('limpia los campos de búsqueda', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontAcb');

  // Ingresa valores en los campos de búsqueda.
  await page.fill('input[placeholder=" territorio"]', 'Territorio');
  await page.fill('input[placeholder="año"]', '2022');
  await page.fill('input[placeholder="trabajos"]', '10');
  await page.fill('input[placeholder="compañias"]', '5');
  await page.fill('input[placeholder="empleos"]', '8');

  // Hace clic en el botón de limpiar.
  await page.click('button:has-text("Limpiar")');

  // Espera que los campos de búsqueda estén vacíos.
  const campoTerritorio = page.locator('input[placeholder=" territorio"]');
  const campoAño = page.locator('input[placeholder="año"]');
  const campoTrabajos = page.locator('input[placeholder="trabajos"]');
  const campoCompañias = page.locator('input[placeholder="compañias"]');
  const campoEmpleos = page.locator('input[placeholder="empleos"]');

  await expect(campoTerritorio).toHaveValue('');
  await expect(campoAño).toHaveValue('');
  await expect(campoTrabajos).toHaveValue('');
  await expect(campoCompañias).toHaveValue('');
  await expect(campoEmpleos).toHaveValue('');
});
test('borra un recurso', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontAcb');

 

  await page.waitForTimeout(2000);
   // Hace clic en el botón de "Borrar un recurso".
   await page.click('button:has-text("Borrar un recurso")');
  // Ingresa valores en los campos de eliminación.
  await page.fill('input[id="delete_territory"]', 'andalucia');
  await page.fill('input[id="delete_year"]', '2008');

  // Hace clic en el botón de eliminar.
  await page.click('button:has-text("Eliminar")');

  const mensajeExito = page.locator('#messages');
  await expect(mensajeExito).toHaveText('Recurso eliminado correctamente');
});


test('borra todos los recursos', async ({ page }) => {
  await page.goto('https://sos2223-22.appspot.com/frontAcb');


  await page.waitForTimeout(2000);
   // Hace clic en el botón de "Borrar un recurso".
   await page.click('button:has-text("Borrar recursos")');

  const mensajeExito = page.locator('#messages');
  await expect(mensajeExito).toHaveText('Recursos eliminados correctamente');
});






