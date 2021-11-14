// function Logger(logString: string) {
//   console.log("LOGGER ファクトリ");
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log(constructor);
//   };
// }

// function WidthTemplate(template: string, hookId: string) {
//   console.log("TEMPLATE ファクトリ");
//   return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
//     return class extends originalConstructor {
//       constructor(..._: any[]) {
//         super();
//         const hookEl = document.getElementById(hookId);
//         if (hookEl) {
//           hookEl.innerHTML = template;
//           hookEl.querySelector("h1")!.textContent = this.name;
//         }
//       }
//     };
//   };
// }

// @Logger("ログ出力中 - PERSON")
// @WidthTemplate("<h1>PERSON オブジェクト</h1>", "app")
// class Person {
//   name = "Max";

//   constructor() {
//     console.log("Personオブジェクトを作成中");
//   }
// }

// const pers = new Person();

// console.log(pers);

// // ---

// function Log(target: any, propertyName: string | symbol) {
//   console.log("Property デコレーター");
//   console.log(target, propertyName);
// }

// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Accessor デコレータ");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
//   console.log("Method デコレータ");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log4(target: any, name: string | symbol, position: number) {
//   console.log("Parametor デコレータ");
//   console.log(target);
//   console.log(name);
//   console.log(position);
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//     } else {
//       throw new Error("不正な価格です - 0以下は設定できません");
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   @Log3
//   getPriceWidthTax(@Log4 tax: number) {
//     return this._price * (1 + tax);
//   }
// }

// function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   const adjDescriptor: PropertyDescriptor = {
//     configurable: true,
//     enumerable: false,
//     get() {
//       const boundFn = originalMethod.bind(this);
//       return boundFn;
//     },
//   };
//   return adjDescriptor;
// }

// class Printer {
//   message = "クリックしました";

//   @Autobind
//   showMessage() {
//     console.log(this.message);
//   }
// }

// const p = new Printer();

// const button = document.querySelector("button")!;
// button.addEventListener("click", p.showMessage);

interface ValidatorConfig {
  [prop: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), "required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), "positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const couceForm = document.querySelector("form")!;
couceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("正しく入力してください");
    return;
  }

  console.log(createdCourse);
});
