import { FavoriteModel } from "../../core/models/favorite";
import FavoriteService from "../../core/services/favorite.service";
import FavoriteItemElement from "./favorite-item.component";

export default class FavoriteListComponent {
  private favoriteListElement: HTMLDivElement;

  constructor(elementId: string) {
    this.favoriteListElement = document.querySelector(elementId) as HTMLDivElement;
    if (this.favoriteListElement) {
      this.initiateFavoritesDisplay();
    }
  }

  private initiateFavoritesDisplay() {
    FavoriteService.getFavoriteList().forEach((favorite) => {
      let favoriteItem = new FavoriteItemElement(favorite, this.deleteFavoriteEvent);
      this.favoriteListElement.appendChild(favoriteItem.getElement());
    });
  }

  deleteFavoriteEvent = (favorite: FavoriteModel) => {
    FavoriteService.removeFavorite(favorite.id);
  }
}