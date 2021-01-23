import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  dropdown = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = parseInt(params['id']);
      this.selectedRecipe = this.recipeService.getRecipeById(id);
    });
  }

  // Toggling the dropdown
  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  addToShoppingList() {
    console.log('Add to shopping list');
    console.log(this.selectedRecipe.ingredients);
    this.shoppingListService.addIngredients(this.selectedRecipe.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.selectedRecipe.id);
    this.router.navigate(['./recipes']);
  }
}
