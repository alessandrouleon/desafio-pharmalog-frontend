import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { PagesRoutingModule } from '../pages/pages-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    FeedbackComponent,
    ModalDeleteComponent,
    HeaderComponent
  ],
  imports: [
    PagesRoutingModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule ,
    CommonModule
  ],
  exports: [
    CommonModule,
    FeedbackComponent,
    ModalDeleteComponent,
    HeaderComponent
  ]
})
export class SharedModule {
}
