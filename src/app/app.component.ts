import { Component } from '@angular/core';
import {CookbooksService, RecipesService} from '../openapi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mycookbook';
}
