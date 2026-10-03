const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); 
  // headless: true (default) runs without UI
})();

