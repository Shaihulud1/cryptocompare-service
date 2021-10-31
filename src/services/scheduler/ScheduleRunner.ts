import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';
import { Task } from './utils/types';

export default class ScheduleRunner {
    public constructor(private toadScheduler = new ToadScheduler()) { }

    public async addTask(task: Task) {
        const asyncTask = new AsyncTask(
            task.name,
            () => task.run(),
            (err) => {
                console.error(`Task error: "${task.name}" ${err.message}`);
            },
        );
        const job = new SimpleIntervalJob(task.time, asyncTask);
        this.toadScheduler.addSimpleIntervalJob(job);
    }
}
