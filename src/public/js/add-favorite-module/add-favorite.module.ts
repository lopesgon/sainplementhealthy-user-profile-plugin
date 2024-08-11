import AddFavoriteComponent from "./components/add-favorite.component";

const AddFavoriteModule = () => {
  const addFavoriteSelector = '.shupp-add-favorite-button';
  const addFavoriteComponents: AddFavoriteComponent[] = [];

  const initialize = () => {
    document.querySelectorAll(addFavoriteSelector).forEach((favorite) => {
      try {
        let component = new AddFavoriteComponent(favorite);
        addFavoriteComponents.push(component);
      } catch (error) {
        console.error(error);
      }
    });
  }

  return {
    init: initialize
  }
}

export default AddFavoriteModule();