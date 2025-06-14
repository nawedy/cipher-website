import { useState, useEffect, useCallback } from 'react';
import { Cart, CartItem, Product } from '@/types/marketplace';

interface UseCartReturn {
  cart: Cart;
  loading: boolean;
  error: string | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total_items: 0,
    total_amount: 0,
    subtotal: 0,
    tax_amount: 0,
    currency: 'USD'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cipher_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }
    } catch (err) {
      console.error('Error loading cart from localStorage:', err);
      setError('Failed to load cart');
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cipher_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error saving cart to localStorage:', err);
    }
  }, [cart]);

  // Calculate totals
  const calculateTotals = useCallback((items: CartItem[]) => {
    const total_items = items.reduce((sum, item) => sum + item.quantity, 0);
    const total_amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { total_items, total_amount };
  }, []);

  // Add item to cart
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      setCart(prevCart => {
        const existingItemIndex = prevCart.items.findIndex(
          item => item.product_id === product.id
        );

        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item
          newItems = [...prevCart.items];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity
          };
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product_id: product.id,
            quantity,
            price: product.price || 0,
            variant: null,
            product: {
              id: product.id,
              name: product.name,
              description: product.description,
              division: product.division ? {
                name: product.division.name,
                slug: product.division.slug
              } : undefined
            }
          };
          newItems = [...prevCart.items, newItem];
        }

        const { total_items, total_amount } = calculateTotals(newItems);

        return {
          ...prevCart,
          items: newItems,
          total_items,
          total_amount
        };
      });
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding item to cart:', err);
    } finally {
      setLoading(false);
    }
  }, [calculateTotals]);

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    setLoading(true);
    setError(null);

    try {
      setCart(prevCart => {
        const newItems = prevCart.items.filter(item => item.id !== itemId);
        const { total_items, total_amount } = calculateTotals(newItems);

        return {
          ...prevCart,
          items: newItems,
          total_items,
          total_amount
        };
      });
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing item from cart:', err);
    } finally {
      setLoading(false);
    }
  }, [calculateTotals]);

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setCart(prevCart => {
        const newItems = prevCart.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        const { total_items, total_amount } = calculateTotals(newItems);

        return {
          ...prevCart,
          items: newItems,
          total_items,
          total_amount
        };
      });
    } catch (err) {
      setError('Failed to update item quantity');
      console.error('Error updating item quantity:', err);
    } finally {
      setLoading(false);
    }
  }, [calculateTotals, removeItem]);

  // Clear cart
  const clearCart = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      setCart({
        items: [],
        total_items: 0,
        total_amount: 0,
        subtotal: 0,
        tax_amount: 0,
        currency: 'USD'
      });
    } catch (err) {
      setError('Failed to clear cart');
      console.error('Error clearing cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get total item count
  const getItemCount = useCallback(() => {
    return cart.total_items;
  }, [cart.total_items]);

  // Get total amount
  const getTotal = useCallback(() => {
    return cart.total_amount;
  }, [cart.total_amount]);

  return {
    cart,
    loading,
    error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotal
  };
} 