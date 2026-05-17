import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCounterStore } from "./Store";

const CounterScreen: React.FC = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  const countColor = count > 0 ? "#4CAF50" : count < 0 ? "#F44336" : "#FFFFFF";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Counter</Text>

      <View style={styles.countWrapper}>
        <Text style={[styles.count, { color: countColor }]}>{count}</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={decrement}
        >
          <Text style={styles.btnTextLarge}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary]}
          onPress={increment}
        >
          <Text style={styles.btnTextLarge}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.btn, styles.btnReset]} onPress={reset}>
        <Text style={styles.btnTextReset}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 320,
    backgroundColor: "#1E1E1E",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#AAAAAA",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 24,
  },
  countWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
    borderWidth: 2,
    borderColor: "#333333",
  },
  count: {
    fontSize: 64,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  btn: {
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    width: 72,
    height: 72,
    backgroundColor: "#4CAF50",
  },
  btnSecondary: {
    width: 72,
    height: 72,
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#444",
  },
  btnReset: {
    width: 160,
    height: 44,
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#444",
  },
  btnTextLarge: {
    fontSize: 32,
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 38,
  },
  btnTextReset: {
    fontSize: 14,
    fontWeight: "600",
    color: "#AAAAAA",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

export default CounterScreen;