import FavoriteService from "./services/favorite.service";
import DOMReadiness from "./shared/DOMReadiness";

if (process.env.NODE_ENV !== 'production') {
  console.warn('SHUPP Plugin - Public: Development mode!');
}

DOMReadiness(() => {
  console.log('SHUPP Plugin - Public: DOM loaded');
  FavoriteService.getInstance();
});
