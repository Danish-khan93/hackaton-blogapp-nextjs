import React from "react";
import { getSession } from "next-auth/react";
import { TextField, Button, Stack, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const login = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
  });

  // const route = useRouter();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = async ({ email, password }) => {
    console.log("form data ", email, password);
    const data = await signIn("credentials", {
      redirect: "/deshboard",
      email,
      password,
    });
  };

  return (
    <>
      <Box className="bg-slate-100">
        <Typography className="p-10" variant="h4">
          LogIn
        </Typography>
      </Box>
      <Stack>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-[300px] mx-auto mt-[80px]"
        >
          <TextField
            label="Email"
            {...register("email", { required: "emial is required" })}
            error={!errors}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            {...register("password", {
              required: "password is required",
              maxLength: 8,
              pattern: ``,
            })}
            error={!errors}
            helperText={errors.password?.message}
            type="password"
          />
          <Button
            type="submit"
            className="bg-blue-400 hover:bg-blue-400 text-white"
          >
            Login
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default login;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/deshboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
