import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Text } from "react-native"

// Screens (we'll create these soon)
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

export type ProductStackParamList = {
    ProductList: undefined
    ProductDetail: { productId: number, productName: string }
}

export type CartStackParamList = {
    Cart: undefined;
};

export type RootTabParamList = {
    ShopTab: undefined
    CartTab: undefined
}

const ProductStack = createNativeStackNavigator<ProductStackParamList>()
const CartStack = createNativeStackNavigator<CartStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

function ShopListStack() {
    return (
        <ProductStack.Navigator>
            <ProductStack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{ title: "Product List" }}
            />
            <ProductStack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={({ route }) => ({ title: route.params.productName })}
            />
        </ProductStack.Navigator>
    )
}

function CartListStack() {
    return (
        <CartStack.Navigator>
            <CartStack.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: "Cart List" }}
            />
        </CartStack.Navigator>
    )
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="ShopTab"
                    component={ShopListStack}
                    options={{
                        headerShown: false, title: 'Shop', tabBarIcon: ({ color, size }) => (
                            <Text style={{ color, fontSize: size }}>🛍️</Text>
                        )
                    }}
                />
                <Tab.Screen
                    name="CartTab"
                    component={CartListStack}
                    options={{
                        headerShown: false, title: 'Cart', tabBarIcon: ({ color, size }) => (
                            <Text style={{ color, fontSize: size }}>🛒</Text>
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator