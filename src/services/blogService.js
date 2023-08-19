import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "blog.json");

export function getAllBlog() {
  const blogData = fs.readFileSync(filePath);
  return JSON.parse(blogData);
}

export function getById(id) {
  const dataBlog = getAllBlog();
  return dataBlog.find((val) => val.id === +id);
}

export function saveBlog(title, blog) {
  const allBlog = getAllBlog();
  allBlog.push({
    id: allBlog.length + 1,
    title,
    blog,
  });

  fs.writeFileSync(filePath, JSON.stringify(allBlog));
}
