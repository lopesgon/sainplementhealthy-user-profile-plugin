// import AddFavoriteComponent from "../../components/add-favorite.component";
import { FavoriteModel } from "../models/favorite";
import LocalStorageService from "./local-storage.service";

export default class FavoriteService {
  private static key = 'shupp-favorites';
  private static instance: FavoriteService;


  private constructor() {
  }

  static getInstance() {
    if (!FavoriteService.instance) {
      FavoriteService.instance = new FavoriteService();
    }

    return FavoriteService.instance;
  }

  public static getFavoriteList(): FavoriteModel[] {
    let values = LocalStorageService.getItem<FavoriteModel[]>(FavoriteService.key);
    if (!values) {
      values = [];
    }
    return values;
  }

  public static getFavorite(favoriteId: string) {
    return LocalStorageService.getItem<FavoriteModel[]>(FavoriteService.key)?.some(({ id }) => id === favoriteId);
  }

  public static addFavorite(favorite: FavoriteModel) {
    let favorites = this.getFavoriteList();
    const index = favorites.findIndex(({ id }) => id === favorite.id);
    if (index < 0) {
      favorites.push(favorite);
    }
    LocalStorageService.setItem(FavoriteService.key, favorites);
  }

  public static removeFavorite(favoriteId: string) {
    let favorites = this.getFavoriteList();
    const index = favorites.findIndex(({ id }) => id === favoriteId);
    if (index >= 0) {
      favorites.splice(index, 1);
    }
    LocalStorageService.setItem(FavoriteService.key, favorites);
  }

  public static toggleFavoriteFromStorage(favorite: FavoriteModel): boolean {
    let values = this.getFavoriteList();
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
}