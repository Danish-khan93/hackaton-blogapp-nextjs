import { getSession } from "next-auth/react";
import Link from "next/link";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { getAllBlog } from "@/services/blogService";
export default function Deshboard({ blogData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      blog: "",
    },
  });

  const onSubmit = (data) => {
    console.log("blog post data", data);
    // fetch hoga yaha
    const respnse = fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <Box className="bg-slate-100">
        <Typography className="p-10" variant="h4">DASHBOARD</Typography>
      </Box>
      <Stack>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-[500px] mx-auto mt-4"
        >
          <TextField
            placeholder="placeHolder"
            {...register("title", {
              maxLength: 50,
              minLength: 5,
              required: true,
            })}
            error={!errors}
            //   helperText={errors.title.message}
          />
          <TextField
            {...register("blog", { maxLength: 500, minLength: 5 })}
            placeholder="what is in your mind ..."
            multiline
            maxRows={4}
          />
          <Button
            type="submit"
            className="bg-blue-400 hover:bg-blue-400 text-white"
          >
            Publish blog
          </Button>
        </form>
      </Stack>
      <Stack className="mt-10">
        {blogData.map((value) => {
          return (
            <Paper
              key={value.id}
              className=" border-black w-[700px] mx-auto my-10 p-10"
            >
               <Link href={`/deshboard/${value.id}`}>
              <Box>
                <Typography gutterBottom variant="h4">
                  {value.title}
                </Typography>
              </Box>
              <Box className="break-words">
                <Typography>{value.blog}</Typography>
              </Box>
              <Box>
                <Button>DELETE</Button>
                <Button>EDIT</Button>
              </Box>
               </Link>
            </Paper>
          );
        })}
      </Stack>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const blogData = getAllBlog();

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      blogData,
    },
  };
}
