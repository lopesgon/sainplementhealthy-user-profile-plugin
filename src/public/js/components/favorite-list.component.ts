import { FavoriteModel } from "../models/favorite";
import FavoriteService from "../services/favorite.service";
import LocalStorageService from "../services/local-storage.service";
import FavoriteItemElement from "./favorite-item.component";

export default class FavoriteListComponent {
  private favoriteListElement: HTMLDivElement;
  private storageKey: string;

  constructor(elementId: string, storageKey: string) {
    this.storageKey = storageKey;
    this.favoriteListElement = document.querySelector(elementId) as HTMLDivElement;
    if (this.favoriteListElement) {
      this.initiateFavoritesDisplay();
    }
  }

  private initiateFavoritesDisplay() {
    LocalStorageService.getItem<FavoriteModel[]>(this.storageKey)?.forEach((favorite) => {
      let favoriteItem = new FavoriteItemElement(favorite, this.deleteFavoriteEvent);
      this.favoriteListElement.appendChild(favoriteItem.getElement());
    });
  }

  deleteFavoriteEvent = (favorite: FavoriteModel) => {
    FavoriteService.toggleFavoriteFromStorage(favorite);
  }
}