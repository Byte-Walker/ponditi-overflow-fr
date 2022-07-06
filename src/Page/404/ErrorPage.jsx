import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import img_404 from "./404.png";

const ErrorPage = () => {
  return (
    <section>
      <NavBar />
      <div className="mt-28 homePageContainer mx-auto text-center">
        <img src={img_404} alt="" className="mx-auto mb-5" style={{ height: "250px" }} />
        <h1 className="text-2xl mb-3 font-semibold">This Page Isn't Available</h1>
        <p className="text-xl text-gray-500">
          The link may be broken, or the page may have been removed. Check to see if the link you're
          trying to open is correct.
        </p>
        <button className="btn-red w-fit mt-4">Go To Home</button>
      </div>
    </section>
  );
};

export default ErrorPage;
