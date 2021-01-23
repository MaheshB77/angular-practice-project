import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shippingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shippingListService.getIngredients();
  }

  onEditIngredient(index: number) {
    this.shippingListService.currentlyEditing.next(index);
  }
}
