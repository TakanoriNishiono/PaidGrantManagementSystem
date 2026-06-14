import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NewPassRequestStrings } from "../Common/Data/strings";
import { CommonStrings } from "../Common/Data/strings";

@Component({
  selector: "NewPassRequestComponent",
  templateUrl: "./newPassRequest.component.html",
  styleUrls: ["../../CSS/NewPassRequest.css"],
})
export class NewPassRequestComponent {
  title = NewPassRequestStrings.title;
  message = NewPassRequestStrings.dialogMessage;
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
