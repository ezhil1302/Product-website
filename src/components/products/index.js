import React, { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../API";
import {
  Badge,
  Button,
  Card,
  Image,
  List,
  Rate,
  Spin,
  Typography,
  message,
} from "antd";

import { useParams } from "react-router-dom";
function Products() {
  const Param = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (Param?.categoryId
      ? getProductsByCategory(Param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [Param]);
  if (loading) {
    return <Spin spinning />;
  }
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(products, index) => {
          return (
            <Badge.Ribbon
              text={products.discountPercentage}
              className="itemCardBadge"
            >
              <Card
                actions={[
                  <Rate allowHalf disabled value={products.rating} />,
                  <AddToCartButton item={products} />,
                ]}
                className="itemCard"
                title={products.title}
                key={index}
                cover={
                  <Image src={products.thumbnail} className="itemCardImage" />
                }
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price : ${products.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          products.price +
                            (products.price * products.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {products.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      />
    </div>
  );
}

function AddToCartButton({ item }) {
  const [lodaing, setLoading] = useState(false);
  const addProduct = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been add  to Cart `);
      setLoading(false);
    });
  };
  return (
    <Button type="link" onClick={() => addProduct()} loading={lodaing}>
      Add to Cart
    </Button>
  );
}

export default Products;
