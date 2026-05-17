import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/screen/AuthContext';
import Dashboard from './src/screen/Dashboard';
import CounterScreen from './src/zustand/CounterScreen';
import store from './src/zustand/Store';
import { useCounterStore } from './src/zustand/Store';
import { View, Text, Button } from 'react-native';

export default function App() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthProvider>
          <Dashboard />
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>Count: {count}</Text>
            <Button title="Increment" onPress={increment} />
            <Button title="Decrement" onPress={decrement} />
            <Button title="Reset" onPress={reset} />
          </View>
          <CounterScreen />
        </AuthProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

