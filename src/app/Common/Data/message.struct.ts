/** 送信:パスワード変更 */
export class PassChangeData {
  companyCode!: string;
  userID!: string;
  oldPassword!: string;
  newPassword!: string;

  constructor() {
    this.companyCode = "";
    this.userID = "";
    this.oldPassword = "";
    this.newPassword = "";
  }
}

/** 有給休暇取得データ */
class PaidHolidayData {
  num: number = 0;
  date!: Date;
  digestedFlag: boolean = false;

  constructor(_srcData: PaidHolidayData) {
    this.num = _srcData.num;
    this.date = new Date(_srcData.date);
    this.digestedFlag = _srcData.digestedFlag;
  }
}

/** 受信:有給休暇予実管理データ */
export class PaidHolidayComponentData {
  paidHolidayData: PaidHolidayData[] = new Array(5);
  currentGrantYear: number = 2023;
  grantYears: Date[] = new Array(3);
  updateUserName: string = "";

  constructor(_srcData: PaidHolidayComponentData) {
    _srcData.paidHolidayData.forEach((value, index, arr) => {
      this.paidHolidayData[index] = new PaidHolidayData(value);
    });

    this.currentGrantYear = _srcData.currentGrantYear;

    _srcData.grantYears.forEach((value, index, arr) => {
      this.grantYears[index] = new Date(value);
    });

    this.updateUserName = _srcData.updateUserName;
  }
}

/** メンバーデータ */
export interface MemberData {
  UserID: string;
  GrantYear: number;
  Division: string;
  Part: string;
  Group: string;
  Name: string;
  DigestedDays: number;
  AlertInfo: boolean;
}

// export class MemberData {
//   UserID: string = "";
//   GrantYear: number = 0;
//   Division: string = "";
//   Part: string = "";
//   Group: string = "";
//   Name: string = "";
//   DigestedDays: number = 0;
//   AlertInfo: boolean = false;

//   constructor(_srcData: MemberData) {
//     this.UserID = _srcData.UserID;
//     this.GrantYear = _srcData.GrantYear;
//     this.Division = _srcData.Division;
//     this.Part = _srcData.Part;
//     this.Group = _srcData.Group;
//     this.Name = _srcData.Name;
//     this.DigestedDays = _srcData.DigestedDays;
//     this.AlertInfo = _srcData.AlertInfo;
//   }
// }

/** メンバーリストデータ */
export class MemberListData {
  memberData: MemberData[] = [];

  constructor(_srcData: MemberData[]) {
    this.memberData = new Array();
    _srcData.forEach((value, index, arr) => {
      this.memberData.push(value);
    });
  }
}
