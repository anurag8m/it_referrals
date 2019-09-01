import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CategoryJoblistPage({ categoryjoblist }) {
  const emptyMessage = <p>No Jobs Found</p>;
  const gameList = (
    <div className="col-md-12">
      {categoryjoblist.map(categoryjobs => (
        <div className="row tile" key={categoryjobs._id}>
          <div className="col-md-10 example">
            <h3>{categoryjobs.jobTitle}</h3>
            <p>{categoryjobs.description}</p>
            {/* <ul className="tile-details" id="menu">
                                    <li><i class="fa fa-user" aria-hidden="true"></i>&nbsp;Job Type</li>
                                    <li><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;Location</li>
                                    <li><i class="fa fa-hashtag" aria-hidden="true"></i>&nbsp;Position</li>
                                </ul> */}
          </div>

          <div className="col-md-2 ml-auto element">
            <div className="row posted-on">
              <p>
                Referral Fee=
                <strong>$200</strong>
              </p>
            </div>
            <div className="row refer">
              <Link to={"/jobDescription/" + categoryjobs._id}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="refer-btn"
                >
                  Refer
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  return <div>{categoryjoblist.length === 0 ? emptyMessage : gameList}</div>;
}

CategoryJoblistPage.propTypes = {
  categoryjoblist: PropTypes.array.isRequired
};
