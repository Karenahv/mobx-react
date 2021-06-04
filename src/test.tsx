import {observable, makeObservable, runInAction, action, autorun, when, reaction, computed} from "mobx";

console.log('it works')

const person = observable({
    firstName: 'mobx',
    lastName: 'Course',
})

//console.log('our person', person)
class Person {
    firstName: string
    lastName: string
    age: number
    isAlive: boolean
    dollars: number

    constructor(name: string, lastName: string, age: number, isAlive: boolean, dollars: number) {
        makeObservable(this, {
          euros: computed,
        })
        this.firstName = name
        this.lastName = lastName
        this.age = age
        this.isAlive = isAlive
        this.dollars = dollars


    }


    updateFirstName(name: string) {
        this.firstName = name
    }

    // updateLastName(lastName: string){
    //     this.lastName = lastName
    // }

    setAge(age: number) {
        this.age = age

    }

    bury() {
        this.isAlive = false
    }

    get euros (){
        const euro = this.dollars *2
        console.log('calculation euros')
        return euro
    }

}

const newPerson = new Person('new name', 'lastName', 15, true, 10)

//console.log('our person', newPerson.lastName)
//newPerson.updateLastName('lastname updated')
// const update = action(()=>{
//     newPerson.firstName = 'update'
// })
// update()

autorun(() => {
    console.log(`Person Name is: ${newPerson.age} ${newPerson.isAlive} ${newPerson.firstName} ${newPerson.lastName}`)
    console.log('Dollars', newPerson.euros)
})

runInAction(async () => {
    newPerson.firstName = 'async'
    newPerson.lastName = 'apellido'
})

when(
    () => {
        return newPerson.age > 99

    },
    () => newPerson.bury()
)

reaction(
    () => newPerson.isAlive === false,
    () => console.log('RIP')
)

newPerson.setAge(100)

// console.log('our person updated', newPerson.firstName)
// console.log('our person updated', newPerson.lastName)

console.log(newPerson.age)
console.log(newPerson.euros)
console.log(newPerson.euros)
console.log(newPerson.euros)
export {};