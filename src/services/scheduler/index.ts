import { DependencyContainer } from 'tsyringe';
import ScheduleRunner from './ScheduleRunner';
import CryptoParcer  from './tasks/CryptoParcer'


const runScheduler = (container: DependencyContainer) => {
    const tasks = [
        new CryptoParcer(),
    ]
    const scheduleRunner = container.resolve(ScheduleRunner)
    for (let i = 0; i < tasks.length; i++) {
        void scheduleRunner.addTask(tasks[i])
    }
}

export default runScheduler