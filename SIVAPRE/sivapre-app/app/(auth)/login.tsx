import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function Login() {
    const router = useRouter();

    return (
        <View style={styles.container}>

            {/* Header */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>Bienvenido de nuevo</Text>

            {/* Formulario */}
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Usuario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu usuario"
                        placeholderTextColor={Colors.textLight}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu contraseña"
                        placeholderTextColor={Colors.textLight}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>

            {/* Botón principal */}
            <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => router.replace('/(tabs)')}
            >
                <Text style={styles.buttonPrimaryText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>

            {/* Divisor */}
            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>o continúa con</Text>
                <View style={styles.dividerLine} />
            </View>

            {/* Google */}
            <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleText}>🔵 Google</Text>
            </TouchableOpacity>

            {/* Registro */}
            <View style={styles.registerRow}>
                <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                    <Text style={styles.registerLink}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 32,
        paddingTop: 60,
        paddingBottom: 40,
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
    forgot: {
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: Colors.primary,
        textAlign: 'right',
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
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        color: Colors.textLight,
    },
    googleButton: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 32,
        backgroundColor: Colors.white,
    },
    googleText: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 14,
        color: Colors.text,
    },
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: Colors.textLight,
    },
    registerLink: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 14,
        color: Colors.primary,
    },
});