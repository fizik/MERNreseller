import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ChectoutSteps";
import Message from "../components/Message";
import {
  getVendorOrderDetails,
  payVendorOrder,
  deliverVendorOrder,
} from "../actions/orderActions";
import {
  ORDER_VENDOR_PAY_RESET,
  ORDER_VENDOR_DELIVER_RESET,
  ORDER_VENDOR_RESET,
} from "../constants/orderConstants";

const VendorWiseOrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const VendorOrderDetails = useSelector((state) => state.VendorOrderDetails);
  const { order, loading, error } = VendorOrderDetails;
  console.log(order);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const vendorOrderDeliver = useSelector((state) => state.vendorOrderDeliver);
  const { loading: loadingDeliver, success: successDeliver } =
    vendorOrderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  dispatch({ type: ORDER_VENDOR_RESET });

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!order || successDeliver) {
      dispatch({ type: ORDER_VENDOR_PAY_RESET });
      dispatch({ type: ORDER_VENDOR_DELIVER_RESET });
    }
    dispatch(getVendorOrderDetails(orderId));
  }, [dispatch, orderId, history, userInfo, order, successDeliver]);

  const deliverHandler = () => {
    dispatch(deliverVendorOrder(order));
    dispatch(
      payVendorOrder(orderId, {
        id: "Addas",
        status: "COMPLETED",
        update_time: Date.now(),
        email_address: userInfo?.email,
      })
    );
  };

  return (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order?.user?.name}
              </p>
              <p>
                <strong>Email :</strong>
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city}{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.delivery.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems?.length === 0 ? (
                <Message>Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price}={" "}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order?.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order?.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order?.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order?.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            ){loadingDeliver && <Loader />}
            {userInfo?.type === "vendor" && !order?.isDelivered && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Mark as Delivered
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default VendorWiseOrderScreen;
