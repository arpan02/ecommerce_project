import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Search.scss';
import { ReactComponent as SearchIcon } from '../../assets/icons/SVG/magnifying-glass.svg';
import SearchList from './SearchList/SearchList';
import { fetchSearchCategories } from '../../redux/categories/categories.actions';

export class Search extends Component {
  static propTypes = {
    DropDownList: PropTypes.array,
    socket: PropTypes.object,
    fetchSearchCategories: PropTypes.func,
    searchList: PropTypes.array
  };

  constructor() {
    super();
    this.state = {
      searchText: '',
      searchList: null,
      isSearchListHidden: true,
      number: 1,
      socket: null
    };
  }

  searchInputHandler = (event) => {
    this.setState(
      { [event.target.name]: event.target.value, isSearchListHidden: false },
      () => {
        this.props.fetchSearchCategories(this.props.socket, {
          text: this.state.searchText
        });
      }
    );
  };

  onSearchHandler = () => {
    this.props.socket.emit('search', { searchText: this.state.searchText });
  };

  onSearchItemClick = () => {
    this.setState({ isSearchListHidden: true });
  };

  render() {
    return (
      <div className="menu__top__search">
        <input type="text"
          placeholder="Search"
          className="menu__top__search__input"
          value={this.state.searchText}
          name="searchText"
          onChange={this.searchInputHandler}
        />
        <button className="menu__top__search__button"
          onClick={this.onSearchHandler}
        >
          <SearchIcon className="menu__top__search__button__icon" />
        </button>
        <SearchList searchList={this.props.searchList}
          isHidden={this.state.isSearchListHidden}
          onSearchItemClick={this.onSearchItemClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  DropDownList: state.categories.parentCategory,
  socket: state.socket.socket,
  searchList: state.categories.searchList
});

export default connect(mapStateToProps, { fetchSearchCategories })(Search);
