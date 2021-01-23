import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipesService {
  recipeSubject = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Pizza',
      'This is a delicius Pizza recipe',
      'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      [new Ingredient('Bread', 2), new Ingredient('Meat', 20)]
    ),
    new Recipe(
      2,
      'Burger',
      'One of the best burger on the planet',
      'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      [new Ingredient('Cheese', 4), new Ingredient('Salad', 5)]
    ),
  ];

  getRecipes() {
    return [...this.recipes];
  }

  getRecipeById(id: number): Recipe {
    const recipe = this.recipes.find((recipe) => recipe.id === id);
    return recipe;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeSubject.next([...this.recipes]);
  }

  updateRecipe(id: number, updatedRecipe: Recipe) {
    this.recipes[id - 1] = updatedRecipe;
    this.recipeSubject.next([...this.recipes]);
  }

  deleteRecipe(id: number) {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.recipeSubject.next([...this.recipes]);
  }
}
