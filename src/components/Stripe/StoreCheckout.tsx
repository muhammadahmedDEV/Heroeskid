import React, { useEffect, useState } from "react";
import cn from "classnames";
import "./styles.scss";
import { Row, Col } from "antd";
import { createCheckoutSession } from "../../servises/firebase";
import Button from "../Buttons";
import { getButtonRed } from "../Buttons/style";
import badge from '../../assets/icons/starbadge.png'
import { CircularProgress } from "@material-ui/core";

const bc = 'checkout-tile'
interface ComponentProps {
  user: any
}

const CheckoutForm = (props: ComponentProps) => {
  const classes = getButtonRed("35px", "145px");
  const [loader, setLoader] = useState(false)
  const productsList = [
    {
      name: 'Monthly Plan',
      price: '$50.00/month',
      // priceId: 'price_1HqEBnIKumCkOv7ZL8rDwkmO', // test
      priceId: 'price_1HpFAdIKumCkOv7ZELjoZ9W3', // Live
      image: badge,
      description: 'Full access to our services, billed on a monthly basis'
    },
    {
      name: 'Annual Plan',
      price: '$500/year',
      // priceId: 'price_1HqeGeIKumCkOv7ZuKRZiwnJ', // test
      priceId: 'price_1HrKFBIKumCkOv7Z8x0DCJzF', // live
      image: badge,
      description: 'Full access to our services, billed annually ($100 savings)'
    }
  ]
  const handleSubmit = async (event: any, priceId: string) => {
    setLoader(true)
    event.preventDefault();
    createCheckoutSession(props.user.uid, priceId)
  }
  return (
    <div>
      {loader ?
        <div className={`${bc}__loader`}>
          <CircularProgress />
        </div>
        : <Row gutter={24}>
          <Col span={24}>
            <h1 className="title">Choose a monthly or annual membership</h1>
          </Col>
          <Row gutter={24} style={{ margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {productsList.map((prod: any, index: any) => {
              return (
                <Col sm={24} md={12} xl={12} xxl={12} key={index}>
                  <div className={cn(bc)} >
                    <div className={`${bc}__logo-block`}>
                      <img className={`${bc}__logo-block__sing`} src={prod.image} alt="" />
                    </div>
                    <div className={`${bc}__info-block`}>
                      <span className={`${bc}__info-block__fullName`}>{prod.name}</span>
                      <span className={`${bc}__info-block__work-place`}>{`${prod.description}`}</span>
                      <span className={`${bc}__info-block__button`}>
                        <Button
                          styles={classes.root}
                          variant="contained"
                          title={`${prod.price}`}
                          onClick={(e) => handleSubmit(e, prod.priceId)}
                        />
                      </span>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
          {/* <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}> */}
          {/* </div> */}
        </Row>}
    </div>
  );
}
export default CheckoutForm;
