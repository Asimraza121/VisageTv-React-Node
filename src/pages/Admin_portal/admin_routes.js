import { admin_routes } from "../../Services/Routes/APP";

import {
  AddMovie,
  ListingMovies,
  EditMovie,
  ListingStreaming,
  EditStreaming,
  AddStreaming,
  Support,
} from "./pages";

export const routes = [
  //root route

  {
    exact: true,
    route: admin_routes?.root,
    component: ListingStreaming,
  },

  //streaming

  {
    exact: true,
    route: admin_routes?.streaming_add,
    component: AddStreaming,
  },
  {
    exact: true,
    route: admin_routes?.streaming_edit,
    component: EditStreaming,
  },
  {
    exact: true,
    route: admin_routes?.streaming_listing,
    component: ListingStreaming,
  },

  //movies routes

  {
    exact: true,
    route: admin_routes?.movie_add,
    component: AddMovie,
  },
  {
    exact: true,
    route: admin_routes?.movie_edit,
    component: EditMovie,
  },
  {
    exact: true,
    route: admin_routes?.movies_listing,
    component: ListingMovies,
  },

  //support

  {
    exact: true,
    route: admin_routes?.support,
    component: Support,
  },
];
