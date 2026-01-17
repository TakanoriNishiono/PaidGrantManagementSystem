import { Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { DateAdapter, NativeDateAdapter } from "@angular/material/core";
import { FormControl } from "@angular/forms";
import { CommunicationService } from "../Common/Services/communication.service";
import { PaidHolidayComponentData } from "../Common/Data/message.struct";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MessageComponent } from "../message-component/message-component.component";
import { ScheduledHolidayStrings } from "../Common/Data/strings";
import { CommonStrings } from "../Common/Data/strings";

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
  selector: "app-scheduled-holiday",
  templateUrl: "./scheduled-holiday.component.html",
  styleUrls: ["./scheduled-holiday.component.css"],
  providers: [{ provide: DateAdapter, useClass: MyDateAdapter }],
})
export class ScheduledHolidayComponent implements OnInit {
  title: string = ScheduledHolidayStrings.title;
  cancel: string = CommonStrings.cancel;
  logout: string = CommonStrings.logout;
  record: string = ScheduledHolidayStrings.recordSchedule;
  noticeText: string = ScheduledHolidayStrings.noticeGranted;

  dateList: string[] = [
    ScheduledHolidayStrings.holiday1,
    ScheduledHolidayStrings.holiday2,
    ScheduledHolidayStrings.holiday3,
    ScheduledHolidayStrings.holiday4,
    ScheduledHolidayStrings.holiday5,
  ];
  dateInputHint: string[] = new Array(5);
  dateValue: string[] = new Array(5);
  dateForm: FormControl[] = new Array(5);
  startDateForm!: FormControl;
  endDateForm!: FormControl;
  dateName: string[] = new Array(5);
  dateDisabled: boolean[] = [false, false, false, false, false];
  datepickerDisabled: string[] = ["false", "false", "false", "false", "false"];
  checkDisabled: string[] = ["true", "true", "true", "true", "true"];
  grantYears: string[] = new Array(3);
  defaultGrantYear: string | undefined;
  nowGrantYear: string | undefined;
  today: Date = new Date();

  cacheScheduledHolidayData!: PaidHolidayComponentData;
  modifiedScheduledHolidayData: PaidHolidayComponentData[] = new Array(1);

  constructor(
    private router: Router,
    private dataService: CommunicationService,
    private dateAdapter: DateAdapter<NativeDateAdapter>
  ) {
    dateAdapter.setLocale("ja");
  }

  ngOnInit(): void {
    this.defaultGrantYear = this.today.getFullYear().toString();
    this.dateName.forEach((value, index, arr) => {
      value = "Date" + index.toString();
    });

    this.selectGrantYear();
  }

  /**
   * プレースホルダ更新
   * @param index 有給休暇取得予定日番号
   */
  updateInputHint(index: number): void {
    if (Number.isNaN(new Date(this.dateValue[index]).getTime())) {
      // 有給休暇取得予定日未入力
      this.dateInputHint[index] = ScheduledHolidayStrings.dateBlank;
    } else {
      if (this.dateDisabled[index]) {
        this.dateInputHint[index] = ScheduledHolidayStrings.holidayTaken;
      } else {
        var dateNow = new Date(Date.now());
        var dateHoliday = new Date(this.dateValue[index]);
        if (dateHoliday.getTime() > dateNow.getTime()) {
          // 有給休暇取得予定日前
          this.dateInputHint[index] = ScheduledHolidayStrings.dateFuture;
        } else {
          // 有給休暇取得予定日以降
          this.dateInputHint[index] = ScheduledHolidayStrings.datePast;
        }
      }
    }
  }

  /**
   * チェックボックス有効設定更新
   * @param index 有給休暇取得予定日番号
   */
  updateCheckEnable(index: number): void {
    if (Number.isNaN(new Date(this.dateValue[index]).getTime())) {
      // 有給休暇取得予定日未入力
      this.checkDisabled[index] = "true";
    } else {
      var dateNow = new Date(Date.now());
      var dateHoliday = new Date(this.dateValue[index]);
      if (dateHoliday.getTime() > dateNow.getTime()) {
        // 有給休暇取得予定日前
        this.checkDisabled[index] = "true";
      } else {
        // 有給休暇取得予定日以降
        this.checkDisabled[index] = "false";
      }
    }
  }

  updateDatePickerEnable(index: number): void {
    var nowDate: Date = new Date(Date.now());
    var currentGrantIndex: number = 0;

    this.modifiedScheduledHolidayData[0].grantYears.forEach(
      (value, index, arr) => {
        if (
          this.modifiedScheduledHolidayData[0].currentGrantYear ==
          value.getFullYear()
        ) {
          currentGrantIndex = index;
        }
        if (value < nowDate) {
          this.nowGrantYear = this.dateToString(value);
        }
      }
    );
    var startDate: Date = new Date(
      this.modifiedScheduledHolidayData[0].grantYears[currentGrantIndex]
    );

    // 付与日の1年前
    var endDate1: Date = new Date(
      new Date(startDate).setFullYear(startDate.getFullYear() + 1) -
        24 * 60 * 60 * 1000
    );

    if (endDate1 < nowDate) {
      this.datepickerDisabled[index] = "true";
    } else {
      if (this.dateDisabled[index] == true) {
        this.datepickerDisabled[index] = "true";
      } else {
        this.datepickerDisabled[index] = "false";
      }
    }
  }

