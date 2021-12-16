import moment from 'moment';
import { Browser, chromium, Page } from 'playwright';
import { ScraperResponse } from './ScraperResponse';

const URL_PRORROGA = 'http://sodoc.embaven.cl/consultaprorroga';
const NOT_PRORROGA_MESSAGE =
  'su prórroga o pasaporte aún no esta disponible para ser retirado en ésta misión diplomática. consulte la próxima semana';

export class Scraper {
  public static async scrape(): Promise<ScraperResponse> {
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

    let imagePath = '';

    const now: Date = new Date();
    const screenshotName: string = moment(now).format('YYYYMMDD_HH:mm:ss');
    imagePath = `${__dirname}/screenshots/${screenshotName}.png`;

    await page.screenshot({
      path: imagePath,
    });

    await browser.close();

    return {
      prorrogaHasArrive,
      image: imagePath,
    } as ScraperResponse;
  }
}
