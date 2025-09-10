import { TuiFormatNumberPipe, TuiRoot } from "@taiga-ui/core";
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiDataListWrapper, TuiPagination } from "@taiga-ui/kit";
import { AsyncPipe, CommonModule, NgForOf } from "@angular/common";
import { TuiContext, TuiStringHandler } from "@taiga-ui/cdk";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiTable } from "@taiga-ui/addon-table";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  
}
