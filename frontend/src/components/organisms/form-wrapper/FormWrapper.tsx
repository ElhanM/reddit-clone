// PLUGINS IMPORTS //
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./form-wrapper.module.css";

/////////////////////////////////////////////////////////////////////////////

type FormWrapperProps<T> = {
  // found the type of methods in the Login component (const methods: UseFormReturn<ILoginFormProps, any>)
  methods: UseFormReturn<T, any>;
  submitHandler: SubmitHandler<T>;
  // submitHandler: (data: T) => SubmitHandler<T>;
  children: React.ReactNode;
};

const FormWrapper = <T extends {}>({ methods, submitHandler, children }: FormWrapperProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)} className={`${styles["login-form"]}`}>
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
