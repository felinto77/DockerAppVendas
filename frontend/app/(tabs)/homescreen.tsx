import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Link, useRouter } from 'expo-router';

type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
  brand_id: number;
}

const BRAND_CONTAINERS = [
  { id: 1, name: 'Pippos', color: '#e74c3c', icon: '🍪' },
  { id: 2, name: 'Tuffit', color: '#3498db', icon: '🍪' },
  { id: 3, name: 'Café São Braz', color: '#2ecc71', icon: '☕' },
  { id: 4, name: 'Café Blend 53', color: '#f39c12', icon: '☕' },
  { id: 5, name: 'Salgadinho Brazitos', color: '#9b59b6', icon: '🍿' },
  { id: 6, name: 'Batata Scrush', color: '#1abc9c', icon: '🍟' },
  { id: 7, name: 'GOSTOSIN', color: '#d35400', icon: '🍫' },
  { id: 8, name: 'Torrada Torraditos', color: '#34495e', icon: '🍞' },
  { id: 9, name: 'Achocolatado Powerlate', color: '#27ae60', icon: '🥤' },
  { id: 10, name: 'Nordestino', color: '#e67e22', icon: '🌽' },
  { id: 11, name: 'Novomilho', color: '#16a085', icon: '🌽' },
  { id: 12, name: 'Cereal Gold Flakes', color: '#8e44ad', icon: '🥣' },
];

const HomeScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000'}/api/products`
        );
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setError("Não foi possível carregar os produtos. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredBrands = BRAND_CONTAINERS.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProductsByBrand = (brandId: number) => {
    console.log({products, brandId});
    return products.filter(product => product.category_id === brandId);
  };

  if (isLoading) {
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
        <TouchableOpacity onPress={() => window.location.reload()}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SB Solutions</Text>
      </View>

      {/* Barra de pesquisa */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar marcas..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Banner promocional */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300x150' }}
        style={styles.banner}
        accessibilityLabel="Banner promocional"
      />

      {/* Botões principais */}
      <View style={styles.buttonRow}>
        <Link href="/(tabs)/categories" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>Categorias</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/LoginScreen" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Lista de marcas em grid */}
      <Text style={styles.sectionTitle}>Nossas Marcas</Text>
      
      {filteredBrands.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhuma marca encontrada</Text>
      ) : (
        <View style={styles.gridContainer}>
          {filteredBrands.map((brand) => {
            const brandProducts = getProductsByBrand(brand.id);
            console.log(brandProducts)
            return (
              <TouchableOpacity
                key={brand.id}
                style={[
                  styles.brandCard, 
                  { 
                    backgroundColor: `${brand.color}20`, 
                    borderColor: brand.color 
                  }
                ]}
                onPress={() => router.push({
                  pathname: "/ExploreScreen",
                  params: { 
                    brandId: brand.id.toString(),
                    brandName: brand.name,
                    brandColor: brand.color,
                    productIds: JSON.stringify(brandProducts.map(p => p.id))
                  }
                })}
              >
                <Text style={[styles.brandIcon, { fontSize: 32 }]}>
                  {brand.icon}
                </Text>
                <Text style={[styles.brandName, { color: brand.color }]}>
                  {brand.name}
                </Text>
                <Text style={styles.productCount}>
                  {brandProducts.length} {brandProducts.length === 1 ? 'produto' : 'produtos'}
                </Text>
                
                {/* Lista rápida de 2 produtos (opcional) */}
                {brandProducts.slice(0, 2).map(product => (
                  <Text key={product.id} style={styles.productName}>
                    • {product.name}
                  </Text>
                ))}
                {brandProducts.length > 2 && (
                  <Text style={styles.productName}>...</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
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
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  searchBar: {
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
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3498db',
    marginRight: 8,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#7f8c8d',
    marginLeft: 8,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brandCard: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  brandIcon: {
    marginBottom: 8,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 12,
    color: '#666',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 20,
  },
  productName: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});

export default HomeScreen;