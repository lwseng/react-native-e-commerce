import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { RootTabParamList } from "../navigation/AppNavigator"

type NavigationProp = BottomTabNavigationProp<RootTabParamList>

function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { cartItems, removeItem, updateQuantity, checkout, totalItems, totalPrice } = useCart();

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'Are you sure you want to checkout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            checkout();
            Alert.alert('Success', 'Your order has been placed!');
          }
        }
      ]
    );
  };

  const handleDeleteItem = (productId: number) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            removeItem(productId);
            Alert.alert('Item deleted');
          }
        }
      ]
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={Styles.centerContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={Styles.subtitleText}>Your cart is empty!</Text>
        <Text style={styles.emptySubtitle}>Add some products to get started</Text>
        {/* Navigate to Shop tab! */}
        <TouchableOpacity
          style={Styles.primaryButton}
          onPress={() => navigation.navigate('ShopTab')}>
          <Text style={Styles.primaryButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            {/* Product Image */}
            <Image
              source={{ uri: item.product.image }}
              style={styles.productImage}
              resizeMode="contain"
            />

            {/* Product Info */}
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>
                {item.product.title}
              </Text>
              <Text style={styles.productPrice}>
                ${item.product.price.toFixed(2)}
              </Text>

              {/* Quantity + Remove Row */}
              <View style={styles.actionRow}>
                {/* Quantity Selector */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      if (item.quantity === 1) {
                        handleDeleteItem(item.product.id)
                      } else {
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    }}>
                    <Text style={styles.quantityButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Remove Button */}
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleDeleteItem(item.product.id)}>
                  <Text style={styles.removeButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total ({totalItems} items)</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginVertical: 8,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  cartItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: Colors.lightGray,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: Colors.text.primary,
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    fontSize: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;