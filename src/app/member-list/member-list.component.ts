import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { CommunicationService } from "../Common/Services/communication.service";
import { MemberData, MemberListData } from "../Common/Data/message.struct";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { CommonStrings, MemberListStrings } from "../Common/Data/strings";
import { Router } from "@angular/router";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  title: string = MemberListStrings.title;
  cancel: string = CommonStrings.cancel;
  logout: string = CommonStrings.logout;
  userIdString = MemberListStrings.userId;
  grantYearString = MemberListStrings.grantYear;
  divisionString = MemberListStrings.division;
  partString = MemberListStrings.part;
  groupString = MemberListStrings.group;
  nameString = MemberListStrings.name;
  digestedDaysString = MemberListStrings.digestedDays;
  actionsString = MemberListStrings.actions;

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
    private router: Router,
  ) {}

  ngOnInit(): void {
    const getMenberListObservation = this.dataService.getRequest(
      "http://localhost:3000/memberlist",
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
