// NOTE: We not use this file in this project anywhere,
//       it just used for explaning rules of "reducer"

import axios from "axios";

// 1. Must return any value besides 'undefined'
//    reducers have to return any value beside "undefined"
//    when we using redux project, means when we using "action creators" and "reducers"
//    then "reducers" run immediently when project starts(components renders)
//    IMPORTANT: when reducers first run(authomatically), then state is === undefiined
//               "undefined" gives error and this is not react rule this is javascript rule
//EXAMPLE:
const example1 = (state = {}, action) => {
  //
  // what state={} does following code
  if (state === undefined) {
    state === {};
  }
};

// 2. Produces 'state', or data to be used inside of your app using only previous state and the action

//    i think no need to explain for this rule, but little bit
//    when reducer first run its value is what we initially give it "state =[]"
//    after reducers gets again run then state is going to change "state=SOMETHING"
//    when reducers run again for third and more on then value of "state" must be change from previous state only

// 3. Must not return reach 'out of itself' to decide what value to return (reducers are pure)
//    we must use "Action" and "state" to change state or data
//EXAMPLE:
const example2 = (state = [], action) => {
  // bad!
  axios.get("https://something/");

  // good
  if (action.type === something) {
    return action.payload;
  }
};
