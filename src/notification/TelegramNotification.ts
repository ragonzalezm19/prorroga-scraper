import { Telegraf } from 'telegraf';
import { INotification } from './INotification';
import { NotificationConfig } from './NotificationConfig';

export class TelegramNotification implements INotification {
  private bot: Telegraf;
  private chatId: string;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN || '';
    const chatId = process.env.TELEGRAM_BOT_CHAT_ID || '';

    this.bot = new Telegraf(token);
    this.chatId = chatId;
  }

  async notifyNotUpdate(config: NotificationConfig): Promise<void> {
    await this.bot.telegram.sendMessage(
      this.chatId,
      'Nada ha cambiado, harbá que esperar... 🤷🏻‍♂️ 🕒'
    );
    await this.bot.telegram.sendMessage(
      this.chatId,
      'De todas maneras, acá dejo lo que encontre para ti 👇🏻'
    );
    await this.bot.telegram.sendPhoto(this.chatId, { source: config.image });
  }

  async notifyUpdates(config: NotificationConfig): Promise<void> {
    await this.bot.telegram.sendMessage(
      this.chatId,
      '¡¡Parece que algo ha cambiado!! 🤔'
    );
    await this.bot.telegram.sendMessage(
      this.chatId,
      'Esto es lo que he conseguido para ti 👇🏻'
    );
    await this.bot.telegram.sendPhoto(this.chatId, { source: config.image });
  }
}
