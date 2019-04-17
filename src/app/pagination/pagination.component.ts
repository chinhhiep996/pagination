import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalPage: number;
  @Input() pageSize: number;
  @Output() currentPage = new EventEmitter();
  pageToShow: number = 1;
  pages: number[] = [];
  disabled: boolean = false;
  startPage: number = 1;
  endPage: number;

  constructor(public paginationService: PaginationService) {}

  ngOnInit() {
    this.getLocationPages();
    this.getPages();
    this.currentPage.emit(this.pageToShow);
  }

  getLocationPages() {
    if(this.totalPage <= 6) {
      this.endPage = this.totalPage;
    } else {
      this.endPage = 6;
    }
  }

  getPages(): number[] {
    this.pages = _.range(this.startPage, this.endPage + 1);
    return this.pages;
  }

  getCurrentPage(page: number) {
    this.pageToShow = page;
    this.currentPage.emit(this.pageToShow);
  }

  onNext() {
    if(this.pageToShow < this.totalPage) {
      this.pageToShow += 1;
      if(this.pageToShow > this.endPage) {
        this.endPage += 1;
        this.startPage += 1;
      }
      this.getPages();
      this.currentPage.emit(this.pageToShow);
    }
  }

  onPrevious() {
    if(this.pageToShow > 1) {
      this.pageToShow -= 1;
      if(this.pageToShow < this.startPage) {
        this.endPage -= 1;
        this.startPage -= 1;
      }
      this.getPages();
      this.currentPage.emit(this.pageToShow);
    }
  }

  onLast() {
    this.endPage = this.totalPage;
    if(this.totalPage >= 6) {
      this.startPage = this.endPage - 5;
    } else {
      this.startPage = 1;
    }
    this.pageToShow = this.endPage;
    this.currentPage.emit(this.pageToShow);
    this.getPages();
  }

  onFirst() {
    this.startPage = 1;
    this.pageToShow = this.startPage;
    this.currentPage.emit(this.pageToShow);
    this.getLocationPages();
    this.getPages();
  }

  onJumpNext() {
    if(this.endPage + 6 <= this.totalPage ) {
      this.startPage += 6;
      this.endPage += 6;
    } else if(this.endPage <= this.totalPage) {
      this.startPage = this.endPage;
      this.endPage = this.totalPage;
    }
    this.pageToShow = this.startPage;
    this.currentPage.emit(this.pageToShow);
    this.getPages();
  }

  onJumpPre() {
    if(this.startPage - 6 >= 1 ) {
      this.startPage -= 6;
      this.endPage = this.startPage + 5;
    } else {
      this.startPage = 1;
      this.getLocationPages();
    }
    this.pageToShow = this.startPage;
    this.currentPage.emit(this.pageToShow);
    this.getPages();
  }

  setStatusButton() {

  }
}
