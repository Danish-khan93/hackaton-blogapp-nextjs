import React from "react";
import { TextField, Button, Stack, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

const signup = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log("form data ", data);
    if (data.password !== data.repeatedPassword) {
      alert("password is not match");
    } else {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("user is Successfully sign Up");
      }
    }
  };

  return (
    <>
      <Box className="bg-slate-100">
        <Typography variant="h4" className="p-10">
          SIGNUP
        </Typography>
      </Box>
      <Stack>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-[300px] mx-auto mt-[80px]"
        >
          <TextField
            label="First Name"
            {...register("firstName", {
              required: "first name is required",
              minLength: 3,
              maxLength: 20,
            })}
            error={!errors}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            {...register("lastName", {
              required: "last name is required",
              minLength: 1,
              maxLength: 20,
            })}
            error={!errors}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "email is requird",
              },
              pattern: {
                value: `"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"`,
                message: "email is incorrect",
              },
            })}
            error={!errors}
            helperText={errors.email?.message && errors.email?.message}
          />
          <TextField
            label="Password"
            {...register("password", {
              required: "password is required",
              minLength: 8,
            })}
            error={!errors}
            helperText={errors.password?.message}
            type="password"
          />
          <TextField
            label="Repeat Password"
            {...register("repeatedPassword", {
              required: "repeat password is required",
              // minLength: 8
            })}
            error={!errors}
            helperText={errors.repeatedPassword?.message}
            type="password"
          />
          <Button
            type="submit"
            className="bg-blue-400 hover:bg-blue-400 text-white"
          >
            Signup
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default signup;
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
    props: {
      session,
    },
  };
}
