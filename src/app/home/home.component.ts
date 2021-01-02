import { Component, OnInit } from '@angular/core';
import {CookbooksService} from '../../openapi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cookbook: any;

  constructor(private cookbooksService: CookbooksService) { }

  ngOnInit(): void {
    this.cookbooksService.cookbooksList().subscribe(cookbooks => {
      this.cookbook = cookbooks[0].id;
    });
  }

}
