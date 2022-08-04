import L from '../../server/common/logger';
import { TaskInterface, TaskResult } from './task.interface';

export interface TaskSetResult {
    success: boolean,
    results: TaskResult[],
}

export class TaskSet {
    private tasks: Set<TaskInterface>;

    constructor() {
        this.tasks = new Set<TaskInterface>();
    }

    public add(task: TaskInterface) {
        if (task) {
            this.tasks.add(task);
        }
    }

    private getTasks(): Set<TaskInterface> {
        return this.tasks;
    }
    public appendTaskSet(tasks: TaskSet) {
        tasks.getTasks().forEach(t => this.tasks.add(t));
    }
    public async execute(): Promise<TaskSetResult> {
        const results: TaskResult[] = [];
        let success: boolean = true;
        for (const task of this.tasks) {
            if (task.isApplicable()) {
                try {
                    const r = await task.execute();
                    if (!r.success) {
                        success = false;
                    }
                    results.push(r);
                } catch (e) {
                    L.error(e);
                    results.push({
                        data: e,
                        log: {
                            action: task.constructor.name,
                            info: e.message

                        },
                        state: task.config().state,
                        success: false,
                    });
                    success = false;
                }
            }
        }
        return {
            success: success,
            results: results
        };
    }
}