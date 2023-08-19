import { saveBlog, getAllBlog } from "@/services/blogService";

export default function handler(req, res) {
  if (req.method == "POST") {
    const { title, blog } = req.body;
    saveBlog(title, blog);
res.status(201).send() 
    // res.status(404).send();
  } else if(req.method === "GET"){
   const data =  getAllBlog()
   res.status(200).json(data)
}
}



////////////////////////
// export default function handler(req, res) {
//   if (req.method !== "POST") {
//     res.status(404).send();
//   } else {
//     const { title, blog } = req.body;
//     saveBlog(title, blog);
// res.status(201).send() 
// }
// }