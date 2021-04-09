const initialState = {
  wishList: {
    movies: [],
    tv: [],
  },
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'user/addWish':
      return {
        ...state,
        wishList: {
          ...state.wishList,
          [payload.mediaType]: [
            ...state.wishList[payload.mediaType],
            payload.data,
          ],
        },
      };
    case 'user/removeWish':
      return {
        ...state,
        wishList: {
          ...state.wishList,
          [payload.mediaType]: [
            ...state.wishList[payload.mediaType].filter(
              wish => wish.id !== payload.data.id,
            ),
          ],
        },
      };
    default:
      return state;
  }
};

export default user;
