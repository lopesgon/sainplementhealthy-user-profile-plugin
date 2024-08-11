import AddFavoriteModule from "./add-favorite-module/add-favorite.module";
import FavoritesListModule from "./favorites-list-module/favorites-list.module";
import DOMReadiness from "./shared/DOMReadiness";

if (process.env.NODE_ENV !== 'production') {
  console.warn('SHUPP Plugin - Public: Development mode!');
}

DOMReadiness(() => {
  AddFavoriteModule.init();
  FavoritesListModule.init();
});
