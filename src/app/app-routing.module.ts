import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: 'new', component: RecipeEditComponent }, //Order is imp
      { path: ':id/edit', component: RecipeEditComponent }, //Order is imp
      { path: ':id/:name', component: RecipeDetailComponent }, //Order is imp
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  { path: 'error-page', component: ErrorComponent },
  { path: '**', redirectTo: 'error-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
