import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Filter from "./Filter";
import Listings from "./Listings";
import listingsData from "./data/listingsData.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Austin",
      listingsData,
      city: "All",
      homeType: "All",
      bedrooms: 0,
      min_price: 0,
      max_price: 10000000,
      min_floor_space: 0,
      max_floor_space: 5000,
      elevator: false,
      finished_basement: false,
      gym: false,
      swimming_pool: false,
      filteredData: listingsData,
      populateFormsData: "",
      sortby: "price-dsc",
      view: "box",
      search: ""
    };
    this.change = this.change.bind(this);
    this.filteredData = this.filteredData.bind(this);
    this.populateForms = this.populateForms.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  componentWillMount() {
    var listingsData = this.state.listingsData.sort((a, b) => {
      return a.price - b.price;
    });
    this.setState({
      listingsData
    });
  }

  change(event) {
    var name = event.target.name;
    var value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
        this.filteredData();
      }
    );
  }

  changeView(viewName) {
    this.setState({
      view: viewName
    });
  }

  populateForms() {
    //City
    var cities = this.state.listingsData.map(item => {
      return item.city;
    });
    cities = new Set(cities);
    cities = [...cities];
    cities = cities.sort();

    //Hometype
    var homeTypes = this.state.listingsData.map(item => {
      return item.homeType;
    });
    homeTypes = new Set(homeTypes);
    homeTypes = [...homeTypes];
    homeTypes = homeTypes.sort();

    //Bedrooms
    var bedrooms = this.state.listingsData.map(item => {
      return item.bedrooms;
    });
    bedrooms = new Set(bedrooms);
    bedrooms = [...bedrooms];
    bedrooms = bedrooms.sort();

    this.setState(
      {
        populateFormsData: { cities, homeTypes, bedrooms }
      },
      () => {
        console.log(this.state);
      }
    );
  }

  filteredData() {
    var newData = this.state.listingsData.filter(item => {
      return (
        item.price >= this.state.min_price &&
        item.price <= this.state.max_price &&
        item.floorspace >= this.state.min_floor_space &&
        item.floorspace <= this.state.max_floor_space &&
        item.bedrooms >= this.state.bedrooms
      );
    });

    if (this.state.city != "All") {
      newData = newData.filter(item => {
        return item.city == this.state.city;
      });
    }

    if (this.state.homeType != "All") {
      newData = newData.filter(item => {
        return item.homeType == this.state.homeType;
      });
    }

    if (this.state.sortby == "price-asc") {
      newData.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (this.state.sortby == "price-dsc") {
      newData.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (this.state.search != "") {
      newData = newData.filter(item => {
        var city = item.city.toLowerCase();
        var searchText = this.state.search.toLowerCase();
        var n = city.match(searchText);

        if (n != null) {
          return true;
        }
      });
    }

    this.setState({
      filteredData: newData
    });
  }

  render() {
    return (
      <div>
        <Header />
        <section id="content-area">
          <Filter
            change={this.change}
            globalState={this.state}
            populateForms={this.populateForms}
          />
          <Listings
            listingsData={this.state.filteredData}
            globalState={this.state}
            change={this.change}
            changeView={this.changeView}
          />
        </section>
      </div>
    );
  }
}

const app = document.getElementById("app");

ReactDOM.render(<App />, app);
