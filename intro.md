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

// Interface & type

/**
 * - Declare kieu du lieu
 * - Abstraction OOP
 */

// Use for datatype
interface Animal {
    name: string,
    type: string,
    age: number,
    status?: boolean
}

type ObjectAnimal = Record<string, Animal>
type k = 'ad' | 2;

const animal: Animal = {
    name: 'Fus',
    type: 'human',
    age: 18
}

const mapAnimal: ObjectAnimal = {
    'asd': {
        name: 'Fus',
        type: 'human',
        age: 18
    }
}

function checkAnimal(sucvak: Animal) {
    return `${sucvak.name} is a ${sucvak.type} have age: ${sucvak.age}`
}

checkAnimal(animal);

// Use for abstraction
interface Duck {
    quack(): void
}

interface Fly {
    fly(): void
}

class NormalDuck implements Duck {
    quack(): void {
        console.log('Quack quack im a normal duck')
    }
}

class SkyDuck implements Duck, Fly {
    fly(): void {
        throw new Error("Method not implemented.");
    }

    quack(): void {
        throw new Error("Method not implemented.");
    }
}
