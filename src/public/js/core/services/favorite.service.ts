// import AddFavoriteComponent from "../../components/add-favorite.component";
import { FavoriteModel } from "../models/favorite";
import FavoriteEntitiesStore from "../states/favorite-entities.store";
import LocalStorageService from "./local-storage.service";

class FavoriteService {
  private static key = 'shupp-favorites';
  private static instance: FavoriteService;

  private constructor() {
    FavoriteEntitiesStore.setState(FavoriteService.getFavoriteList());
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

  public static getFavorite(favoriteId: string): FavoriteModel | undefined {
    return this.getFavoriteList().find(({ id }) => id === favoriteId);
  }

  public static addFavorite(favorite: FavoriteModel) {
    let favorites = this.getFavoriteList();
    const index = favorites.findIndex(({ id }) => id === favorite.id);
    if (index < 0) {
      favorites.push(favorite);
    }
    LocalStorageService.setItem(FavoriteService.key, favorites);
    FavoriteEntitiesStore.setState(favorites);
  }

  public static removeFavorite(favoriteId: string) {
    let favorites = this.getFavoriteList();
    const index = favorites.findIndex(({ id }) => id === favoriteId);
    if (index >= 0) {
      favorites.splice(index, 1);
    }
    LocalStorageService.setItem(FavoriteService.key, favorites);
    FavoriteEntitiesStore.setState(favorites);
  }

  public static toggleFavoriteFromStorage(favorite: FavoriteModel): boolean {
    let values = this.getFavoriteList();
    const index = values.findIndex(({ id }) => id === favorite.id);
    if (index < 0) {
      values.push(favorite);
    } else {
      values.splice(index, 1);
    }

    LocalStorageService.setItem(FavoriteService.key, values);
    FavoriteEntitiesStore.setState(values);
    return index < 0;
  }
}

FavoriteService.getInstance();

export default FavoriteService;