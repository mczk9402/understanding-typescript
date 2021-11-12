let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "max";

if (typeof userInput === "string") userName = userInput;

// anyよりはマシ　データをチェックしないといけない型

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

const result = generateError("エラーが発生しますた", 500);
console.log(result);
