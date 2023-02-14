// PLUGINS IMPORTS //
import * as yup from "yup";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { ICreatePostForm } from "types/templates";

/////////////////////////////////////////////////////////////////////////////

const createPostFormSchema: yup.SchemaOf<ICreatePostForm> = yup.object({
  title: yup.string().required("The title value should not be empty"),
  description: yup.string().required("The description value should not be empty"),
});

export default createPostFormSchema;
