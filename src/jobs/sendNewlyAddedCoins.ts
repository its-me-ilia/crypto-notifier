import {WEBURL} from '@constants/index';
import cronManager from '@config/cron';
import {Crons, IManagedCronTask} from '@models/ICrons';
import day from 'dayjs';
import axios from 'axios';

export default (): IManagedCronTask => {
    let savedTask = cronManager.addJob(Crons.NEWLY_ADDED_COINS_CRONTASK, `${day().second()} * * * * *`, async () => await axios.get(`${WEBURL}/api/v1/newest`).catch(err => console.log(err.message)))
    return savedTask;
}
