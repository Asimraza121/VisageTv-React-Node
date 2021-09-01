import {
  OndemandVideo as OndemandVideoIcon,
  Theaters as TheatersIcon,
  Help as HelpIcon,
} from "@material-ui/icons";

import { admin_routes } from "../../../Services/Routes/APP";

export const drawer_routes = [
  {
    icon: <OndemandVideoIcon />,
    route: admin_routes?.streaming_listing,
    text: "Streaming",
  },
  {
    icon: <TheatersIcon />,
    route: admin_routes?.movies_listing,
    text: "Movies",
  },
  {
    icon: <HelpIcon />,
    route: admin_routes?.support,
    text: "Support",
  },
];
