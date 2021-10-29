import { Browser, chromium, Page } from 'playwright';
import moment from 'moment';

const NOT_PRORROGA_MESSAGE =
  'Su prórroga aún no esta disponible para ser retirada en ésta misión diplomática. Consulte la próxima semana';
const URL_PRORROGA = 'http://sodoc.embaven.cl/consultaprorroga';

const main = async () => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  await page.goto(URL_PRORROGA);
  await page.fill('#dni', '20314731');
  await page.click('#consultaProrroga');
  await page.click('.col-md-6.adultos.cursor');
  await page.click('button[type=button].swal2-confirm.swal2-styled');
  await page.waitForTimeout(1000);
  const content: string | null = await page.textContent(
    '.swal2-popup.swal2-modal.swal2-show .swal2-content #swal2-content'
  );

  const prorrogaHasArrive =
    content?.toLowerCase() !== NOT_PRORROGA_MESSAGE.toLowerCase();

  if (prorrogaHasArrive) {
    const now: Date = new Date();
    const screenshotName: string = moment(now).format('YYYYMMDD_HH:mm:ss');
    await page.screenshot({
      path: `${__dirname}/screenshots/${screenshotName}.png`,
    });

    // TODO: notify me by telegram
  } else {
    // TODO: notify me by telegram
  }

  await browser.close();
};

main();
