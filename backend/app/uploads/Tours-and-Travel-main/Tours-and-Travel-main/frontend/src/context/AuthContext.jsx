import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user + wishlist on startup
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          // Optional: fetch current user profile if backend supports it
          // const userRes = await api.get('/auth/me');
          // setUser(userRes.data);

          // Load wishlist from server
          const res = await api.get('/users/wishlist');
          setWishlist(res.data.data || []);
        } else {
          // Guest wishlist from localStorage
          const stored = localStorage.getItem('wishlist');
          setWishlist(stored ? JSON.parse(stored) : []);
        }
      } catch (e) {
        console.error('Initialization failed', e);

        // fallback to guest wishlist
        const stored = localStorage.getItem('wishlist');
        setWishlist(stored ? JSON.parse(stored) : []);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Reload wishlist when user changes
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (user) {
          const res = await api.get('/users/wishlist');
          setWishlist(res.data.data || []);
        } else {
          const stored = localStorage.getItem('wishlist');
          setWishlist(stored ? JSON.parse(stored) : []);
        }
      } catch (e) {
        console.error('Failed to load wishlist', e);
      }
    };

    if (!loading) {
      loadWishlist();
    }
  }, [user, loading]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);

      setUser(res.data);

      // Sync guest wishlist to server
      const guestWishlist = JSON.parse(
        localStorage.getItem('wishlist') || '[]'
      );

      if (guestWishlist.length > 0) {
        try {
          for (const tourId of guestWishlist) {
            await api.post(`/users/wishlist/${tourId}`);
          }

          localStorage.removeItem('wishlist');

          const serverRes = await api.get('/users/wishlist');
          setWishlist(serverRes.data.data || []);
        } catch (e) {
          console.error('Wishlist sync failed', e);
        }
      }

      return res.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);

      setUser(res.data);

      return res.data;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setWishlist([]);
  };

  const toggleWishlist = async (tourId) => {
    try {
      if (!user) {
        // Guest mode
        let updated = [];

        if (wishlist.includes(tourId)) {
          updated = wishlist.filter((id) => id !== tourId);
        } else {
          updated = [...wishlist, tourId];
        }

        setWishlist(updated);

        localStorage.setItem('wishlist', JSON.stringify(updated));
      } else {
        // Logged in mode
        await api.post(`/users/wishlist/${tourId}`);

        const res = await api.get('/users/wishlist');

        setWishlist(res.data.data || []);
      }
    } catch (e) {
      console.error('Failed to toggle wishlist', e);
    }
  };

  const isWishlisted = (tourId) => wishlist.includes(tourId);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};