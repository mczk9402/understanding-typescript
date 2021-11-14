// function型
// type addFn = (a: number, b: number) => number;

// let add: addFn;

// add = (n1: number, n2: number) => {
//   return n1 + n2;
// };

// interface AddFn {
//   (a: number, b: number): number;
// }

// let add: AddFn;

// add = (n1, n2) => {
//   return n1 + n2;
// };

// // interfaceはオブジェクトオンリー
// interface Named {
//   readonly name?: string;
//   outputName?: string;
// }

// interface Greetable extends Named {
//   greet(phrase: string): void;
// }

// class Person implements Greetable {
//   name?: string;
//   age = 30;

//   constructor(n?: string) {
//     if (n) {
//       this.name = n;
//     }
//   }

//   greet(phrase: string) {
//     if (this.name) {
//       console.log(phrase + "" + this.name);
//     } else {
//       console.log("Hi!");
//     }
//   }
// }

// let user1: Greetable;
// user1 = new Person();
// user1.greet("Hellow");
// console.log(user1);
