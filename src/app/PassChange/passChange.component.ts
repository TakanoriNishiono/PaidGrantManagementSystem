import { Component, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommunicationService } from "../Common/Services/communication.service";
import { PassChangeData } from "../Common/Data/message.struct";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MessageComponent } from "../message-component/message-component.component";
import { PassChangeStrings } from "../Common/Data/strings";
import { CommonStrings } from "../Common/Data/strings";

@Component({
  selector: "app-root",
  templateUrl: "./passChange.component.html",
  styleUrls: ["../../CSS/PassChange.css"],
})
export class PassChangeComponent implements OnInit {
  title: string = PassChangeStrings.title;
  companyCode: string = CommonStrings.companyCode;
  userID: string = CommonStrings.userID;
  cancel: string = CommonStrings.cancel;
  back: string = CommonStrings.back;
  strOldPass: string = PassChangeStrings.oldPass;
  strNewPass1: string = PassChangeStrings.newPass1;
  strNewPass2: string = PassChangeStrings.newPass2;
  passChange: string = PassChangeStrings.passChange;

  oldPass: string = "";
  newPass1: string = "";
  newPass2: string = "";
  hintOldPass: string = "";
  hintNewPass1: string = "";
  hintNewPass2: string = "";

  disabledChange: boolean = true;
  log: string = "";
  res: any[] = [];

  passChangeData!: PassChangeData;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dataService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.hintOldPass = PassChangeStrings.oldPassHelp;
    this.hintNewPass1 = PassChangeStrings.newPass1Invalid;
    this.hintNewPass2 = PassChangeStrings.newPass2Help;

    this.disabledChange = true;
  }

  sendNewPassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    dialogConfig.width = "500px";
    dialogConfig.disableClose = true;

    const loginObservation = this.dataService.getRequest(
      "http://localhost:3000/successChangePassword"
    );

    loginObservation.subscribe((response: any[]) => {
      this.res = response;

      if (this.res[0].AuthenticationResult == "AuthenticationSuccess") {
        dialogConfig.data = {
          message: "パスワードを変更しました。",
          button: "OK",
        };

        const dialogRef = this.dialog.open(MessageComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(["ScheduledHolidayComponent"]);
        });
      } else {
        dialogConfig.data = {
          message: "パスワードの変更に失敗しました。",
          button: "OK",
        };

        const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
      }
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  checkOldPassword(event: Event): void {
    this.oldPass = (event.target as HTMLInputElement).value;

    this.checkPassword();
  }

  checkNewPassword1(event: Event): void {
    this.newPass1 = (event.target as HTMLInputElement).value;

    this.updateHintNewPass();
  }

  checkNewPassword2(event: Event): void {
    this.newPass2 = (event.target as HTMLInputElement).value;

    this.updateHintNewPass();
  }

  updateHintNewPass(): void {
    // 半角英小文字大文字数字それぞれ1種類以上含む8文字以上40文字以下ならtrue
    const passWordRegEx = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,40}$/;
    const validPass: boolean = passWordRegEx.test(this.newPass1);

    if (validPass) {
      this.hintNewPass1 = PassChangeStrings.newPass1Valid;
      if (this.newPass1 == this.newPass2) {
        this.hintNewPass2 = PassChangeStrings.newPass2Match;
      } else {
        this.hintNewPass2 = PassChangeStrings.newPass2Unmatch;
      }
    } else {
      this.hintNewPass1 = PassChangeStrings.newPass1Invalid;
      this.hintNewPass2 = PassChangeStrings.newPass2Help;
    }
    this.checkPassword();
  }

  checkPassword(): void {
    if (this.newPass1 == this.newPass2) {
      if (this.oldPass != "") {
        this.disabledChange = false;
      } else {
        this.disabledChange = true;
      }
    } else {
      this.disabledChange = true;
    }
  }

  exitPassChange(): void {
    this.router.navigate(["login"]);
  }
}
