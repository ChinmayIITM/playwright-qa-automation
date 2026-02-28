const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 57; seed <= 66; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => parseFloat(cell.innerText)).filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log("FINAL TOTAL SUM:", totalSum);

  await browser.close();
})();