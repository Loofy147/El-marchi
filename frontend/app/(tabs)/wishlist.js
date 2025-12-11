import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { useRouter } from 'expo-router';

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const token = userInfo ? JSON.parse(userInfo).token : null;
        if (!token) {
          setError('Please log in to view your wishlist.');
          setLoading(false);
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/api/wishlist`, config);
        setWishlist(data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const removeFromWishlistHandler = async (id) => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const token = userInfo ? JSON.parse(userInfo).token : null;
      if (!token) {
        setError('Please log in to modify your wishlist.');
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${API_URL}/api/wishlist/${id}`, config);
      setWishlist(wishlist.filter((p) => p._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('userInfo');
    router.replace('/login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Button
        title="Remove"
        onPress={() => removeFromWishlistHandler(item._id)}
      />
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wishlist</Text>
      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <Button title="Logout" onPress={logoutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
});

export default WishlistScreen;
