// @ts-nocheck

const person ={
    firstName: 'Mobx',
    lastName: 'React'
}
let reaction;
const mobxCourse = {
    autorun: function (cb){
        reaction = cb
        cb()
        reaction = null
    },
    observable: function (obj){
        const reactions = new Set()
        const handler = {
            get: function (obj, prop){
                if(reaction){
                    reactions.add(reaction)
                }
                return obj[prop]
            },
            set: function (obj, prop, value){
                obj[prop] = value
                for(reaction of reactions){
                    reaction()
                }
                return true

            }
        }
        return new Proxy(obj, handler);

    },
};

const ourPerson = mobxCourse.observable(person)

mobxCourse.autorun(()=>{
    console.log(`Our Person: ${ourPerson.firstName} ${ourPerson.lastName}`)
})
ourPerson.firstName = 'New Name'
ourPerson.lastName = 'xxxxxxxxx'
//console.log(ourPerson)
export {}