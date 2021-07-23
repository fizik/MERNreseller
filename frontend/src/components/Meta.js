import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Proshop",
  keywords: "electronics, buy electronics,cheap electronics",
  description: "We sell the best products for cheap",
};

export default Meta;
