import AddFavoriteComponent from "../components/add-favorite.component";
import FavoriteListComponent from "../components/favorite-list.component";
import { FavoriteModel } from "../models/favorite";
import LocalStorageService from "./local-storage.service";

export default class FavoriteService {
  private static key = 'shupp-favorites';
  private static isFavoriteActiveClass = 'liked';
  private static instance: FavoriteService;

  favorites: AddFavoriteComponent[] = [];
  favoriteList: FavoriteListComponent;

  private constructor() {
    this.initiateAddFavoriteComponents();
    this.favoriteList = new FavoriteListComponent('#shupp-favorites', FavoriteService.key);
  }

  static getInstance() {
    if (!FavoriteService.instance) {
      FavoriteService.instance = new FavoriteService();
    }

    return FavoriteService.instance;
  }

  private initiateAddFavoriteComponents() {
    document.querySelectorAll('.shupp-add-favorite-button').forEach((favorite) => {
      this.favorites.push(new AddFavoriteComponent(favorite, this.toggleFavoriteCallback));
    });

    if (this.favorites.length > 0) {
      const isAdded = LocalStorageService.getItem<FavoriteModel[]>(FavoriteService.key)?.some(({ id }) => id === this.favorites[0].getId());
      if (isAdded) {
        this.toggleFavorites(isAdded);
      } else {
        this.toggleFavorites(false);
      }
    }
  }

  private toggleFavorites(isAdded: boolean): void {
    this.favorites.forEach((favorite) => {
      if (isAdded) {
        favorite.favoriteElement.classList.add(FavoriteService.isFavoriteActiveClass);
      } else {
        favorite.favoriteElement.classList.remove(FavoriteService.isFavoriteActiveClass);
      }
    });
  }

  private toggleFavoriteFromStorage(favorite: FavoriteModel): boolean {
    let values = LocalStorageService.getItem<FavoriteModel[]>(FavoriteService.key);
    if (!values) {
      values = [];
    }
    const index = values.findIndex(({ id }) => id === favorite.id);
    if (index < 0) {
      console.debug('Adding favorite', favorite);
      values.push(favorite);
    } else {
      console.debug('Removing favorite', favorite);
      values.splice(index, 1);
    }

    LocalStorageService.setItem(FavoriteService.key, values);
    return index < 0;
  }

  toggleFavoriteCallback = (value: FavoriteModel) => {
    const isAdded = this.toggleFavoriteFromStorage(value);
    this.toggleFavorites(isAdded);
  }
}