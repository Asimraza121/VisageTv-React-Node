import * as Yup from "yup";

import { variables } from "../../Variables";
const { required } = variables;

export const addStreamingSchema = Yup.object({
  name: Yup.string().required(required),
  description: Yup.string().required(required),
  stream_url: Yup.string().required(required).url("Please enter valid link"),
  thumbnail: Yup.mixed().required(required),
  categories: Yup.string().required(required),
  stream_count: Yup.string().required(required),
  stream_location: Yup.string().required(required),
});

export const updateStreamingSchema = Yup.object({
  name: Yup.string().required(required),
  description: Yup.string().required(required),
  stream_url: Yup.string().required(required).url("Please enter valid link"),
  categories: Yup.string().required(required),
  stream_count: Yup.string().required(required),
  stream_location: Yup.string().required(required),
});
