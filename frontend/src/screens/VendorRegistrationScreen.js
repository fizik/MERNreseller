import React, { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { registerVendor } from "../actions/userActions";

const VendorRegistrationScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [shopName, setShopName] = useState("");

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [returnAddress, setReturnAddress] = useState("");
  const [returnCountry, setReturnCountry] = useState("");
  const [returnCity, setReturnCity] = useState("");
  const [returnPostalCode, setReturnPostalCode] = useState("");

  const vendorRegister = useSelector((state) => state.vendorRegister);
  const { loading, error, success } = vendorRegister;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      registerVendor({
        shopName,
        country,
        city,
        address,
        postalCode,
        returnCountry,
        returnAddress,
        returnCity,
        returnPostalCode,
      })
    );
  };
  useEffect(() => {
    if (success) {
      history.push("/vendor/dashboard");
    }
  });

  return (
    <>
      <FormContainer>
        <h1>Vender Details Registration</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Label>shopName</Form.Label>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                placeholder="Enter Shop Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Label>Warehouse Address</Form.Label>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Label>Return Address</Form.Label>
            <Form.Group controlId="returnaddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={returnAddress}
                required
                onChange={(e) => setReturnAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="returncity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={returnCity}
                required
                onChange={(e) => setReturnCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="returnpostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                value={returnPostalCode}
                required
                onChange={(e) => setReturnPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="returncountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={returnCountry}
                required
                onChange={(e) => setReturnCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default VendorRegistrationScreen;
