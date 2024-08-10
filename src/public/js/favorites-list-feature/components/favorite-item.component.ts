import { FavoriteModel } from "../../core/models/favorite";

export default class FavoriteItemElement {

  private static deleteIcon = `
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none">
      <path d="M10 11V17" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 11V17" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 7H20" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  favorite: FavoriteModel;
  deleteCallback: (favorite: FavoriteModel) => void;

  private favoriteElement: HTMLDivElement;
  private anchorElement: HTMLAnchorElement;
  private favoriteImageElement: HTMLImageElement;
  private titleElement: HTMLHeadingElement;



  constructor(favorite: FavoriteModel, deleteCallback: (favorite: FavoriteModel) => void) {

    this.favorite = favorite;
    this.deleteCallback = deleteCallback;

    this.favoriteElement = document.createElement('div');
    this.favoriteElement.classList.add('shupp-favorite-item-container');

    this.anchorElement = document.createElement('a');
    this.anchorElement.href = this.favorite.url;
    this.anchorElement.classList.add('shupp-favorite-item');

    this.favoriteImageElement = document.createElement('img');
    this.favoriteImageElement.classList.add('shupp-favorite-item-image');
    this.favoriteImageElement.src = this.favorite.thumbnail;
    this.anchorElement.appendChild(this.favoriteImageElement);

    this.titleElement = document.createElement('h3');
    this.titleElement.classList.add('shupp-favorite-item-title');
    this.titleElement.innerHTML = `${this.favorite.title}`;
    this.anchorElement.appendChild(this.titleElement);

    // let deleteIcon = `${cookiesMadeSimpleProperties.getPluginUrl}/public/assets/delete.svg`;
    // let deleteElement = document.createElement('img');
    // deleteElement.src = deleteIcon;
    let deleteElement = document.createElement('div');
    deleteElement.innerHTML = FavoriteItemElement.deleteIcon;
    deleteElement.classList.add('shupp-favorite-item-delete');
    deleteElement.addEventListener('click', () => this.delete());
    this.favoriteElement.appendChild(deleteElement);

    this.favoriteElement.appendChild(this.anchorElement);
  }

  public getElement(): HTMLDivElement {
    return this.favoriteElement;
  }

  private delete() {
    this.deleteCallback(this.favorite);
    this.favoriteElement.remove();
  }
}