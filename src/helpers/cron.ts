import {CronJob} from 'cron';
import {IManagedCronTask} from '@models/ICrons';

export class CronManager {
    private __jobs: {
        [key: string]: IManagedCronTask
    };
    constructor(){
        this.__jobs = {};
    };
    addJob(name: string,periodText: string, fn: (...args: any[]) => any): IManagedCronTask {
        let IManagedCronTask = new CronJob(
            periodText,
            fn,
            null,
            false
        );
        let savedTask = {
            name,
            cron: IManagedCronTask
        }
        this.__jobs[name] = savedTask
        return savedTask;
    }
    stopJob(name: string){
        let savedTask = this.__jobs[name];
        savedTask.cron.stop();
        delete this.__jobs[name];
        return true;
    }
    get jobs(){
        return this.__jobs;
    }
}