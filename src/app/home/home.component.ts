import {Component, OnInit, ViewChild} from '@angular/core';
import {CookbooksService} from '../../openapi';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogAddRecipeComponent} from '../dialog-add-recipe/dialog-add-recipe.component';
import {RecipeListComponent} from '../recipe-list/recipe-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cookbook: any;

  @ViewChild(RecipeListComponent) recipeList: RecipeListComponent;

  constructor(private cookbooksService: CookbooksService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cookbooksService.cookbooksList().subscribe(cookbooks => {
      this.cookbook = cookbooks[0].id;
    });
  }

  showAddDialog(): void {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.minWidth = 500;

    dialogConfig.data = {
      cookbook: this.cookbook,
    };

    const dialogRef = this.dialog.open(DialogAddRecipeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === 'success') {
        this.recipeList.load();
      }
    });
  }
}
