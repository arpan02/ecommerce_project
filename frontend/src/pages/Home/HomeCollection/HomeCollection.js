import React from 'react';
import './HomeCollection.scss';
import PropTypes from 'prop-types';

import HomeCollectionSideMenu from './HomeCollectionSideMenu/HomeCollectionSideMenu';
import HomeCollectionPoster from './HomeCollectionPoster/HomeCollectionPoster';
import HomeCollectionGallery from './HomeCollectionGallery/HomeCollectionGallery';
import slugify from 'slugify';
import uniqueId from 'uniqid';
import axios from 'axios';
// import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// import { Label, Select } from '@rebass/forms';
import { Select } from 'grommet';

class HomeCollection extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      categoriesList: [],
      productList: [],
      isListLoading: true,
      isCollectionLoading: true,
      selectedCategory: '',
    };
  }

  getProduct = async (slug) => {
    const collection = await axios.get(
      `/product?slug=${slug}&page=${1}&limit=6`
    );
    const { products } = collection.data;

    return products;
  };

  onSideMenuItemClick = async (data) => {
    this.setState({ isCollectionLoading: true });
    let { slug } = data;

    slug = `${this.props.slug}/${slug}`;
    const products = await this.getProduct(slug);
    this.setState({ productList: products, isCollectionLoading: false });
  };

  async componentDidMount() {
    const { id } = this.props;
    const categories = await axios.get(`categories/get-sub-categories/${id}`);
    this.setState({
      categoriesList: categories.data.subCategories,
      isListLoading: false,
    });
    let { slug, name } = categories.data.subCategories[0];
    slug = this.props.slug + '/' + slug;
    const products = await this.getProduct(slug);
    this.setState({
      productList: products,
      isCollectionLoading: false,
      selectedCategory: name,
    });
  }

  onSelectChange = async ({ option }) => {
    console.log(option);
    this.setState({ isCollectionLoading: true });
    let slug = option;
    let value = option;
    slug = slug.toLowerCase(slug);
    slug = slugify(slug);

    slug = `${this.props.slug}/${slug}`;

    const products = await this.getProduct(slug);

    this.setState({
      productList: products,
      isCollectionLoading: false,
      selectedCategory: value,
    });
  };

  render() {
    //
    let { categoriesList } = this.state;
    categoriesList = categoriesList.map((ele) => ele.name);
    const { title, img } = this.props;

    return (
      <div className="home-collection">
        <h2 className="home-collection__header">{title}</h2>
        {/* <FormControl className="home-collection__select">
          <InputLabel htmlFor="age-native-simple">Age</InputLabel>
          <Select
            native
            value={this.state.selectedCategory}
            // value={state.age}
            onChange={this.onSelectChange}
            inputProps={{
              name: 'Categories',
              id: 'age-native-simple'
            }}
          >
            {this.state.categoriesList.map((ele) => (
              <option key={uniqueId()} value={ele.name}>
                {ele.name}
              </option>
            ))}
          </Select>
        </FormControl> */}

        <div className="home-collection__select">
          <Select
            options={categoriesList}
            value={this.state.selectedCategory}
            onChange={this.onSelectChange}
            size="medium"
          />
        </div>

        <div className="home-collection__container">
          <HomeCollectionSideMenu
            onClick={this.onSideMenuItemClick}
            categoriesList={this.state.categoriesList}
            isLoading={this.state.isListLoading}
          />
          <HomeCollectionPoster img={img} />
          <HomeCollectionGallery
            products={this.state.productList}
            isLoading={this.state.isCollectionLoading}
          />
        </div>
      </div>
    );
  }
}
HomeCollection.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
};

export default HomeCollection;
