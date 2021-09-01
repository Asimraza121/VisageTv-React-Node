// const domain = "https://visage-tv-backend.herokuapp.com/api" || process.env.API_URL;
const domain = process.env.REACT_APP_API_URL;
export const api_root_route = process.env.REACT_APP_ROOT_API_URL;

// const domain = "http://localhost:3002/api";
// export const api_root_route = "http://localhost:3002/picture/";

export const admin_api_routes = {
  //streaming

  create_streaming: `${domain}/admin/live-stream`,
  get_streamings: `${domain}/live-streams`,
  del_streaming: `${domain}/admin/live-stream/`,
  update_streaming: `${domain}/admin/live-stream/`,

  //movies

  create_movie: `${domain}/admin/movie`,
  get_movies: `${domain}/movies`,
  del_movie: `${domain}/admin/movie/`,
  update_movie: `${domain}/admin/movie`,

  // admin auth

  login: `${domain}/admin/log-in`,
  get_user: `${domain}/admin/me`,
};

export const api_routes = {
  //users

  get_all_streaming: `${domain}/live-streams`,
  get_all_movies: `${domain}/movies`,
  contact_us: `${domain}/contact_us`,
  search: `${domain}/search`,
};
