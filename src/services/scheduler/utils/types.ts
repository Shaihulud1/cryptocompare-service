export type Task = {
    name: string;
    time: {
        runImmediately?: boolean;
        milliseconds?: number;
        seconds?: number;
        minutes?: number;
        hours?: number;
    };
    run(): Promise<void>;
};
