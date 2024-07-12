import React from "react";
import { EditPost } from "../../components/posts/EditPost";
import { LeftSide } from "../../components/leftside/Leftside";

export const PostPage = () => {
  return (
    <>
      <div className="post">
        <div className="row text-center">
          <div className="col-md-3 col-scrollable">
            <LeftSide />
          </div>
          <div className="col-md-9 ">
            <EditPost />
          </div>
        </div>
      </div>
    </>
  );
};
