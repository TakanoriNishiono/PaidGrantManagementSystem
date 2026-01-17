import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { CommunicationService } from "../Common/Services/communication.service";
import { MemberData, MemberListData } from "../Common/Data/message.struct";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { CommonStrings, MembeerListStrings } from "../Common/Data/strings";
import { Router } from "@angular/router";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  title: string = "メンバー一覧";
  cancel: string = CommonStrings.cancel;
  logout: string = CommonStrings.logout;
  userIdString = MembeerListStrings.userId;
  grantYearString = MembeerListStrings.grantYear;
  divisionString = MembeerListStrings.division;
  partString = MembeerListStrings.part;
  groupString = MembeerListStrings.group;
  nameString = MembeerListStrings.name;
  digestedDaysString = MembeerListStrings.digestedDays;
  actionsString = MembeerListStrings.actions;

  displayedColumns: string[] = [
    "UserID",
    "GrantYear",
    "Division",
    "Part",
    "Group",
    "Name",
    "DigestedDays",
    "Actions",
  ];
  dataSource!: MatTableDataSource<MemberData>;
  memberData: MemberData[] = [];
  memberNum: number = 0;
  data: string = "";

  constructor(
    private dataService: CommunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const getMenberListObservation = this.dataService.getRequest(
      "http://localhost:3000/memberlist"
    );
    getMenberListObservation.subscribe((response: any[]) => {
      this.dataSource = new MatTableDataSource<MemberData>();
      response.forEach((value, index, arr) => {
        this.dataSource.data.push(value as unknown as MemberData);
      });
    });
  }

  clickEvent() {}

  execLogout(): void {
    this.router.navigate(["login"]);
  }
}
