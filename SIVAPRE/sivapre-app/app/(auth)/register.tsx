import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function Register() {
    const router = useRouter();

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

            {/* Header */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>Únete a la vigilancia comunitaria</Text>

            {/* Formulario */}
            <View style={styles.form}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre Completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu nombre completo"
                        placeholderTextColor={Colors.textLight}
                        autoCapitalize="words"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>DNI</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu DNI"
                        placeholderTextColor={Colors.textLight}
                        keyboardType="numeric"
                        maxLength={8}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu teléfono"
                        placeholderTextColor={Colors.textLight}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Municipio / Distrito</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. San Juan de Lurigancho"
                        placeholderTextColor={Colors.textLight}
                        autoCapitalize="words"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Crea una contraseña"
                        placeholderTextColor={Colors.textLight}
                        secureTextEntry
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Confirmar Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Repite tu contraseña"
                        placeholderTextColor={Colors.textLight}
                        secureTextEntry
                    />
                </View>

            </View>

            {/* Botón */}
            <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => router.replace('/(tabs)')}
            >
                <Text style={styles.buttonPrimaryText}>CREAR CUENTA</Text>
            </TouchableOpacity>

            {/* Login */}
            <View style={styles.loginRow}>
                <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <Text style={styles.loginLink}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    container: {
        paddingHorizontal: 32,
        paddingTop: 60,
        paddingBottom: 80,
    },
    backButton: {
        marginBottom: 32,
    },
    backText: {
        fontFamily: 'Inter-Regular',
        color: Colors.textLight,
        fontSize: 14,
    },
    title: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 28,
        color: Colors.text,
        marginBottom: 6,
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.textLight,
        marginBottom: 36,
    },
    form: {
        gap: 20,
        marginBottom: 28,
    },
    inputGroup: {
        gap: 6,
    },
    label: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 12,
        color: Colors.text,
        letterSpacing: 0.5,
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.text,
        backgroundColor: Colors.background,
    },
    buttonPrimary: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    buttonPrimaryText: {
        color: Colors.white,
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 14,
        letterSpacing: 1,
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.textLight,
    },
    loginLink: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 14,
        color: Colors.primary,
    },
});