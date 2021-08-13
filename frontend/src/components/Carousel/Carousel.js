import React, { Component } from 'react';
import './Carousel.scss';
import { ReactComponent as LeftToggle } from '../../assets/icons/SVG/arrow_back_ios.svg';
import { ReactComponent as RightToggle } from '../../assets/icons/SVG/arrow_forward_ios.svg';
import CarouselLeft from './CarouselLeft/CarouselLeft';
import CarouselRight from './CarouselRight/CarouselRight';
import img1 from '../../assets/images/carousel/c1.jpg';
import img3 from '../../assets/images/carousel/c3.jpg';
import img2 from '../../assets/images/carousel/c2.jpg';

export class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
      containerRef: React.createRef(),
      length: 5,
    };
  }

  componentDidMount() {
    this.state.containerRef.current.addEventListener('transitionend', () => {
      let { counter } = this.state;
      let { style } = this.state.containerRef.current;
      console.log(counter, style);
      if (counter === this.state.length - 1) {
        style.transition = 'none';
        this.setState({ counter: 1 }, () => {
          style.transform = `translateX(-100%)`;
        });
      } else if (counter === 0) {
        style.transition = 'none';
        this.setState({ counter: 3 }, () => {
          style.transform = `translateX(-${this.state.counter * 100}%)`;
        });
      }
    });
  }

  onNextButton = () => {
    const { counter } = this.state;
    if (counter >= 4) {
      return;
    }
    const { style } = this.state.containerRef.current;
    style.transition = 'transform 0.5s';
    this.setState({ counter: counter + 1 }, () => {
      style.transform = `translateX(-${this.state.counter * 100}%)`;
    });
  };

  onPrevButton = () => {
    const { counter } = this.state;

    if (counter <= 0) {
      return;
    }
    const { style } = this.state.containerRef.current;
    style.transition = 'transform 0.5s';
    this.setState({ counter: counter - 1 }, () => {
      style.transform = `translateX(-${this.state.counter * 100}%)`;
    });
  };

  render() {
    return (
      <div className="carousel">
        <LeftToggle
          className="carousel__toggle carousel__toggle--left"
          onClick={this.onPrevButton}
        />
        <RightToggle
          className="carousel__toggle carousel__toggle--right"
          onClick={this.onNextButton}
        />

        <div
          className="carousel__container"
          ref={this.state.containerRef}
          style={{ transform: 'translateX(-100%)' }}
        >
          <div className="carousel__3" id="last">
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
              <CarouselLeft img={img3} />
              <CarouselRight />
            </div>
          </div>
          <div className="carousel__1">
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
              <CarouselLeft img={img1} />
              <CarouselRight />
            </div>
          </div>

          <div className="carousel__2">
            <div
              style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                transform: 'translateX(100%) translateY(-100%)x',
              }}
            >
              <CarouselLeft img={img2} />
              <CarouselRight />
            </div>
          </div>
          <div className="carousel__3">
            <div
              style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                transform: 'translateX(100%) translateY(-100%)x',
              }}
            >
              <CarouselLeft img={img3} />
              <CarouselRight />
            </div>
          </div>
          <div className="carousel__3" id="last">
            <div
              style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                transform: 'translateX(100%) translateY(-100%)x',
              }}
            >
              <CarouselLeft img={img1} />
              <CarouselRight />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
