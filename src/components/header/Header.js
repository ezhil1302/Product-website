import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, InputNumber, Menu, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../API";

function Header() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader">
      <Menu
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      />
      <Typography.Title>Product Store</Typography.Title>
      <AppCart />
    </div>
  );
}

function AppCart() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkOutOpen,setCheckOutOpen]=useState(false)
  console.log(cartItems);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  return (
    <div>
      <Badge
        count={6}
        className="shoppingCardIcon"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      console.log(value);
                      setCartItems((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total:{total}</span>;
          }}
        
        />
        <Button onClick={()=>setCheckOutOpen(true)} type="primary">Check Out  Cart</Button>
         <Drawer  open={checkOutOpen} onClose={()=>setCheckOutOpen(false)}></Drawer>
      </Drawer>
    </div>
  );
}

export default Header;
