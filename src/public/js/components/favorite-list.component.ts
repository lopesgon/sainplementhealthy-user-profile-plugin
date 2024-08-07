import { FavoriteModel } from "../models/favorite";
import LocalStorageService from "../services/local-storage.service";

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
      let favoriteElement = document.createElement('div');
      favoriteElement.classList.add('shupp-favorite');

      let anchorElement = document.createElement('a');
      anchorElement.href = favorite.url;

      let imgElement = document.createElement('img');
      imgElement.src = favorite.thumbnail;
      anchorElement.appendChild(imgElement);

      let titleElement = document.createElement('h3');
      titleElement.innerHTML = `${favorite.id} - ${favorite.title}`;
      anchorElement.appendChild(titleElement);
      favoriteElement.appendChild(anchorElement);

      this.favoriteListElement.appendChild(favoriteElement);
    });
  }

}