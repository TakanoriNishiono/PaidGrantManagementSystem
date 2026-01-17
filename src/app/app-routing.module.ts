import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PassChangeComponent } from "./PassChange/passChange.component";
import { NewPassRequestComponent } from "./NewPassRequest/newPassRequest.component";
import { LoginComponent } from "./login/login.component";
import { ScheduledHolidayComponent } from "./scheduled-holiday/scheduled-holiday.component";
import { MessageComponent } from "./message-component/message-component.component";
import { MenuComponent } from "./Menu/Menu.component";
import { MemberListComponent } from "./member-list/member-list.component";

const routes: Routes = [
  { path: "PassChangeComponent", component: PassChangeComponent },
  { path: "NewPassRequestComponent", component: NewPassRequestComponent },
  { path: "login", component: LoginComponent },
  { path: "ScheduledHolidayComponent", component: ScheduledHolidayComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "MessageComponent", component: MessageComponent },
  { path: "Menu", component: MenuComponent },
  { path: "MemberListComponent", component: MemberListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
