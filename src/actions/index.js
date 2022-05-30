import _ from "lodash"; // lodash is JAVASCRIPT library (npm install --save lodash)
import jsonPlaceholder from "../apis/jsonPlaceholder";

// you can read and understand this function after below 2 action creator(or simply move this to bottom)
export const fetchPostsAndUsers = () => {
  return async (dispatch, getState) => {
    await dispatch(fetchPosts());

    const userIds = _.uniq(_.map(getState().posts, "userId"));
    // _.map() iterate over "getState().posts" and pull out "userId" property
    // _.uniq() returns array of unique "userId"

    userIds.forEach((id) => dispatch(fetchUser(id)));

    // we can use lodash's "chainning" method also
    // _.chain(getState().posts)      // this argument is provided to next chain method as first argument
    // .map('userId')              // "getState().posts" provided as first argument behind the scenes
    // .uniq()                     // _.uniq() receives "_.map" result as first arguement
    // .forEach((id) => dispatch(fetchUser(id)))
    // .value();    // this needs to execute
  };
};
export const fetchPosts = () => {
  return async (dispatch, getState) => {
    // we can remove "getstate"
    const response = await jsonPlaceholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: "FETCH_USER", payload: response.data });
  };
};
// export const fetchUser = (id) => {
//     return (dispatch) => {            // remember no need of "getState"
//        _fetchUser(id, dispatch);
//     }
// }

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data });
// })

// PROBLEM: there is a problem in "UserHeader.js", when "PostList.js" make request for single blogpost
//          "UserHeader.js" is running, there are only 10 Users who make blog and each user is creating 10 blogs
//          so we just need to make request only 10 times(1 for each), but "UserHeader.js" is rerendering 100 times
//          so it make request to user(who make blogpost) 100 times
//          to solve this issue there are two ways

// 1. _.memoize(function) : lodash library
//    when we use _.memoize(func.) it runs only once for "unique argument"
//    means in above we "fetchUser" fetching user by "id", there is 10 blogposts by 1 user so we make 10 request
//    by _.memoize(func) if we pass "id" multiple times, then it runs only once and return previous value for that id

// 2. fetchPostsAndUsers():
//    we have to call "fetchPosts" and get the list of posts
//    then find unique userId's from list of posts, means here find 1 - 10 userId's(10 users make 100 posts)
//    iterate over unique userId's
//    and then call "fetchUser" with each userId
