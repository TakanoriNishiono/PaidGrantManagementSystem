import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { LoginComponent } from "./login/login.component";
import { AppComponent } from "./app.component";
import { NewPassRequestComponent } from "./NewPassRequest/newPassRequest.component";
import { PassChangeComponent } from "./PassChange/passChange.component";
import { MessageComponent } from "./message-component/message-component.component";
import { ScheduledHolidayComponent } from "./scheduled-holiday/scheduled-holiday.component";
import { MenuComponent } from "./Menu/Menu.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { MemberInfoComponent } from "./member-info/member-info.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewPassRequestComponent,
    PassChangeComponent,
    MessageComponent,
    ScheduledHolidayComponent,
    MenuComponent,
    MemberListComponent,
    MemberInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "outline",
        floarLevel: "always",
      },
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
