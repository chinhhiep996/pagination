import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalPage: number;
  @Input() pageSize: number;
  pageCount: number = 0;
  pages: number[] = [];
  disabled: boolean = false;
  pager: any = {};

  constructor(public paginationService: PaginationService) {}

  ngOnInit() {
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPage) {
      return;
    }

    this.pager = this.paginationService.getPager(this.totalPage, page);
  }
}
