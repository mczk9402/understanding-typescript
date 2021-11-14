//  Generics型
// const names: Array<string> = []; //strgin[]と同一
// const names: Array<any> = [];

// const promise = new Promise<number>((resolve, reject) => {
//   setTimeout(() => {
//     resolve(20);
//   }, 2000);
// });

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// const mergedObj = merge({ name: "Max" }, { age: 30 }) as { name: string; age: number };
// const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>({ name: "Max", hobbies: ["Sports"] }, { age: 30 }); // 冗長な書き方
const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 }); // ジェネリクス型の型推論

console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(el: T): [T, string] {
  let descriptionText = "値がありません";
  if (el.length > 0) descriptionText = `値は${el.length}個です`;
  return [el, descriptionText];
}

console.log(countAndDescribe([]));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return `VALUE: ${obj[key]}`;
}

console.log({ name: "Max" }, "name");

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
console.log(textStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntile: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntile = date;
  return courseGoal as CourseGoal;
}

// 追加できないようにする
const names: Readonly<string[]> = ["Max", "Anna"];
