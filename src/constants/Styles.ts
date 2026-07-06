import { StyleSheet } from 'react-native';
import Colors from './Colors';

const Styles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  //Bottom Stick Container
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  bottomBarButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bottomBarText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Cards
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Typography
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  captionText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },

  // Buttons
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dangerButton: {
    backgroundColor: Colors.red,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  // Spacing
  padding: {
    padding: 16,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 8,
  },
});

export default Styles;