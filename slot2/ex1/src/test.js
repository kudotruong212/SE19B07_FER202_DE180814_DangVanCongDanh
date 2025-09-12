const result = (a, b) => a + b;
// console.log(result(1, 2));

let square = x => x * x;
// console.log(square(3));

let sayHello = () => console.log("Hello, World!");
// sayHello();

let greetUser = name => console.log(`Hello, ${name}!`);
// greetUser("Dang Van Cong Danh");

let person = {
    name: "CongDanh",
    age: 21,
    greet: function () {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    },
    testCode: function () {
        this.greet();
        console.log("test code");
        console.log(result(4, 5));
        console.log(square(4));
        sayHello();
        greetUser("Dang Van Cong Danh");
    }
}

let person2 = {
    name: "AnotherPerson",
    age: 30,
    greet: () => {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

person2.greet();  

// person.greet();

person.testCode();