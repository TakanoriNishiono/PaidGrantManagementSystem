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
import { MenuModel } from "./Menumodule";
import { CommonStrings } from "../Common/Data/strings";

@Component({
  selector: "app-Menu",
  templateUrl: "./Menu.component.html",
  styleUrls: ["./Menu.component.css"],
})
export class MenuComponent implements OnInit {
  public isFromLocationBack = false;
  back: string = CommonStrings.back;
  disabledChange: boolean = true;
  res: any[] = [];
  model = new MenuModel("", "", "", "");
  profileForm = this.fb.group({
    kaisyaID: [""],
    userID: [""],
    password: [""],
  });

  kaisyacd: string = "";
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
    this.router.navigate(["ScheduledHolidayComponent"]);
  }

  onSubmit1(): void {
    this.router.navigate(["MemberListComponent"]);
  }

  exitManu(): void {
    this.router.navigate(["login"]);
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
