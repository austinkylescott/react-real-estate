import React, { Component } from "react";

export default class Listings extends Component {
  constructor() {
    super();
    this.state = {
      name: "Austin"
    };
    this.loopListings = this.loopListings.bind(this);
  }
  loopListings() {
    let { listingsData } = this.props;
    if (listingsData == undefined || listingsData.length == 0) {
      return "Sorry, we don't know of any homes that match your criteria.";
    }
    return listingsData.map((listing, index) => {
      //THIS IS BOX VIEW
      if (this.props.globalState.view == "box") {
        return (
          <div className="col-md-3" key={index}>
            <div className="listing">
              <div
                className="listing-img"
                style={{
                  background: `url("${listing.image}")
          no-repeat center center`
                }}
              >
                <span className="address">{listing.address}</span>
                <div className="details">
                  <div className="col-md-3">
                    <div className="user-img" />
                  </div>
                  <div className="col-md-9">
                    <div className="user-details">
                      <span className="user-name">Nina Smith</span>
                      <span className="post-date">05/08/2019</span>
                    </div>
                    <div className="listing-details">
                      <div className="floor-space">
                        <i className="far fa-square" />{" "}
                        <span>{listing.floorspace} ft&sup2;</span>
                      </div>
                      <div className="bedrooms">
                        <i className="fas fa-bed" />{" "}
                        <span>{listing.bedrooms} bedrooms</span>
                      </div>
                      <div className="view-btn">View Listing</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-info">
                <span className="price">
                  <i className="fas fa-money-bill" /> ${listing.price}
                </span>
                <span className="location">
                  <i className="fas fa-map-marker-alt" /> {listing.city},{" "}
                  {listing.state}
                </span>
              </div>
            </div>
          </div>
        );
      }
      //THIS IS LIST VIEW
      else {
        return (
          <div className="col-md-12 col-lg-6" key={index}>
            <div className="listing">
              <div
                className="listing-img"
                style={{
                  background: `url("${listing.image}")
          no-repeat center center`
                }}
              >
                <span className="address">{listing.address}</span>
                <div className="details">
                  <div className="col-md-3">
                    <div className="user-img" />
                  </div>
                  <div className="col-md-9">
                    <div className="user-details">
                      <span className="user-name">Nina Smith</span>
                      <span className="post-date">05/08/2019</span>
                    </div>
                    <div className="listing-details">
                      <div className="floor-space">
                        <i className="far fa-square" />{" "}
                        <span>{listing.floorspace} ft&sup2;</span>
                      </div>
                      <div className="bedrooms">
                        <i className="fas fa-bed" />{" "}
                        <span>{listing.bedrooms} bedrooms</span>
                      </div>
                      <div className="view-btn">View Listing</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-info">
                <span className="price">
                  <i className="fas fa-money-bill" /> ${listing.price}
                </span>
                <span className="location">
                  <i className="fas fa-map-marker-alt" /> {listing.city},{" "}
                  {listing.state}
                </span>
              </div>
            </div>
          </div>
        );
      }
    });
  }
  render() {
    return (
      <section id="listings">
        <section className="search-area">
          <input
            type="text"
            name="search"
            placeholder="Which city do you want to live in?"
            onChange={this.props.change}
          />
        </section>

        <section className="sortby-area">
          <div className="results">
            {this.props.globalState.filteredData.length} results found
          </div>
          <div className="sort-options">
            <select
              name="sortby"
              className="sortby"
              onChange={this.props.change}
            >
              <option value="price-asc">Lowest Price</option>
              <option value="price-dsc">Highest Price</option>
            </select>
            <div className="view">
              <i
                className="fa fa-list-ul"
                aria-hidden="true"
                onClick={this.props.changeView.bind(null, "list")}
              />
              <i
                className="fa fa-th"
                aria-hidden="true"
                onClick={this.props.changeView.bind(null, "box")}
              />
            </div>
          </div>
        </section>

        <section className="listings-results">
          <div className="row">{this.loopListings()}</div>
        </section>

        <section id="pagination">
          <div className="row">
            <ul className="pages">
              <li>Prev</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>Next</li>
            </ul>
          </div>
        </section>
      </section>
    );
  }
}
