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
  title = "NewPasswordRequest";
  companyCode: string = CommonStrings.companyCode;
  userID: string = CommonStrings.userID;
  cancel: string = CommonStrings.cancel;
  send: string = NewPassRequestStrings.send;
  openFlg = false;

  constructor(
    public dialogRef: MatDialogRef<NewPassRequestComponent>,
    private dialog: MatDialog
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  sendRequest(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    dialogConfig.width = "500px";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
  }
  // openDialog(): void {
  //   Swal.fire({
  //     html: "仮パスワードが発行されました。<br/>メールが届かない場合には、再度、仮パスワード発行をしてください。",
  //     showConfirmButton: true,
  //     customClass: {
  //       confirmButton: "swalConfirmButton",
  //     },
  //   }).then(function () {
  //     window.location.href = "./login";
  //   });
  // }

  // openMessage(): void {
  //   prompt("test", "");
  // }
}
