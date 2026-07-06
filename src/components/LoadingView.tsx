import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

function LoadingView() {
  return (
    <View style={Styles.centerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

export default LoadingView;