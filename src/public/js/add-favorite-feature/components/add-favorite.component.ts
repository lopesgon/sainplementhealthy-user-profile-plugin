import { FavoriteModel } from "../../core/models/favorite";

export default class AddFavoriteComponent {
  private static likedClass = 'liked';

  favoriteElement: HTMLDivElement;
  clickCallback: (value: FavoriteModel) => void;
  favorite: FavoriteModel;

  constructor(favoriteElement: Element, clickCallback: (value: FavoriteModel) => void) {
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
    this.clickCallback = clickCallback;
    this.registerListeners();
  }

  private registerListeners() {
    this.favoriteElement.addEventListener('click', () => this.clickCallback(this.favorite));
  }

  public getId() {
    return this.favorite.id;
  }
  public addLike() {
    this.favoriteElement.classList.add(AddFavoriteComponent.likedClass);
  }
  public removeLike() {
    this.favoriteElement.classList.remove(AddFavoriteComponent.likedClass);
  }
  public toggleLike(added: boolean) {
    added ? this.addLike() : this.removeLike();
  }
}