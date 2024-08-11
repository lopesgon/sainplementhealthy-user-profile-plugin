import { FavoriteModel } from "../../core/models/favorite";
import FavoriteService from "../../core/services/favorite.service";
import FavoriteEntitiesStore from "../../core/states/favorite-entities.store";

export default class AddFavoriteComponent {
  private static likedClass = 'liked';

  favoriteElement: HTMLDivElement;
  favorite: FavoriteModel;

  constructor(favoriteElement: Element) {
    if (!(favoriteElement instanceof HTMLDivElement)) {
      throw new Error('Element is not a div and cannot be instanciated.');
    }

    const { postId, title, url, thumbnail } = favoriteElement.dataset;
    if (!postId || !title || !url || !thumbnail) {
      favoriteElement.remove();
      throw new Error('Element is missing required data attributes.');
    }

    this.favoriteElement = favoriteElement;
    this.favorite = { id: postId, title: title, url: url, thumbnail: thumbnail };
    this.registerListeners();
  }

  private registerListeners() {
    this.favoriteElement.addEventListener('click', () => FavoriteService.toggleFavoriteFromStorage(this.favorite));

    FavoriteEntitiesStore.subscribe((favorites: FavoriteModel[]) => {
      if (favorites.some(({ id }) => id === this.favorite.id)) {
        this.addLike();
      } else {
        this.removeLike();
      }
    });
  }
  private addLike() {
    this.favoriteElement.classList.add(AddFavoriteComponent.likedClass);
  }
  private removeLike() {
    this.favoriteElement.classList.remove(AddFavoriteComponent.likedClass);
  }
}