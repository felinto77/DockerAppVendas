import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

type Category = {
  id: number;
  name: string;
  icon: string;
}

type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
}

const CategoriesScreen = ({ onBack }: { onBack: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca categorias e produtos em paralelo
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('http://backend:8000/api/categories'),
          fetch('http://backend:8000/api/products')
        ]);
        
        const categoriesJson = await categoriesRes.json();
        const productsJson = await productsRes.json();
        
        setCategories(categoriesJson);
        setProducts(productsJson);
      } catch(error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Agrupa produtos por categoria
  const productsByCategory = categories.map(category => ({
    ...category,
    products: products.filter(product => product.category_id === category.id)
  }));

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Link href="/(tabs)/homescreen" asChild>
          <TouchableOpacity style={styles.backButtonContainer}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>Categorias</Text>
      </View>

      {/* Lista de categorias */}
      <View style={styles.grid}>
        {productsByCategory.map((category) => (
          <Link 
            key={category.id} 
            href={{
              pathname: "/CategoryProducts",
              params: { 
                categoryId: category.id,
                categoryName: category.name
              }
            }} 
            asChild
          >
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.productCount}>
                {category.products.length} {category.products.length === 1 ? 'produto' : 'produtos'}
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};











const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 55,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 5,
  },
  productCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  backButtonContainer: {
    padding: 8, 
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF', 
  },
});

export default CategoriesScreen;