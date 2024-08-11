import FavoriteListComponent from "./components/favorite-list.component";

const FavoritesListModule = () => {
  const componentSelector = '#shupp-favorites';

  // let favoritesListComponent: FavoriteListComponent;

  const initialize = () => {
    new FavoriteListComponent(componentSelector);
  }

  return {
    init: initialize
  }
}

export default FavoritesListModule();