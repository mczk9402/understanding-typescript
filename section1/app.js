var userInput;
var userName;
userInput = 5;
userInput = "max";
if (typeof userInput === "string")
    userName = userInput;
// anyよりはマシ　データをチェックしないといけない型
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
var result = generateError("エラーが発生しますた", 500);
console.log(result);
