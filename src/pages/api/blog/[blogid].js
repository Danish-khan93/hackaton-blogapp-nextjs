import { getById } from "@/services/blogService"
export default function handler(req, res) {
    if(req.method === "GET"){
     const {blogId} =  req.query
     const perBlog = getById(blogId)
    res.status(200).json(perBlog)
    }
}
