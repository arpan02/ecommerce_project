import React from 'react';
import './ServiceInfo.scss';
import { ReactComponent as CustomerService } from '../../assets/icons/service/customer-service.svg';
import { ReactComponent as Truck } from '../../assets/icons/service/delivery-truck.svg';
import { ReactComponent as Gift } from '../../assets/icons/service/gift.svg';
import { ReactComponent as Saving } from '../../assets/icons/service/get-money.svg';


const ServiceInfo = () => {
  return (
    <section className="service-info" >
      <div className="service-info__item">
        <CustomerService className="service-info__item__icon" />
        <h3 className="service-info__item__heading">
          24 X 7 Support
        </h3>
        <div className="service-info__item__text">
          Lorem ipsum dolor sit
        </div>
      </div>
      <div className="service-info__item">
        <Truck className="service-info__item__icon" />
        <h3 className="service-info__item__heading">
          24 X 7 Support
        </h3>
        <div className="service-info__item__text">
          Lorem ipsum dolor sit
        </div>
      </div>   <div className="service-info__item">
        <Gift className="service-info__item__icon" />
        <h3 className="service-info__item__heading">
          24 X 7 Support
        </h3>
        <div className="service-info__item__text">
          Lorem ipsum dolor sit
        </div>
      </div>   <div className="service-info__item">
        <Saving className="service-info__item__icon" />
        <h3 className="service-info__item__heading">
          24 X 7 Support
        </h3>
        <div className="service-info__item__text">
          Lorem ipsum dolor sit
        </div>
      </div>
    </section>
  )
}

export default ServiceInfo;
