import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const MATERIAL = [MatDialogModule, MatInputModule];

@NgModule({
  declarations: [],
  imports: [...MATERIAL],
  exports: [...MATERIAL],
})
export class SharedModule {}
