import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import {
  listProducts,
  deleteProduct,
  createProduct,
  listMyProducts,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productListMy = useSelector((state) => state.productListMy);
  const { products: productsMyList } = productListMy;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;
  const userId = userInfo?._id;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo?.isAdmin && !userInfo?.type === "vendor") {
      history.push("/login");
    }
    if (successCreate) {
      if (userInfo?.isAdmin) {
        history.push(
          `/admin/product/${createdProduct?._id}/${userInfo?._id}/edit`
        );
      }

      if (userInfo?.type === "vendor") {
        history.push(
          `/vendor/product/${createdProduct?._id}/${userInfo?._id}/edit`
        );
      }
    } else {
      if (userInfo?.isAdmin) {
        dispatch(listProducts("", pageNumber));
      }
      if (userInfo?.type === "vendor") {
        dispatch(listMyProducts(userId));
      }
    }
  }, [
    history,
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
    userId,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createproducthandler = (e) => {
    dispatch(createProduct());
  };
  console.log(productsMyList);
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createproducthandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {userInfo?.isAdmin &&
                products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/product/${product._id}/${userInfo?._id}/edit`}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}

              {userInfo?.type === "vendor" &&
                productsMyList?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer
                        to={`/vendor/product/${product._id}/${userInfo?._id}/edit`}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {!userInfo?.type === "vendor" && (
            <Paginate pages={pages} page={page} isAdmin={true} />
          )}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
