import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NewPassRequestComponent } from "../NewPassRequest/newPassRequest.component";
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CommunicationService } from "../Common/Services/communication.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { LoginModel } from "./loginmodule";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public isFromLocationBack = false;
  disabledChange: boolean = true;
  res: any[] = [];
  model = new LoginModel("", "", "", "");
  profileForm = this.fb.group({
    kaisyaID: [""],
    userID: [""],
    password: [""],
  });

  kaisyacd: string = "";
  userID: string = "";
  warnning: string = "";

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dataService: CommunicationService,
    private fb: FormBuilder
  ) {}

  chkkaisyacd(event: Event): void {
    this.kaisyacd = (event.target as HTMLInputElement).value;
    this.kaisya();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    dialogConfig.width = "500px";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(NewPassRequestComponent, dialogConfig);
  }

  kaisya(): void {
    if (this.kaisyacd != "") {
      this.disabledChange = false;
    } else {
      this.disabledChange = true;
    }
  }

  ngOnInit(): void {
    this.disabledChange = true;
  }

  onSubmit(): void {
    if (this.kaisyacd == "syscoms") {
      /*this.router.navigate(["ScheduledHolidayComponent"]);*/
      this.router.navigate(["Menu"]);
    } else {
      this.warnning =
        "ログインに失敗しました。正しいコードを入力してください。";
    }
  }

  onSubmit1(): void {
    this.router.navigate(["PassChangeComponent"]);
  }

  ngOnDestroy() {
    // このcomponent が破棄されるとき、戻るボタンから遷移確認flagを初期化する
    this.isFromLocationBack = false;
  }

  ScheduledHolidayComponent() {
    const loginObservation = this.dataService.getRequest(
      "http://localhost:3000/items"
    );
  }
}
