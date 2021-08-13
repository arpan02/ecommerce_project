import React, { Component } from 'react';
import './Carousel.scss';
import { ReactComponent as LeftToggle } from '../../assets/icons/SVG/arrow_back_ios.svg';
import { ReactComponent as RightToggle } from '../../assets/icons/SVG/arrow_forward_ios.svg';
import CarouselLeft from './CarouselLeft/CarouselLeft';
import CarouselRight from './CarouselRight/CarouselRight';
import img1 from '../../assets/images/woman-holding-card-while-operating-silver-laptop-919436.jpg';
import img2 from '../../assets/images/man-wearing-black-hat-and-black-coat-157675.jpg';
import img3 from '../../assets/images/woman-standing-and-doing-pose-beside-lake-1468379.jpg';

export class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      c1: 'left',
      c2: 'center',
      c3: 'right',
      prevState: null
    };
  }

  onRightArrowClick = () => {
    const prevState = {
      c1: this.state.c1,
      c2: this.state.c2,
      c3: this.state.c3
    };
    this.setState({ prevState: prevState }, () => {
      if (this.state.c2 === 'center') {
        this.changePosition('c2', 'left');
        this.changePosition('c3', 'center');
        this.changePosition('c1', 'right');
      } else if (this.state.c1 === 'center') {
        this.changePosition('c2', 'center');
        this.changePosition('c3', 'right');
        this.changePosition('c1', 'left');
      } else if (this.state.c3 === 'center') {
        this.changePosition('c2', 'right');
        this.changePosition('c3', 'left');
        this.changePosition('c1', 'center');
      }
    });
  };

  onLeftArrowClick = () => {
    const prevState = {
      c1: this.state.c1,
      c2: this.state.c2,
      c3: this.state.c3
    };
    this.setState({ prevState: prevState }, () => {
      if (this.state.c2 === 'center') {
        this.changePosition('c2', 'left');
        this.changePosition('c3', 'center');
        this.changePosition('c1', 'right');
      } else if (this.state.c1 === 'center') {
        this.changePosition('c2', 'center');
        this.changePosition('c3', 'right');
        this.changePosition('c1', 'left');
      } else if (this.state.c3 === 'center') {
        this.changePosition('c2', 'right');
        this.changePosition('c3', 'left');
        this.changePosition('c1', 'center');
      }
    });
  };

  changePosition = (ele, position) => {
    if (ele === 'c1') {
      this.setState({ c1: position });
    } else if (ele === 'c2') {
      this.setState({ c2: position });
    } else if (ele === 'c3') {
      this.setState({ c3: position });
    }
  };

  returnStyle = element => {
    if (this.state[element] === 'center') {
      return { left: '0%', transition: 'all 1s' };
    } else if (
      (!this.state.prevState && this.state[element] === 'left') ||
      (this.state[element] === 'left' &&
        this.state.prevState[element] === 'right')
    ) {
      console.log('returning');
      return { left: '-100%' };
    } else if (
      (!this.state.prevState && this.state[element] === 'right') ||
      (this.state[element] === 'right' &&
        this.state.prevState[element] === 'left')
    ) {
      console.log('returning 1s');
      return { left: '100%' };
    } else if (this.state[element] === 'left') {
      return { left: '-100%', transition: 'all 1s' };
    } else if (this.state[element] === 'right') {
      return { left: '100%', transition: 'all 1s' };
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="carousel">
        <LeftToggle
          className="carousel__toggle carousel__toggle--left"
          onClick={this.onLeftArrowClick}
        />
        <RightToggle
          className="carousel__toggle carousel__toggle--right"
          onClick={this.onRightArrowClick}
        />

        <div
          className="carousel__1"
          onClick={() => {}}
          style={this.returnStyle('c1')}
        >
          <CarouselLeft img={img2} />
          <CarouselRight />
        </div>

        <CarouselLeft img={img1} />

        <div className="carousel__2" style={this.returnStyle('c2')}>
          <CarouselLeft img={img1} />
          <CarouselRight />
        </div>

        <div className="carousel__3" style={this.returnStyle('c3')}>
          <CarouselLeft img={img3} one="one" />
          <CarouselRight />
        </div>
      </div>
    );
  }
}

export default Carousel;
