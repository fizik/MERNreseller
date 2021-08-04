import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ChectoutSteps";
import Message from "../components/Message";
import {
  getVendorOrderDetails,
  deliverVendorOrder,
} from "../actions/orderActions";

const VendorWiseOrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const [items, setItems] = useState([]);

  console.log(items);

  const dispatch = useDispatch();
  const orderVendorDetails = useSelector((state) => state.orderVendorDetails);
  const { orders, loading, error } = orderVendorDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const vendorOrderDeliver = useSelector((state) => state.vendorOrderDeliver);
  const { loading: loadingDeliver, success: successDeliver } =
    vendorOrderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    orders &&
      (orders.itemsPrice = addDecimals(
        orders?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      ));
  }
  // dispatch({ type: ORDER_VENDOR_RESET });

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    // if (!order || successDeliver) {
    //   dispatch({ type: ORDER_VENDOR_PAY_RESET });
    //   dispatch({ type: ORDER_VENDOR_DELIVER_RESET });
    // }
    dispatch(getVendorOrderDetails(orderId));
  }, [dispatch, orderId, history, userInfo, successDeliver]);

  const deliverHandler = () => {
    dispatch(deliverVendorOrder(orders, items));
    // dispatch(
    //   payVendorOrder(orderId, {
    //     id: "Addas",
    //     status: "COMPLETED",
    //     update_time: Date.now(),
    //     email_address: userInfo?.email,
    //   })
    // );
  };

  return (
    <>
      <h1>Order {orders?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {orders?.user?.name}
              </p>
              <p>
                <strong>Email :</strong>
                <a href={`mailto:${orders?.user?.email}`}>
                  {orders?.user?.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {orders?.shippingAddress?.address},{" "}
                {orders?.shippingAddress?.city}{" "}
                {orders?.shippingAddress?.postalCode},{" "}
                {orders?.shippingAddress?.country}
              </p>
              {orders?.delivery.isDelivered ? (
                <Message variant="success">
                  Delivered on {orders?.delivery.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {orders?.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orders?.orderItems?.length === 0 ? (
                <Message>Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orders?.orderItems?.map((item, index) => (
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
                <Col>${orders?.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${orders?.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${orders?.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${orders?.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            ){loadingDeliver && <Loader />}
            <ListGroup.Item>
              <Form>
                {orders?.orderItems?.map((product) => {
                  const delivered = orders?.delivery?.deliveredItems?.filter(
                    (item) => item.name === product.name
                  );
                  if (delivered) {
                    setItems([...items, product.name]);
                  }
                  return (
                    <Form.Check
                      key={product.name}
                      type="checkbox"
                      label={product.name}
                      id="deliveryItems"
                      name="type"
                      value={product.name}
                      checked={delivered}
                      onChange={(e) => {
                        e.preventDefault();
                        if (items.find((name) => name === e.target.value)) {
                        } else {
                          setItems([...items, e.target.value]);
                        }
                      }}
                    ></Form.Check>
                  );
                })}
              </Form>
            </ListGroup.Item>
            {(orders?.isDelivered === "No" ||
              orders?.isDelivered === "Partially") && (
              <>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              </>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default VendorWiseOrderScreen;
