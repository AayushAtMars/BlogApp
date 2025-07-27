import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";


//step 1
export const AppContext = createContext();

export default function AppContextProvider({children}){
    const[loading, setLoading] = useState(false);
    const[post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const[totalPages, setTotalPages] = useState(null);

    //data filling pending
    async function fetchBlogPosts(page=1) {
        setLoading(true);
        const url = `${baseUrl}?page=${page}`

        try{
            const result = await axios.get(url);
            console.log(result);
            setPage(result.data.page);
            setPost(result.data.posts);
            setTotalPages(result.data.totalPages);
        }
        catch(error){
            console.log("Error in Fetching Data");
            setPage(1);
            setPost([]);
            setTotalPages(null);
        }
        setLoading(false);
    } 

    function handlePageChange(page){
        setPage(page);
        fetchBlogPosts(page)
    }

    const value = {
         post,
         setPost,
         loading,
         setLoading,
         page,
         setPage,
         totalPages,
         setTotalPages,
         fetchBlogPosts,
         handlePageChange
    };

    //step 2
    return <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>
}