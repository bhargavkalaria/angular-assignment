import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  exports: [
    MatSidenavModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {
}
