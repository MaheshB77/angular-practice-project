import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editingItemIndex: number;
  editingItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.currentlyEditing.subscribe(
      (index) => {
        this.editMode = true;
        this.editingItemIndex = index;
        this.editingItem = this.shoppingListService.getIngredient(
          this.editingItemIndex
        );

        this.ingredientForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount,
        });
      }
    );
  }

  onAddIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editingItemIndex,
        ingredient
      );
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.ingredientForm.reset();
    this.editMode = false;
  }

  resetForm() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.ingredientForm.reset();
    this.editMode = false;
    this.shoppingListService.deleteIngredient(this.editingItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
