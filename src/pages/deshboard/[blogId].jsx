import { getById } from "@/services/blogService";
import React from "react";
import { Box, Typography,Button } from "@mui/material";

const blogId = ({ dataBlog }) => {
  return (
    <>
      <Box className ="p-10 break-words">
        <Typography gutterBottom variant="h2">{dataBlog.title}</Typography>
        <Typography variant="h6">{dataBlog.blog}</Typography>
        <Box>
          <Button>Delete</Button>
          <Button>Edit</Button>
        </Box>
      </Box>
    </>
  );
  //  <div>{dataBlog.title}</div>
};

export default blogId;

export const getStaticProps = async ({ params }) => {

 
  const { blogId } = params;

  const dataBlog = getById(blogId);
  
  return {
    props: {
      dataBlog,
    },

    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          blogId: "1",
        },
      },
    ],
    fallback: "blocking",
  };
};
