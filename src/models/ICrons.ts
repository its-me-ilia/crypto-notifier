import {CronJob} from 'cron';

export enum Crons{
    NEWLY_ADDED_COINS_CRONTASK="newlyAddedCoinsCrontask"
}

export interface IManagedCronTask{
    name: string;
    cron: CronJob;
};