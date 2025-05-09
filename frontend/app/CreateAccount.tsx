import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Link, useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validação simples
      if (!name || !birthdate || !cpf || !email || !password) {
        throw new Error("Por favor, preencha todos os campos");
      }

      // Simulação de chamada API
      // Substituir por chamada real ao back

      
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/backend/public/api/register`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            name: "Nome do Usuário",
            birthdate: "01-01-1990", 
            cpf: "123.456.789-00", 
            email: "usuario@example.com",
            password: "senhaSegura123",
            password_confirmation: "senhaSegura123" // Adicionar confirmação
        })
    }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      // Login bem-sucedido - tela principal
      router.replace("/(tabs)/homescreen");
      
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Ocorreu um erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo */}
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo ao SB Solutions!</Text>
          <Text style={styles.subtitle}>Crie sua conta para continuar</Text>
        </View>


        

        {/* Formulário */}




        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento"
            placeholderTextColor="#999"
            value={birthdate}
            onChangeText={setBirthDate}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#999"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Criar Conta</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};












const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#fdecea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
  },
});

export default LoginScreen;