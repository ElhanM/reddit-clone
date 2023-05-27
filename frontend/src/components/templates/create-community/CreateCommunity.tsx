// PLUGINS IMPORTS //
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// COMPONENTS IMPORTS //
import { CreatePostTextFieldComponent, CreateButton } from "components/atoms";
import { ConfigedRQuill, FormattedRMD } from "components/molecules";
import { FormWrapper } from "components/organisms";

// EXTRA IMPORTS //
import styles from "./create-community.module.css";
import { ETheme } from "types/theme";
import { ICreateCommunityForm } from "types/templates";
import { useCreateCommunityMutation } from "features/slices/communitySlice";

/////////////////////////////////////////////////////////////////////////////

type CreateCommunityProps = {};

const CreateCommunity = (props: CreateCommunityProps) => {
  const [createCommunity, { isLoading, isError, error, isSuccess }] = useCreateCommunityMutation();

  const history = useNavigate();

  const methods = useForm<ICreateCommunityForm>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyName, setEmptyName] = useState(false);

  // typing an async arrow function
  const submitHandler: SubmitHandler<ICreateCommunityForm> = async (data: ICreateCommunityForm) => {
    if (data.name === "") {
      setEmptyName(true);
    }
    if (data.description === "") {
      setEmptyDescription(true);
    }
    if (data.name !== "" && data.description !== "") {
      const createCommunityData = await createCommunity({
        name: data.name,
        description: data.description,
      }).unwrap();
      history("/search-communities?name=");
    }
  };

  return (
    <FormWrapper methods={methods} submitHandler={submitHandler} authForm={true}>
      <main className={`${styles["create-post-wrapper"]}`}>
        <header className={`${styles["create-post-header"]}`}>
          <Typography variant="h6">Create a community</Typography>
        </header>
        {/* making the border a seperate div makes it easier to apply margin */}
        <div className={`${styles["border"]} ${styles["top"]}`}></div>
        <article className={`${styles["create-post"]}`}>
          <section className={`${styles["inner-create-post"]}`}>
            <CreatePostTextFieldComponent
              label="Name"
              name="name"
              error={emptyName}
              setEmptyTitle={setEmptyName}
              textFieldProps={{
                fullWidth: true,
              }}
            />
            <CreatePostTextFieldComponent
              label="Description"
              name="description"
              error={emptyName}
              setEmptyTitle={setEmptyName}
              textFieldProps={{
                fullWidth: true,
              }}
            />
            <div className={`${styles["border"]} ${styles["bottom"]}`}></div>
            <section className={`${styles["post-button"]}`}>
              <CreateButton
                theme={ETheme.LIGHT}
                createPost
                buttonText="Create Community"
                buttonProps={{ type: "submit", variant: "contained", color: "primary", disabled: isLoading }}
              />
            </section>
          </section>
        </article>
      </main>
    </FormWrapper>
  );
};

export default CreateCommunity;
