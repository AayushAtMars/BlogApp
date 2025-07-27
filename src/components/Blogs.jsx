import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";
import Card from "./Card";

const Blogs = () => {
  //consume
  const { loading, post } = useContext(AppContext);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : !post || post.length === 0 ? (
        <div>
          <p>No Post Found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {post.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
