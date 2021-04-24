import store from './store';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

async function api_get(path) {
  let text = await fetch(
    "http://localhost:4000/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  let text = await fetch(
    "http://localhost:4000/api/v1" + path, opts);
  return await text.json();
}

export function fetch_users() {
  api_get("/users").then((data) => {
    let action = {
      type: 'users/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function fetch_posts() {
  api_get("/posts").then((data) => {
    let action = {
      type: 'posts/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function fetch_post(id) {
  api_get("/posts/" + id).then((data) => {
    return data;
  });
}




export function api_login(email, password) {
  return api_post("/session", {email, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);

    }
    else if (data.error) {
     let action = {
        type: 'error/set',
        data: data.error,
      }
      store.dispatch(action);

    }
  });

}

export function create_user(user) {
  return api_post("/users", {user});
}

export async function create_response(response) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("response[choice]", response.body);

  console.log(data)

  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
    // fetch will magically do the right thing
    // with our FormData:
    //  - It's going to read the file
    //  - It's going to pick correct headers
    //  - multipart-form-data
  };

  let text = await fetch(
    "http://localhost:4000/api/v1/responses", opts);
  console.log(text);
  return await text.json();
}

export async function create_comment(comment) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("comment[body]", comment.body);

  console.log(data)

  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
    // fetch will magically do the right thing
    // with our FormData:
    //  - It's going to read the file
    //  - It's going to pick correct headers
    //  - multipart-form-data
  };

  let text = await fetch(
    "http://localhost:4000/api/v1/comments", opts);
  console.log(text);
  return await text.json();
}

export async function create_post(post) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("post[title]", post.title);
  data.append("post[date]", post.date);
  data.append("post[description]", post.description);


  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
    // fetch will magically do the right thing
    // with our FormData:
    //  - It's going to read the file
    //  - It's going to pick correct headers
    //  - multipart-form-data
  };
  let text = await fetch(
    "http://localhost:4000/api/v1/posts", opts);
  console.log(text);
  return await text.json();
}




export function load_defaults() {
  fetch_posts();
  fetch_users();
}
