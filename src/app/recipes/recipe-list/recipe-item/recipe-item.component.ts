import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {}

  selectRecipe() {
    // this.recipesService.selectedRecipe.emit(this.recipe);
  }
}
