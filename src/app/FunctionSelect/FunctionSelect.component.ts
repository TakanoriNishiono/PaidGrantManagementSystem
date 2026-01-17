import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-FunctionSelect",
  templateUrl: "./FunctionSelect.Component.html",
  styleUrls: ["./FunctionSelect.Component.css"],
})
export class FunctionSelectComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private activerote: ActivatedRoute
  ) {}
  ngOnInit(): void {}
  onSubmit(): void {
    //this.router.navigate(["ScheduledHolidayComponent"]);
    this.router.navigate(["FunctionSelectComponent"]);
  }
  goback(): void {
    //this.location.back();
    this.router.navigate(["login"]);
  }
}
