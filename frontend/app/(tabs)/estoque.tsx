import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";

interface Product {
  id: number;
  name: string;
  price: number;
  brand_id: number;
  brand_name?: string;
}

const EstoqueScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listarProdutos();
  }, []);

  async function listarProdutos() {
    try {
      const response = await fetch(
        'http://localhost:8000/api/products'
      );
      
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Verifica se data é um array antes de setar
      if (Array.isArray(data)) {
        // Mapeia os produtos 
        const produtosFormatados = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          brand_id: item.brand_id,
          brand_name: item.brand?.name || 'São Braz'
        }));
        
        setProducts(produtosFormatados);
      } else {
        throw new Error("Formato de dados inválido da API");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setError("Não foi possível carregar os produtos");
      setLoading(false);
    }
  };

  // Filtra produtos na busca
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.brand_name && product.brand_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={listarProdutos}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Estoque de Produtos</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar produto ou marca..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />

      <Text style={styles.productCount}>
        {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'} encontrados
      </Text>

      <View style={styles.grid}>
        {filteredProducts.map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={styles.productCard}
          >
            <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
            <Text style={styles.brandName} numberOfLines={1}>{product.brand_name}</Text>
            <Text style={styles.productPrice}>R$ {(Math.round(Number(product.price || 0) * 100) / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2,maximumFractionDigits: 2})}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};















const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  searchInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productCount: {
    color: '#666',
    marginBottom: 16,
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  brandName: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  errorText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  retryText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
});

export default EstoqueScreen;