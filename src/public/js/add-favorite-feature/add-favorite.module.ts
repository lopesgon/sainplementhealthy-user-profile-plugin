import { FavoriteModel } from "../core/models/favorite";
import FavoriteService from "../core/services/favorite.service";
import AddFavoriteComponent from "./components/add-favorite.component";

const AddFavoriteModule = () => {
  const addFavoriteSelector = '.shupp-add-favorite-button';
  const addFavoriteComponents: AddFavoriteComponent[] = [];
  
  const toggleFavoriteCallback = (value: FavoriteModel) => {
    const isAdded = FavoriteService.toggleFavoriteFromStorage(value);
    addFavoriteComponents.forEach((elem) => elem.toggleLike(isAdded ? isAdded : false));
  }
  
  const initialize = () => {
    document.querySelectorAll(addFavoriteSelector).forEach((favorite) => {
      try {
        let component = new AddFavoriteComponent(favorite, toggleFavoriteCallback);
        addFavoriteComponents.push(component);
      } catch (error) {
        console.error(error);
      }
    });

    if (addFavoriteComponents.length > 0) {
      const id = addFavoriteComponents[0].getId();
      const favorite = FavoriteService.getFavorite(id);
      if (favorite) {
        addFavoriteComponents.forEach((elem) => elem.addLike());
      }
    }
  }

  return {
    init: initialize()
  }
}

export default AddFavoriteModule;