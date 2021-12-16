FROM sugarshin/playwright-base:2.2.1-node12

RUN apt update
RUN apt install --reinstall systemd -y
RUN apt install cron -y
RUN systemctl enable cron
RUN apt install vim -y
COPY crontab /var/spool/cron/crontabs/crontab
RUN chmod 0644 /var/spool/cron/crontabs/crontab
RUN crontab /var/spool/cron/crontabs/crontab
RUN touch /var/log/cron.log

WORKDIR /bin/app
COPY . .
RUN npm install -g typescript@4.0.2
RUN npx playwright install
RUN npm install
RUN npm run build

CMD cron && tail -f /var/log/cron.log