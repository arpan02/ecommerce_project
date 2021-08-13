import React, { Component } from 'react';
import CategoryGallery from '../../components/CategoryGallery/CategoryGallery';
import Carousel from '../../components/Carousel/Carousel';
import ServiceInfo from '../../components/ServiceInfo/ServiceInfo';
// import Collections from '../../components/Collections/Collections';
import { connect } from 'react-redux';
import './Home.scss';
import PropTypes from 'prop-types';
import HomeSideMenu from './HomeSideMenu/HomeSideMenu';
import HomeCollection from './HomeCollection/HomeCollection';
import { setSideMenuSubItem } from '../../redux/ui/ui.actions';
import ManImage from '../../assets/images/HomeCollection/collection_men.jpg';
import WomanImage from '../../assets/images/HomeCollection/collection_women.jpg';

class Home extends Component {
  static propTypes = {
    fetchHomeCollectionStartAsync: PropTypes.func,
    setSideMenuSubItem: PropTypes.func,
  };

  componentDidMount() {
    this.props.setSideMenuSubItem(1);
  }

  render() {
    return (
      <div className="home">
        <div className="home__container">
          <HomeSideMenu />
          <Carousel />
        </div>
        <ServiceInfo />
        <CategoryGallery />
        <HomeCollection
          id="5deb7db440b6216002dd2733"
          title="Women's wear"
          slug="clothing/women's-clothing"
          img={WomanImage}
        />
        <HomeCollection
          title="Men's wear"
          slug="clothing/men's-clothing"
          id="5deb7dba40b6216002dd274d"
          img={ManImage}
        />
        <HomeCollection
          title="Furniture"
          slug="computers"
          id="5deb7e7440b6216002dd27cf"
          img={ManImage}
        />
      </div>
    );
  }
}

export default connect(null, { setSideMenuSubItem })(Home);
