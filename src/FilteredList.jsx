import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    // The state is just a list of key/value pairs (like a hashmap)
    // Adding an additional state variable within this.state called "type" and setting it to a default value
    this.state = {
      search: "",
      type: "all" // Default type filter is set to "all"
    };
  }

  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  // Sets the state of the "type" state variable depending on what is passed in
  onFilter = (type) => {
    this.setState({ type });
  }

  // Change filterItem to take into account the "type" state variable when filtering
  filterItem = (item) => {
    const { search, type } = this.state;
    if (type == "Fruit" || type == "Vegetable") {
	  return item.name.toLowerCase().search(search) !== -1 && item.type == type;
    } else {
      return item.name.toLowerCase().search(search) !== -1;
    }
  }

  render() {
    return (
      <div className="filter-list">

        <h1>Produce Search</h1>

        {/* Search input */}
        <input type="text" placeholder="Search" onChange={this.onSearch} />

        {/* Dropdown for type filter */}
        <DropdownButton title="Filter by Type">
          <Dropdown.Item onClick={() => this.onFilter("all")}>All</Dropdown.Item> &nbsp;
          <Dropdown.Item onClick={() => this.onFilter("Fruit")}>Fruits</Dropdown.Item> &nbsp;
          <Dropdown.Item onClick={() => this.onFilter("Vegetable")}>Vegetables</Dropdown.Item>
        </DropdownButton>

        {/* List component */}
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
