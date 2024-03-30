import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { VerifiyemailComponent } from './verifiyemail/verifiyemail.component';
import { httpInterceptorProviders } from './Services/auth-interceptor.service';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { BoardAdminComponentComponent } from './board-admin-component/board-admin-component.component';
import { FirstviewComponent } from './firstview/firstview.component';
import { FooterComponent } from './footer/footer.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { GestionDevComponent } from './gestion-dev/gestion-dev.component';
import { TestComponent } from './test/test.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ListUsersComponent } from './list-users/list-users.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MessagesModule } from 'primeng/messages'; 
import { SpeedDialModule } from 'primeng/speeddial';
import { AddDevComponent } from './add-dev/add-dev.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { PickListModule } from 'primeng/picklist';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MessageService } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ChangepasswordComponent,
    VerifiyemailComponent,
    ProfileComponentComponent,
    HomeComponentComponent,
    BoardAdminComponentComponent,
    FirstviewComponent,
    FooterComponent,
    ResetpasswordComponent,
    GestionDevComponent,
    TestComponent,
    ListUsersComponent,
    
    AddDevComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule to imports
    MatSnackBarModule,
    DialogModule,
    ButtonModule,
    MatButtonModule,
    MatIconModule,
    ConfirmPopupModule,
    ToastModule,
    PickListModule,
    MatInputModule,
    MatPaginatorModule,
    MatPasswordStrengthModule,
    ListboxModule,
   
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MessagesModule,
    SpeedDialModule,
    FieldsetModule,
    MatDialogModule,
  
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
   
  ],
  providers: [httpInterceptorProviders,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideNativeDateAdapter(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

