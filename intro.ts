/***
 * Data type
 */

function tester(): void {
    console.log('Im tester')
}

function runCallback<T>(cb: (() => T)): void {
    cb();
}
runCallback(tester);
const dataType: number | string | boolean | Record<string, any> | [] | Array<string> | (() => {}) = 'asd'

const arr1: number[] = [1,2]
const arr2: Array<number> = [1,2]
const arr3: any[] = [1, 'asd', true, () => {}]

const k: Record<string, string> = {
    'asd': 'asd'
}

console.log(dataType);