This is node.js service which currently acts as crypto alerter, with functionality of sending SMS to selected mobile numbers, current service accepts only GE numbers without +995 prefix, if request fails due to sms service alert is sent to selected email, application uses typescript as it's language and there is cron job declared at the start of http server instance which pings the selected API which on it's own scrapes [CoinMarketCap Newly Added Cryptocurrencies](https://coinmarketcap.com/new/) page and selects all the coins, if server is freshly started it initalizes cache with the data, otherwise it runs comparsion between first elements of new list and stored list in redis cache, if they do not match, it means new coin(s) is added to the list and we need to update redis cache and send SMS to the selected numbers as well.

# System Requirements
   
   * Redis (Currently Using 2.4.5)

# How to run
    
   * To run application in development environment run, `npm run start:dev` command in terminal
   * To run application in production environment run, `npm run start:prod` command in terminal
   * To run tests, run `npm run test` command in terminal

# Suggestions

   * If you are using serverless environment (e.g: Lambda, Heroku) i would suggest that you use service like UptimeRobot to keep dyno/lambda alive and not lose stored cache due to cold start.

# Initialization 
   
   1. Clone repository in your local system with `git clone https://github.com/its-me-ilia/crypto-update-notifier.git` command
   2. Go to the root directory and run `npm i` command
   3. In order to whitelist your mobile number as receiver of alert, you can go to `src > constants > index.ts` and find `SELECTED_MOBILE_NUMBERS` array, inside the array add your mobile phone number without prefix, (if you are planning to change sms sending service feel free to add your number in your desired form), while there find `WEBURL` and change production version to your desired url, after that replicate example environment variables with your data and all set.


### Happy Coding!   
