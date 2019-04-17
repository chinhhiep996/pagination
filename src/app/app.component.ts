import { Component } from '@angular/core';
import { PaginationService } from './pagination/pagination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalPage: number = 15;
  pageSize: number = 20;
}
