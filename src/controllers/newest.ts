import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import {COINMARKETCAP_URLS} from '@models/IURLS';
import {getAsync as redisGetAsync} from '@helpers/redis';
import {REDIS_NEWEST_KEY} from '@constants/index';
import redisClient from '@config/redis';
import {ILatestCoinInfo as ICoinInfo} from '@models/ICoinInfo';
import { sendNewlyAddedCoinUpdate } from '@helpers/sms';

export default async (req: Request, res: Response) => {
    try {
        console.log('Newest Coinmarketcap coins endpoint has been stubbed')
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(COINMARKETCAP_URLS.NEWEST);
        let list = await page.$eval('tbody', (tbody)=> {
            let coinRows = tbody.children;
            let coinList: Array<ICoinInfo> = [];
            for(let coinRow of coinRows){
                let coinRank = coinRow.children[1].getElementsByTagName('p')[0].innerText;
                let coinName = coinRow.children[2].getElementsByTagName('p')[0].innerText;
                let coinId = coinRow.children[2].getElementsByTagName('a')[0].innerText;
                let coinPrice = (coinRow.children[3] as HTMLElement).innerText.substring(1);
                let $1h = (coinRow.children[4].firstChild as HTMLElement).innerText.slice(0,-1);
                let $24h = (coinRow.children[5].firstChild as HTMLElement).innerText.slice(0,-1);
                let volume = (coinRow.children[7] as HTMLElement).innerText.substring(1);
                let blockchainType = coinRow.children[8].getElementsByTagName('div')[0].innerText;
                coinPrice = coinPrice[0] === "$" ? coinPrice.substring(1) : coinPrice; //some of the coins may start with dollar sign ($) and some with LT (<) following dollar sign ($) which we need to check to get pure number
                let coinInfo: ICoinInfo = {
                    coinRank: parseInt(coinRank),
                    coinName: coinName,
                    coinId: coinId,
                    coinPrice: parseFloat(coinPrice),
                    $1h: parseFloat($1h),
                    $24h: parseFloat($24h),
                    volume: parseFloat(volume),
                    blockchainType: blockchainType
                };
                coinList.push(coinInfo);
            };
            return coinList;
        });
        await browser.close();
        let existingCoinListStr = await redisGetAsync(REDIS_NEWEST_KEY);
        if(!existingCoinListStr){
            //init process
            console.log('Initializing Cache');
            redisClient.set(REDIS_NEWEST_KEY, JSON.stringify(list));
        }else{
            let existingCoinList: Array<ICoinInfo> = JSON.parse(existingCoinListStr);
            if(existingCoinList[0].coinId !== list[0].coinId){
                console.log('Updating Cache');
                //if first element is changed in new list, it means list is new and there is new coins
                redisClient.set(REDIS_NEWEST_KEY, JSON.stringify(list));
                //in order to not include last element in the new coins, since if array has fixed length (30), cmarketcap pushes element at the first rank and all the other coins have to go back by 1 rank, while 30-th element gets pushed out of array, and difference is first elements + last element since it is not included in new list as well
                //let newCoins = list.filter(coin => !existingCoinList.find(e => e.coinId === coin.coinId)); //find non-present coins in existingCoinList and add them to newCoins array
                let newCoins: Array<ICoinInfo> = [];
                for(let newCoin of list){
                    let isOld = existingCoinList.find(c => c.coinId === newCoin.coinId);
                    if(isOld){
                        break;
                    }else{
                        newCoins.push(newCoin);
                    };
                };
                await sendNewlyAddedCoinUpdate(newCoins);
            };
        }
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    };
};