export function serial<T>(tasks: Array<T>, fn: CallableFunction) {
    return tasks
        .reduce(
            (promise, task) => promise
                .then(previous => fn(task, previous)),
            Promise.resolve(null)
        );
}