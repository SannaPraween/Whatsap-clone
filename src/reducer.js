export const initialState = {
  user: null,
};
export const actionTypes = {
<<<<<<< HEAD
  SET_USER: 'SET_USER',
};

const reducer = (state, action) => {
  // console.log('👌👌👌👌', action);
=======
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
>>>>>>> 08558408c37f613c62464f37c6786049e0d1f510
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
