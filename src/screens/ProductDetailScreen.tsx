import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../navigation/AppNavigator';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import ProductService from '../services/ProductService';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductDetail'>

function ProductDetailScreen({ navigation, route }: Props) {
  type ProductDetailState =
    | { status: 'loading' }
    | { status: 'success', product: Product }
    | { status: 'error', errorMsg: string }
  const [state, setState] = useState<ProductDetailState>({ status: 'loading' });
  const [quantity, setQuantity] = useState<number>(1);

  const { productId } = route.params;
  const { addItem } = useCart();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    setState({ status: 'loading' })
    try {
      const response = await ProductService.getProductById(productId);
      setState({ status: 'success', product: response })
    } catch (error) {
      setState({ status: 'error', errorMsg: error instanceof Error ? error.message : 'Something went wrong' })
    }
  };

  const handleAddToCart = () => {
    if (state.status === 'success') {
      addItem(state.product, quantity);
      navigation.goBack();
    }
  };

  if (state.status === 'loading') return <LoadingView />
  if (state.status === 'error') return <ErrorView message={state.errorMsg} onDismiss={() => null} />

  return (
    <View style={Styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: state.product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{state.product.category.toUpperCase()}</Text>
          <Text style={styles.title}>{state.product.title}</Text>
          <Text style={styles.price}>${state.product.price.toFixed(2)}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {state.product.rating.rate}</Text>
            <Text style={styles.ratingCount}>({state.product.rating.count} reviews)</Text>
          </View>

          {/* Description */}
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{state.product.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={Styles.bottomBarContainer}>
        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={Styles.bottomBarButton}
          onPress={handleAddToCart}>
          <Text style={Styles.bottomBarText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    backgroundColor: Colors.white,
    padding: 24,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 280,
  },
  infoContainer: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    color: Colors.text.primary,
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    backgroundColor: Colors.lightGray,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: Colors.text.primary,
  }
});

export default ProductDetailScreen;