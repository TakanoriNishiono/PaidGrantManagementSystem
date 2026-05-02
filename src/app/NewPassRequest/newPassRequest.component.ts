import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MessageComponent } from "../message-component/message-component.component";
import { NewPassRequestStrings } from "../Common/Data/strings";
import { CommonStrings } from "../Common/Data/strings";

@Component({
  selector: "NewPassRequestComponent",
  templateUrl: "./newPassRequest.component.html",
  styleUrls: ["../../CSS/NewPassRequest.css"],
})
export class NewPassRequestComponent {
  title = NewPassRequestStrings.title;
  companyCode: string = CommonStrings.companyCode;
  userID: string = CommonStrings.userID;
  cancel: string = CommonStrings.cancel;
  send: string = NewPassRequestStrings.send;
  openFlg = false;

  constructor(
    public dialogRef: MatDialogRef<NewPassRequestComponent>,
    private dialog: MatDialog,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  sendRequest(): void {
    this.dialogRef.close({
      message: NewPassRequestStrings.requestCompleteMessage,
      button: CommonStrings.close,
    });
  }
}
