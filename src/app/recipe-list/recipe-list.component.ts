import {Component, Input, OnInit} from '@angular/core';
import {Recipe, RecipesService} from '../../openapi';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Input() cookbook: number;

  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipesService.recipesList(this.cookbook).subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  getSourceBase(source: string): string {
    const url = new URL(source);
    return url.hostname;
  }
}
