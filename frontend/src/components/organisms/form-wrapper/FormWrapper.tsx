// PLUGINS IMPORTS //
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./form-wrapper.module.css";

/////////////////////////////////////////////////////////////////////////////

// this form wrapper can be called in multiple components, like login and register pages, and they work with a different data shape
// so we need to use generics for types
type FormWrapperProps<T> = {
  // found the type of methods in the Login component (const methods: UseFormReturn<ILoginFormProps, any>)
  methods: UseFormReturn<T, any>;
  submitHandler: SubmitHandler<T>;
  // submitHandler: (data: T) => SubmitHandler<T>;
  authForm?: boolean;
  children: React.ReactNode;
};

const FormWrapper = <T extends {}>({ methods, submitHandler, authForm, children }: FormWrapperProps<T>) => {
  return (
    <FormProvider {...methods}>
      {/* in order to be able to access the wrapper div from mui input fields and buttons on auth forms via the div's class names and provide them with margin*/}
      {/* I need to provide the form with a class name */}
      {/* also, I want to be able to chose if I want the margin or not, since e.g. in the create post page i don't want the margin */}
      {/* but I need to do it without the use of modules since they add a unique key to the class names and make it so that e.g.*/}
      {/* selecting a child div via a class name that wes set by mui of a form selected via its class name inside of a module is not possible*/}
      {/* so for example .form .MuiDiv does not work if we do it inside of the FormWrapper scss module */}
      {/* since .form .MuiDiv is actuall .from+unique .MuiDiv+unique, but the Mui div that was set by mui does not have the unique part */}
      {/* so I will apply these classes outside of a module */}

      {/* alternatively, I could have wrapped all of the children in seperate divs and applied the margin to them, but that would be a lot of extra divs */}
      {/* I pref this solution, since it is more automated */}
      <form onSubmit={methods.handleSubmit(submitHandler)} className={`${styles["form"]} ${authForm ? "auth-form" : ""}`}>
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
