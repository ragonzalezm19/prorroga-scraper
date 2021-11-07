import { NotificationConfig } from './NotificationConfig';

export interface INotification {
  notifyNotUpdate(config: NotificationConfig): void;
  notifyUpdates(config: NotificationConfig): void;
}
