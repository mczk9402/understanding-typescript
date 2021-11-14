abstract class Department {
  static fiscalYear = 2020;
  private employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name };
  }

  // name: string;
  // constructor(n: string) {
  //   this.name = n;
  // }

  // 上記の省略
  constructor(protected readonly id: string, public name: string) {}

  // このクラスを参照するように明示する
  abstract descrive(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  // しゅうしょくしをつけると省略できる
  constructor(id: string, admins: string[]) {
    super(id, "IT"); //　最初に呼び出す必要がある
    this.admins = admins;
  }

  descrive() {
    console.log("IT" + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string; // 最新のレポート
  private static instance: AccountingDepartment;

  descrive() {
    console.log("アカウント" + this.id);
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません。");
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error("正しい値を入力してください");
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting"); // ベースクラスに変えす値
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return AccountingDepartment.instance;
    }
    return (this.instance = new AccountingDepartment("d2", []));
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.id, this.reports);
  }
}

const employee1 = Department.createEmployee("max");
console.log(employee1);

const IT = new ITDepartment("d1", ["Max", "Manu"]);
IT.descrive();

// const accounting = new AccountingDepartment("d3", []);
const accounting = AccountingDepartment.getInstance();

accounting.descrive();

accounting.addReport("TAKESHI");
accounting.addReport("TANAKA");
console.log(accounting.mostRecentReport);
accounting.mostRecentReport = "通期会計レポート";
accounting.printReports();
console.log(Math);

// IT.addEmployee("Max");
// IT.addEmployee("Manu");

// IT.descrive();
// IT.printEmployeeInfomation();

// const accountingCopy = { name: "hoge", describe: accounting.descrive };

// // Departmentのインスタンスじゃ無いからエラー
// accountingCopy.describe();
