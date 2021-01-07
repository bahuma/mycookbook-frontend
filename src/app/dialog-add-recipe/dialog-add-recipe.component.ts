import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../login/login.component';
import {RecipesService} from '../../openapi';

@Component({
  selector: 'app-dialog-add-recipe',
  templateUrl: './dialog-add-recipe.component.html',
  styleUrls: ['./dialog-add-recipe.component.scss']
})
export class DialogAddRecipeComponent implements OnInit {

  form: FormGroup;

  matcher = new MyErrorStateMatcher();

  globalerror = false;

  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogAddRecipeComponent>,
              private recipesService: RecipesService) { }

  ngOnInit(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.form = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(reg)]],
    });
  }

  close(): void {
    this.dialogRef.close('nothing');
  }

  submit(): void {
    const val = this.form.value;

    if (val.url) {
      const cookbook = this.data.cookbook;
      this.loading = true;
      this.globalerror = false;

      this.recipesService.recipesImport(cookbook, {
        url: val.url
      }).subscribe(recipe => {
        console.log(recipe);
        this.dialogRef.close('success');
      }, error => {
        this.globalerror = true;
      });
    }
  }

}
