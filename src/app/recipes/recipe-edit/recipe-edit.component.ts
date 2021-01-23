import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isNewRecipe: boolean = false;
  currentlyEditingRecipe: Recipe;
  recipeEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) {
        this.isNewRecipe = true; //If we are creating the new recipe  i.e ('recipe/new' route)
      } else {
        this.id = parseInt(params['id']); //If we are editing the already existing recipe i.e ('recipe/1/edit' route)
        this.isNewRecipe = false;
      }

      this.initForm();
    });
  }

  initForm() {
    let name = '';
    let imagePath = '';
    let description = '';

    // FormArray for ingredients
    let recipeIngredients = new FormArray([]);

    if (!this.isNewRecipe) {
      this.currentlyEditingRecipe = this.recipesService.getRecipeById(this.id);
      name = this.currentlyEditingRecipe.name;
      imagePath = this.currentlyEditingRecipe.imagePath;
      description = this.currentlyEditingRecipe.description;

      // Putting values of ingredients into FormArray
      if (this.currentlyEditingRecipe.ingredients) {
        for (let ingredient of this.currentlyEditingRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    // Creating main form
    this.recipeEditForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients, //FormArray
    });
  }

  onSubmit() {
    // If new recipe
    if (this.isNewRecipe) {
      let id = this.recipesService.getRecipes().length + 1;
      let recipeToAdd = new Recipe(
        id,
        this.recipeEditForm.value['name'],
        this.recipeEditForm.value['description'],
        this.recipeEditForm.value['imagePath'],
        this.recipeEditForm.value['ingredients']
      );
      this.recipesService.addRecipe(recipeToAdd);
    } else {
      let recipeToAdd = new Recipe(
        this.id, //Id that is present in the route
        this.recipeEditForm.value['name'],
        this.recipeEditForm.value['description'],
        this.recipeEditForm.value['imagePath'],
        this.recipeEditForm.value['ingredients']
      );
      this.recipesService.updateRecipe(this.id, recipeToAdd);
    }

    // Navigate to the /recipes after adding or editing the recipes
    this.router.navigate(['/recipes']);
  }

  // Getter for getting ingredient controls
  get ingredientControls() {
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }
}
