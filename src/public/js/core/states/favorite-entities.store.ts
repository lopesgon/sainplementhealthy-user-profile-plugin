import { FavoriteModel } from "../models/favorite";


const FavoriteEntitiesStore = () => {
  let state: FavoriteModel[];
  let listeners: ((entities: FavoriteModel[]) => void)[] = [];

  // Method to notify all listeners about the state change
  const notify = async () => {
    // listeners.forEach(listener => listener(state));
    
    // Notify each listener asynchronously without waiting for the others
    const promises = listeners.map(listener => {
      return new Promise((resolve) => {
        resolve(listener(state));  // Resolve the promise after calling the listener
      });
    });

    // Wait for all listeners to be notified
    await Promise.all(promises);
  }

  // Method to update the state and notify all listeners
  const setState = (newState: FavoriteModel[]) => {
    state = [...newState];
    notify();
  }

  // Method to add a listener
  const subscribe = (listener: (entities: FavoriteModel[]) => void) => {
    listeners.push(listener);
    listener(state);
  }

  // Method to get the current state
  const getState = () => {
    return state;
  }

  return {
    getState: getState,
    subscribe: subscribe,
    setState: setState
  }
}

export default FavoriteEntitiesStore();