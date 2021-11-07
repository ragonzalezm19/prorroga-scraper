import { NOTIFICATION_TYPE } from './notificationType';
import { TelegramNotification } from './TelegramNotification';

export class NotificationFactory {
  public static GetNotification(type: NOTIFICATION_TYPE) {
    switch (type) {
      case NOTIFICATION_TYPE.TELEGRAM:
        return new TelegramNotification();
    }
  }
}
