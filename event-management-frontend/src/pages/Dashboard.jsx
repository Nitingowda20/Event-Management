// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import PostCard from "../components/PostCard";

export default function Dashboard() {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/post/getpost`
  //     );
  //     const data = await res.json();
  //     setPosts(data.posts);
  //   };
  //   fetchPost();
  // }, []);
  return (
    <div className=" w-full flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto">
      <div className="text-3xl font-bold lg:text-6xl">
        <p className="text-gray-500 text-xs sm:text-sm mt-5">
          Here, you can explore a variety of upcoming and past events. As a
          guest, you can view event details, but to fully interact with our
          features, such as registering for events or participating in
          discussions, please log in or sign up for an account. We encourage you
          to join our community and take advantage of all the exciting
          opportunities available!
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          {" "}
          View all Events
        </Link>
      </div>
      <div className="min-w-full p-1 bg-amber-100 dark:bg-slate-700">
      </div>
      {/* <div className=" p-3 mx-auto flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-3">
              {posts.map((post) => (
                // console.log("posts");
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div> */}
      <Link
        to="/search"
        className="text-center text-xl hover:underline text-teal-500"
      >
        View all Events
      </Link>
    </div>
  );
}
