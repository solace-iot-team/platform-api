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


export abstract class TaskTemplate implements TaskInterface{
    protected taskConfig: TaskConfig;
    constructor(taskConfig: TaskConfig){
        this.taskConfig = taskConfig;
    }

    protected abstract isPresent(): Promise<boolean>;
    protected abstract create(): Promise<TaskResult>;
    protected abstract update(): Promise<TaskResult>;
    protected abstract delete(): Promise<TaskResult>;

    public config(): TaskConfig{
        return this.taskConfig;
    }

    public abstract isApplicable(): Promise<boolean>;

    public async execute(): Promise<TaskResult> {
        const desiredState: TaskState = this.taskConfig.state;
        switch (desiredState){
            case 'PRESENT': {
                if (await this.isPresent()){
                    return await this.update();
                } else {
                    return await this.create();
                }
            }
            case 'ABSENT': {
                if (await this.isPresent()){
                    return await this.delete();
                } else {
                    return {
                        data: null,
                        state: desiredState,
                        success: true,
                        log: {
                            action: 'skipped',
                            info: 'Object is not present'
                        }
                    };
                }
            }
            default: {
                return {
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
