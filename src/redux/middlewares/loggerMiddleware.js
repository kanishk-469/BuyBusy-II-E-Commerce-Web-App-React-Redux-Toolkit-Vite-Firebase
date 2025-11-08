/**
Now we will write our code using middlewares in a pipeline 
to solve our logger problem.
Middlewares are functions , everything in Javascript is a 
function
Middlware is a function in JS gives us access to 3 parameters/
 or 3 values.
 ///We use Currying concept of JS to create middleware in redux/toolkit
 */

//// access to 3 parameters that are store , next , action

export const loggerMiddleware = (store) => {
  return function (next) {
    return function (action) {
      ////log actions
      // console.log("[Action]: " + action);

      // console.log("[Action Payload]: " + action.payload);
      // console.log("[Type of ACTION]: " + typeof action.payload);
      // console.log(`[LOG]: ${action.type} ${new Date().toLocaleString()}`);
      /////call next middleware in the pipeline, optional with action
      next(action);

      /////log the modified state(inside store) of the App
      // console.log(store.getState()); // using raw redux method
    };
  };
};
