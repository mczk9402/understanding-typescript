type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// 交差型 共通部分の型になる
type ElevatedEmploee = Admin & Employee;

const e1: ElevatedEmploee = {
  name: "max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;
type UnknowEmployee = Employee | Admin;

function printEmployeeInfomation(emp: UnknowEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) {
    console.log("privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("startDate: " + emp.startDate);
  }
}

printEmployeeInfomation(e1);
printEmployeeInfomation({ name: "manu", startDate: new Date() });

class Car {
  drive() {
    console.log("乗用車を運転中");
  }
}

class Truck {
  drive() {
    console.log("トラックを運転中");
  }

  loadCargo(amout: number) {
    console.log("荷物を載せています・・・" + amout);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ("loadCargo" in vehicle) {
  //   vehicle.loadCargo(1000);
  // }
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // if ("flyingSpeed" in animal) {
  //   console.log(animal.flyingSpeed);
  // }
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("移動速度: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 2000 });

// 型キャスト
// const userInput = document.getElementById("user-input")!;
// const userInput = <HTMLInputElement>document.getElementById("user-input")!;// React的にはダメ
const userInput = document.getElementById("user-input"); // React回避用

if (userInput) {
  (userInput as HTMLInputElement).value = "こんばんは";
}

// index型
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "正しいメールアドレスではありません",
  username: "ユーザー名に記号を含める事はできません",
};

// function overload
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// const result = add(1, 5);
const result = add("Hello", "TypeScript");
result.split("");

// オプショナルチェーン
const fetchedUserData = {
  id: "u1",
  name: "user1",
  job: {
    title: "Developer",
    description: "typeScript",
  },
};

// オプショナルチェーン
console.log(fetchedUserData?.job?.title);

// nullish Coalescing Operator NULL合体演算子
// ?? null or undefined なら右を返す
const userInput2 = "";
// 論理OR演算子 一つ目がフォルシーなら右の値を渡す
const storedData = userInput2 ?? "DEFAULT";
console.log(storedData);
