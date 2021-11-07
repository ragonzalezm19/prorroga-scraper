import dotenv from 'dotenv';
import { NotificationFactory } from './src/notification/NotificationFactory';
import { NOTIFICATION_TYPE } from './src/notification/notificationType';
dotenv.config({ path: `${__dirname}/.env` });
import { Scraper } from './src/scraper/Scraper';

const main = async () => {
  const notificationType = process.env.NOTIFICATION_TYPE as NOTIFICATION_TYPE;
  const response = await Scraper.scrape();

  const notification = NotificationFactory.GetNotification(notificationType);
  if (response.prorrogaHasArrive) {
    notification.notifyUpdates({ image: response.image });
  } else {
    notification.notifyNotUpdate({ image: response.image });
  }
};

main();
