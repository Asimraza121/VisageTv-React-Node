import * as Yup from "yup";

import { variables } from "../Variables";
const { invalid_email, required } = variables;

export const validationSchema = Yup.object({
  email: Yup.string().required(required).email(invalid_email),
  password: Yup.string().required(required),
});
