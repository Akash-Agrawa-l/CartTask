import React from "react";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";

const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 }
];

const ProductComponent = React.memo(({ cart, setCart }) => {
  const handleIncrement = (id) => {
    const product = cart.find((item) => item.id === id);
    if (product) {
      let completeCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(completeCart);
    } else {
      let newProduct = Products.find((item) => item.id === id);
      setCart([...cart, { ...newProduct, quantity: 1 }]);
    }
  };

  const handleDecrement = (id) => {
    const product = cart.find((item) => item.id === id);
    if (product.quantity === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else if (product.quantity === 0) {
      console.log("no product available");
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  return (
    <View style={styles.productparent}>
      {Products.map((product) => {
        return (
          <View style={styles.cardContainer}>
            <Text style={styles.textStyle}>{product.name}</Text>
            <Text style={styles.textStyle}>{product.price}</Text>
            <View style={styles.productControls}>
              <TouchableOpacity
                disabled={!cart.find((p) => p.id === product.id)?.quantity}
                onPress={() => handleDecrement(product.id)}
              >
                <Text style={styles.textStyle}>{"-"}</Text>
              </TouchableOpacity>
              <Text style={styles.textStyle}>
                {cart.find((item) => item.id === product.id)?.quantity || 0}
              </Text>
              <TouchableOpacity onPress={() => handleIncrement(product.id)}>
                <Text style={styles.textStyle}>{"+"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
});

const CartComponent = ({ cart }) => {
  const totalAmt = cart.reduce(
    (amt, product) => amt + product.price * product.quantity,
    0
  );
  return (
    <View style={styles.cartParent}>
      {cart.map((item) => {
        return (
          <View style={styles.cardContainer}>
            <Text style={styles.textStyle}>{item.name}</Text>
            <Text style={styles.textStyle}>
              {item.quantity}
              {"*"}
              {item.price}
            </Text>
          </View>
        );
      })}
      <View style={[styles.cardContainer, styles.shiftBottom]}>
        <Text style={styles.totaltextStyle}>{"Total:"}</Text>
        <Text style={styles.totaltextStyle}>{totalAmt}</Text>
      </View>
    </View>
  );
};

function App() {
  const [cart, setCart] = React.useState([]);
  return (
    <View style={styles.app}>
      <ProductComponent cart={cart} setCart={setCart} />
      <CartComponent cart={cart} />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    width: "100%",
    hieght: 100,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cartParent: {
    borderWidth: 5,
    borderColor: "grey",
    width: "39%"
  },
  productparent: {
    borderWidth: 5,
    borderColor: "lightgrey",
    width: "59%"
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    backgroundColor: "grey",
    paddingHorizontal: 3
  },
  textStyle: {
    color: "white",
    fontWeight: "400"
  },
  totaltextStyle: {
    color: "white",
    fontWeight: "600"
  },
  productControls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#3b93a9",
    alignItems: "center",
    width: "20%"
  },
  shiftBottom: {
    marginTop: "auto"
  }
});

export default App;
