import axios, { AxiosError } from "axios"
import {ILatestCoinInfo} from '@models/ICoinInfo';
import mailer from '@config/mailer';
import {SELECTED_EMAILS, SELECTED_MOBILE_NUMBERS} from '@constants/index';

export const sendNewlyAddedCoinUpdate = async (newCoinList: Array<ILatestCoinInfo>): Promise<boolean> => {
    try {
        let message = `Latest Coins:
        ${newCoinList.map((val,i) => `Coin Name: ${val.coinName}, Coin Price: $${val.coinPrice}, 1HR Gains: $${val.$1h}, 24HR Gains: $${val.$24h}, Coin Rank: ${val.coinRank}, Blockchain Type: ${val.blockchainType}, Volume: ${val.volume}. \n \n`)}`
/*         for(let number of SELECTED_MOBILE_NUMBERS){
            await axios.get(`https://sender.ge/api/send.php?apikey=${process.env.SMS_SERVICE_APIKEY}&smsno=2&destination=${number}&content=${message}`).catch(async (err: AxiosError) =>{
                if(err.response){
                    await mailer.sendMail({
                        to: process.env.MY_EMAIL,
                        subject: 'Newly Added Coin Listing Update Alert Failure',
                        text: (err.response.data as {message: string}).message
                    });
                };
            });
        } */
        for(let email of SELECTED_EMAILS){
            await mailer.sendMail({
                to: email,
                subject: 'Newly Added Coin Listing Update',
                text: message
            });
        }
        return true;
    } catch (error) {
        throw error;
    };
};