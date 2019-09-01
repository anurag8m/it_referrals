import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function HomepageCategoryList({ homepagecategory }) {
  const emptyMessage = <p>No category Found</p>;
  const gameList = (
    <div className="row mr-0 ml-0">
      {homepagecategory.map(homecategory => (
        <div className="col-md-6 col-sm-6 bg-2 px-0">
          <Link to={"/joblist/" + homecategory._id}>
            <img
              src={homecategory.catImage}
              className="img-responsive homepage-top-image"
            />
            <div className="centered-middle">
              <h2 className="centered-middle-h2">{homecategory.name}</h2>
              <p className="centered-middle-p">{homecategory.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
  return <div>{homepagecategory.length === 0 ? emptyMessage : gameList}</div>;
}

HomepageCategoryList.propTypes = {
  homepagecategory: PropTypes.array.isRequired
};
