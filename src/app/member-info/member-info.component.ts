import { Component, OnInit } from "@angular/core";
import { DateAdapter, NativeDateAdapter } from "@angular/material/core";
import { ValidationService } from "../Common/Services/validation.service";
import { CommonStrings, MemberInfoStrings } from "../Common/Data/strings";

// カレンダーの日付表記を「1日」から「1」に変更する
class MyDateAdapter extends NativeDateAdapter {
  getDateNames(): string[] {
    const dateNames: string[] = [];
    for (let i = 0; i < 31; i++) {
      dateNames[i] = String(i + 1);
    }
    return dateNames;
  }
}

@Component({
  selector: "app-member-info",
  templateUrl: "./member-info.component.html",
  providers: [{ provide: DateAdapter, useClass: MyDateAdapter }],
  styleUrls: ["./member-info.component.css"],
})
export class MemberInfoComponent implements OnInit {
  mailAddressHint: string[] = new Array(3);
  validationService: ValidationService = new ValidationService();

  title: string = MemberInfoStrings.title;
  cancel: string = CommonStrings.cancel;
  registration: string = CommonStrings.registration;
  back: string = CommonStrings.back;
  logout: string = CommonStrings.logout;
  companyCode: string = CommonStrings.companyCode;
  userId: string = CommonStrings.userID;
  boss: string = MemberInfoStrings.boss;
  userPrivileges: string = MemberInfoStrings.userPrivileges;
  employmentStatus: string = MemberInfoStrings.employmentStatus;
  memberId: string = MemberInfoStrings.memberId;
  memberName: string = MemberInfoStrings.memberName;
  joiningDate: string = MemberInfoStrings.joiningDate;
  retirementDate: string = MemberInfoStrings.retirementDate;
  grantDate: string = MemberInfoStrings.grantDate;
  mailAddress1: string = MemberInfoStrings.mailAddress1;
  mailAddress2: string = MemberInfoStrings.mailAddress2;
  mailAddress3: string = MemberInfoStrings.mailAddress3;
  contractStartDate: string = MemberInfoStrings.contractStartDate;

  // @todo 後でAPIから取得する
  bossList: string[] = ["上長1", "上長2", "上長3", "上長4"];
  userPrivilegesList: string[] = ["システム管理者", "管理者", "一般ユーザ"];
  employmentStatusList: string[] = [
    "正社員",
    "無期契約社員",
    "有期契約社員",
    "パート",
    "アルバイト",
    "個人事業主",
  ];

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale("ja");
  }

  ngOnInit(): void {}

  checkMailAddress(event: Event, index: number): void {
    let result: boolean = false;
    let mailAddress = (event.target as HTMLInputElement).value;
    if (mailAddress) {
      const email = (mailAddress as string).trim();
      result = this.validationService.isValidEmailStrict(email);
    } else {
      result = true;
    }

    if (result) {
      this.mailAddressHint[index] = "";
    } else {
      this.mailAddressHint[index] = CommonStrings.invalidMailAddress;
    }
  }
}
