import { FavoriteModel } from "../../core/models/favorite";
import favoriteEntitiesStore from "../../core/states/favorite-entities.store";
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
    favoriteEntitiesStore.subscribe((entities: FavoriteModel[]) => {
      let children: HTMLDivElement[] = [];
      entities.forEach((favorite) => {
        let favoriteItem = new FavoriteItemElement(favorite);
        // this.favoriteListElement.appendChild(favoriteItem.getElement());
        children.push(favoriteItem.getElement());
      });

      this.favoriteListElement.replaceChildren(...children);
    });
  }
}