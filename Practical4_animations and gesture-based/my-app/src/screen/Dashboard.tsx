import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "./AuthContext"; // Only import context here
import { useContext } from "react";

export default function Dashboard() {
  const auth = useContext(AuthContext);

  const handleLogin = () => {
    const myUser = {
      id: "777",
      name: "Lhundup dorji",
    };
    auth?.login(myUser);
  };

  const handleLogout = () => {
    auth?.logout();
  };

  return (
    <View>
      <Text style={styles.title}>Dashboard</Text>
      {auth?.isLogin ? (
        <>
          <Text style={styles.userText}>Welcome, {auth.user?.name}!</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#2b99d0ff",
    borderRadius: 5,
    textAlign: "center",
  },
  userText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});