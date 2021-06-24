import sinon from 'sinon';
import {CronManager} from '@helpers/cron';
import { Crons } from '@models/ICrons';
import { CronJob } from 'cron';
import day from 'dayjs';

let cronTaskManager: CronManager;
let oneMinuteFromNow: string;

beforeEach(() => {
    jest.useFakeTimers('modern');
    cronTaskManager = new CronManager();
    oneMinuteFromNow = `${day().second()} * * * * *`;
});

afterEach(() => {
    jest.clearAllTimers();
});

describe("Cron Lib", ()=> {
    it("Adds Job", ()=> {
        let returnedJob = cronTaskManager.addJob(Crons.NEWLY_ADDED_COINS_CRONTASK, oneMinuteFromNow, jest.fn());
        expect(returnedJob).toBeTruthy();
        expect(returnedJob.name).toBe(Crons.NEWLY_ADDED_COINS_CRONTASK);
        expect(returnedJob.cron instanceof CronJob).toBe(true);
    });
    it("Retrieves Existing Jobs", ()=> {
        cronTaskManager.addJob(Crons.NEWLY_ADDED_COINS_CRONTASK, oneMinuteFromNow, jest.fn());
        let savedJob = cronTaskManager.jobs[Crons.NEWLY_ADDED_COINS_CRONTASK];
        expect(savedJob).toBeTruthy();
        expect(savedJob.name).toBe(Crons.NEWLY_ADDED_COINS_CRONTASK);
        expect(savedJob.cron instanceof CronJob).toBe(true);
    });
    it("Executes Cron Job 2 times after 2 minutes", ()=> {
        let stub = jest.fn();
        let returnedJob = cronTaskManager.addJob(Crons.NEWLY_ADDED_COINS_CRONTASK, oneMinuteFromNow, stub);
        returnedJob.cron.start();
        jest.advanceTimersByTime(121 * 1000);
        expect(stub).toHaveBeenCalledTimes(2);
    });
    it("Schedules Cronjob, waits 1 minute and then stops it.", () => {
        let stub = jest.fn();
        let returnedJob = cronTaskManager.addJob(Crons.NEWLY_ADDED_COINS_CRONTASK, oneMinuteFromNow, stub);
        returnedJob.cron.start();
        jest.advanceTimersByTime(61 * 1000);
        cronTaskManager.stopJob(returnedJob.name);
        jest.advanceTimersByTime(121 * 1000);
        expect(stub).toHaveBeenCalledTimes(1);
    });
})