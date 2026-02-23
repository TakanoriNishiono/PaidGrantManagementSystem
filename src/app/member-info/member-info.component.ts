import { Component, OnInit } from "@angular/core";
import { DateAdapter, NativeDateAdapter } from "@angular/material/core";
import { ValidationService } from "../Common/Services/validation.service";

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
      this.mailAddressHint[index] = "無効なメールアドレスです";
    }
  }
}
