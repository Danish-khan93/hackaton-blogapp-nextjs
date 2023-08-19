import { Stack, Box, Button, Typography, Paper } from "@mui/material";
import { getAllBlog } from "@/services/blogService";
export default function Home({ blogData }) {
  return (
    <Stack>
      <Box className="bg-slate-100">
        <Typography className="p-10" variant="h4">
          Good Morning Readers!
        </Typography>
      </Box>
      <Typography className="p-4" variant="h5">
        ALL Blogs!
      </Typography>
      <Box></Box>
      {blogData.map((value) => {
        return (
          <Paper
            key={value.id}
            className=" border-black w-[700px] mx-auto my-10 p-10"
          >
            <Box>
              <Typography gutterBottom variant="h4">
                {value.title}
              </Typography>
            </Box>
            <Box className="break-words">
              <Typography>{value.blog}</Typography>
            </Box>
          </Paper>
        );
      })}
    </Stack>
  );
}

export async function getServerSideProps() {
  const blogData = getAllBlog();

  // const session = await getSession({ req });
  return {
    props: {
      blogData,
    },
  };
}
