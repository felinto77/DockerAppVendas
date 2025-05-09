import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

interface Product {
  id: number;
  name: string;
  price: number;
  brand_id: number;
}

const ExploreScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Extrai os parâmetros
  const brandId = params.brandId ? parseInt(params.brandId as string) : null;
  const brandName = params.brandName as string || 'Marca';
  const brandColor = params.brandColor as string || '#4A90E2';
  const productIds = params.productIds ? JSON.parse(params.productIds as string) as number[] : [];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        
        if (productIds.length > 0) {
          const response = await fetch(
            `http://192.168.9.191/backend/public/api/products?ids=${productIds.join(',')}`  
          );

          if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);
          console.log(response);
          const data = await response.json();
          setProducts(data);
        } 

      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={brandColor} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: `${brandColor}10` }]}>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={styles.backButton}
      >
        <Text style={[styles.backButtonText, { color: brandColor }]}>
          ← Voltar para marcas
        </Text>
      </TouchableOpacity>

      <View style={[styles.header, { backgroundColor: brandColor }]}>
        <Text style={styles.brandTitle}>{brandName}</Text>
      </View>

      {products.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum produto encontrado nesta marca</Text>
      ) : (
        products.map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={styles.productItem}
            onPress={() => router.push({
              pathname: "/",
              params: { productId: product.id.toString() }
            })}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <Text style={[styles.productPrice, { color: brandColor }]}>
              R$ {formatPrice(product.price)}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const formatPrice = (price?: number) => {
  return (price ?? 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};







const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  productName: {
    fontSize: 16,
    color: '#555',
    flexShrink: 1,
    marginRight: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default ExploreScreen;