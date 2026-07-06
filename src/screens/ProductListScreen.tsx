import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Product } from '../types/Product';
import { ProductStackParamList } from '../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import ProductService from '../services/ProductService';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductList'>

function ProductListScreen({ navigation }: Props) {
  type productState =
    | { status: 'success', productList: Product[] }
    | { status: 'isLoading' }
    | { status: 'error', errorMsg: string }
  const [state, setState] = useState<productState>({ status: 'isLoading' })
  const [categoryList, setCategoryList] = useState<{ label: string; value: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setState({ status: 'isLoading' })
    try {
      const [products, categories] = await Promise.all([
        ProductService.getProducts(),
        ProductService.getCategories()
      ])
      setState({ status: 'success', productList: products })
      setCategoryList([
        { label: 'ALL', value: 'ALL' },
        ...categories.map((category) => ({
          label: category.toUpperCase(),
          value: category,
        })),
      ]);
    } catch (error) {
      setState({ status: 'error', errorMsg: error instanceof Error ? error.message : 'Something went wrong' })
    }
  }

  const handleCategoryChanged = async (category: string | null) => {
    setSelectedCategory(category)
    setState({ status: 'isLoading' })
    try {
      if (!category || category === 'ALL') {
        const products = await ProductService.getProducts()
        setState({ status: 'success', productList: products })
      } else {
        const products = await ProductService.getProductByCategory(category)
        setState({ status: 'success', productList: products })
      }
    } catch (error) {
      setState({ status: 'error', errorMsg: error instanceof Error ? error.message : 'Something went wrong' })
    }
  }

  if (state.status === 'isLoading') return <LoadingView />;
  if (state.status === 'error') return <ErrorView message={state.errorMsg} onDismiss={() => null} />

  return (
    <View style={Styles.container}>
      <View style={styles.dropdownWrapper}>
        <DropDownPicker
          open={open}
          value={selectedCategory}
          items={categoryList}
          setOpen={setOpen}
          setValue={setSelectedCategory}
          onChangeValue={(value) => { handleCategoryChanged(value) }}
          setItems={setCategoryList}
          placeholder="Select category"
          zIndex={1000}
          zIndexInverse={3000}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <FlatList
        data={state.productList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id, productName: item.title })}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
    zIndex: 1000,
  },
  dropdown: {
    borderColor: Colors.lightGray,
    borderRadius: 8,
    minHeight: 40,
  },
  dropdownContainer: {
    borderColor: Colors.lightGray,
    borderRadius: 8,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row' as const,
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
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  productCategory: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 4,
  },
})

export default ProductListScreen;