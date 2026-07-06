import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

type Props = {
    message: string;
    onDismiss: () => void;
};

function ErrorView({ message, onDismiss }: Props) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={true}>
            {/* Background overlay */}
            <View style={styles.overlay}>
                {/* Popup */}
                <View style={styles.popup}>
                    <Text style={styles.title}>Error</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onDismiss}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 24,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text.primary,
        marginBottom: 12,
    },
    message: {
        fontSize: 14,
        color: Colors.text.secondary,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ErrorView;