  /**
   * チェックボックス切り替え
   * @param index 有給休暇取得予定日番号
   * @param checked 有給休暇取得実績
   */
  isChangeCheckBox(index: number, checked: boolean): void {
    this.dateDisabled[index] = checked;
    this.updateInputHint(index);
    this.updateDatePickerEnable(index);
  }

  /**
   * 有給休暇取得予定日変更
   * @param index 有給休暇取得予定日番号
   * @param d 有給休暇取得予定日
   */
  changeScheduledHoliday(index: number, d: any): void {
    this.dateValue[index] = d.toString();

    // JSONデータ更新
    this.modifiedScheduledHolidayData[0].paidHolidayData[index].date = d;
    this.modifiedScheduledHolidayData[0].paidHolidayData[index].digestedFlag =
      this.dateDisabled[index];

    this.dateForm[index] = new FormControl(
      new Date(this.modifiedScheduledHolidayData[0].paidHolidayData[index].date)
    );
    this.updateInputHint(index);
    this.updateCheckEnable(index);
  }

  selectGrantYear() {
    // DBからデータを取得
    const getPaidHolidayObservation = this.dataService.getRequest(
      "http://localhost:3000/paidHoliday_" + this.defaultGrantYear
    );

    getPaidHolidayObservation.subscribe((response: any[]) => {
      this.cacheScheduledHolidayData = new PaidHolidayComponentData(
        response[0] as unknown as PaidHolidayComponentData
      );
      // データを反映
      this.resetScheduledHolidayData();
    });
  }

  trackByItem(index: number, obj: any): any {
    return index;
  }

  exitScheculedHoliday(): void {
    this.router.navigate(["login"]);
  }

  recordScheduledHoliday(): void {
    const postPaidHolidayObservation = this.dataService.postRequest(
      "http://localhost:3000/paidHoliday_2025",
      this.modifiedScheduledHolidayData
    );

    postPaidHolidayObservation.subscribe((response: any[]) => {
      this.cacheScheduledHolidayData = new PaidHolidayComponentData(
        response[0] as unknown as PaidHolidayComponentData
      );
      // データを反映
      this.resetScheduledHolidayData();
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  resetScheduledHolidayData(): void {
    var holidayString: string = "";
    var currentGrantIndex: number = 0;
    var nowDate: Date = new Date(Date.now());
    this.modifiedScheduledHolidayData[0] = new PaidHolidayComponentData(
      this.cacheScheduledHolidayData
    );

    this.modifiedScheduledHolidayData[0].grantYears.forEach(
      (grantYear, index, arr) => {
        this.grantYears[index] = grantYear.getFullYear().toString();
      }
    );
    this.defaultGrantYear =
      this.modifiedScheduledHolidayData[0].currentGrantYear.toString();

    this.nowGrantYear = this.dateToString(
      this.modifiedScheduledHolidayData[0].grantYears[0]
    );

    this.modifiedScheduledHolidayData[0].grantYears.forEach(
      (value, index, arr) => {
        if (
          this.modifiedScheduledHolidayData[0].currentGrantYear ==
          value.getFullYear()
        ) {
          currentGrantIndex = index;
        }
        if (value < nowDate) {
          this.nowGrantYear = this.dateToString(value);
        }
      }
    );

    var startDate: Date = new Date(
      this.modifiedScheduledHolidayData[0].grantYears[currentGrantIndex]
    );
    this.startDateForm = new FormControl(startDate);

    // 付与日の1年前
    var endDate1: Date = new Date(
      new Date(startDate).setFullYear(startDate.getFullYear() + 1) -
        24 * 60 * 60 * 1000
    );

    // 当日の1年後
    var endDate2: Date = new Date(
      new Date(nowDate).setFullYear(nowDate.getFullYear() + 1) -
        24 * 60 * 60 * 1000
    );

    if (endDate1 < endDate2) {
      this.endDateForm = new FormControl(endDate1);
    } else {
      this.endDateForm = new FormControl(endDate2);
    }

    this.modifiedScheduledHolidayData[0].paidHolidayData.forEach(
      (value, index, arr) => {
        holidayString = value.date.toString();
        this.dateValue[index] = holidayString;
        this.dateForm[index] = new FormControl(new Date(value.date));
        this.dateDisabled[index] = value.digestedFlag;
        this.updateDatePickerEnable(index);
        this.updateInputHint(index);
        this.updateCheckEnable(index);
      }
    );
  }

  dateToString(date: Date): string {
    var year: string = date.getFullYear().toString();
    var monthNumber: number = date.getMonth() + 1;
    var month: string = monthNumber.toString();
    var day: string = date.getDate().toString();
    var retValue: string = year + "/" + month + "/" + day;

    return retValue;
  }
}
