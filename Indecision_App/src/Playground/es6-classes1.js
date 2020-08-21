class Person {
    constructor(name = 'Anonymous',age=0) {      //constructor function is called when an instance or object is made. this function is created to deal with passed data  
       
      this.name = name ;     //this refers to the instances of the class or object
      this.age = age;
    }
    getGreet(){
        // return 'Hi I am ' + this.name;
        return `Hi I am ${this.name}`;
    }
    getDesc(){
        return `${this.name} is ${this.age} years old.`;
    }
    
}

class Student extends Person {
   constructor (name,age,major){
       super(name,age);             //super refers to parent class Person. it calls the constructor, assigns name and age first, then assigns major
       this.major = major;
   }
   hasMajor() {
    return !!this.major; //converting to 'true' value as string '' always 
    }
    //override parent method with same name in child class
    getDesc(){
       let desc = super.getDesc(); //by default the method with same name in child class is called. to call parent super() is used.
       if (this.hasMajor()){
           desc += `their major is ${this.major}.`;
       }
       return desc;
   }
}

class Traveler extends Person {
    constructor (name,age,homelocation){
        super(name,age);
        this.homelocation = homelocation;
    }

    hasHomelocation(){
        return !!this.homelocation;
    }
    getDesc(){
        let desc = super.getDesc();
        if (this.hasHomelocation()){
            desc += `Hi I am ${this.name}. I am from ${this.homelocation}.`
        } else {
            desc += `Hi I am ${this.name}.`
        }
        return desc;
    }
}
const me = new Traveler("Nikhil Sathe",38,'Nagpur');
console.log(me.getDesc());

const other = new Traveler();
console.log(other.getDesc());
