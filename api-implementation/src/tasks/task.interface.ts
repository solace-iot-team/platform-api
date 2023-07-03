import L from "../../server/common/logger";
import { Delay } from "../delay";
export enum TaskState {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT"
}
// Sub Interfaces
export interface TaskConfig {
    state: TaskState,
}

export interface TaskResult {
    success: boolean,
    state: TaskState,
    data: any,
    log: TaskLog,
}

export interface TaskLog {
    action: string,
    info: any
}

// Main Task interface and base class
/**
 * Constructor Declaration of a Task
 */
export interface TaskConstructor {
    new(taskConfig: TaskConfig): TaskInterface;
}

/**
 * Interface of a task, essentially just execute the task
 */
export interface TaskInterface {
    config(): TaskConfig;
    execute(): Promise<TaskResult>;
    isApplicable(): Promise<boolean>;
}


export abstract class TaskTemplate implements TaskInterface {
    private retries: number = 3;
    protected taskConfig: TaskConfig;
    constructor(taskConfig: TaskConfig) {
        this.taskConfig = taskConfig;
    }

    protected abstract isPresent(): Promise<boolean>;
    protected abstract create(): Promise<TaskResult>;
    protected abstract update(): Promise<TaskResult>;
    protected abstract delete(): Promise<TaskResult>;

    public config(): TaskConfig {
        return this.taskConfig;
    }

    public abstract isApplicable(): Promise<boolean>;

    public async execute(): Promise<TaskResult> {
        const desiredState: TaskState = this.taskConfig.state;
        let retVal: TaskResult = null;
        for (let i = 0; i < this.retries; i++) {

            switch (desiredState) {
                case 'PRESENT': {
                    if (await this.isPresent()) {
                        retVal = await this.update();
                    } else {
                        retVal = await this.create();
                    }
                    break;
                }
                case 'ABSENT': {
                    if (await this.isPresent()) {
                        retVal =  await this.delete();
                    } else {
                        retVal =   {
                            data: null,
                            state: desiredState,
                            success: true,
                            log: {
                                action: 'skipped',
                                info: 'Object is not present'
                            }
                        };
                    }
                    break;
                }
                default: {
                    retVal =   {
                        data: null,
                        state: desiredState,
                        success: false,
                        log: {
                            action: 'error',
                            info: 'Task execution internal error'
                        }
                    };
                }
            }
            if (retVal.success){
                i = this.retries;
            }
        }
        return retVal;
    }
}


/**
 * Factory method for creating tasks
 */
export function taskFactory(
    ctor: TaskConstructor,
    taskConfig: TaskConfig
): TaskInterface {
    return new ctor(taskConfig);
}
