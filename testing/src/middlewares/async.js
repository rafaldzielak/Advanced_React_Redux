// eslint-disable-next-line import/no-anonymous-default-export
export default ({ dispatch }) =>
  (next) =>
  (action) => {
    console.log(action);
    console.log(action.payload);
    if (!action.payload || !action.payload.then) return next(action); //we assume that only promises have 'then' property
    action.payload.then(({ data }) => dispatch({ ...action, payload: data }));
  };

// export default function ({ dispatch }) {
//   return function (next) {
//     return function (action) {};
//   };
// }
