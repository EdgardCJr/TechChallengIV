import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from './src/services/authContext';
import { UpdateProvider } from "./src/Components/createContext";

import LoginScreen from "./src/screens/LoginScreen";
import PostsListScreen from "./src/screens/PostsListScreen";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import EditPostScreen from "./src/screens/EditPostScreen";
import AdminDashboardScreen from "./src/screens/AdminDashboardScreen";
import CreateUserScreen from "./src/screens/CreateUserScreen";
import EditUserScreen from "./src/screens/EditUserScreen";
import UserManagementScreen from "./src/screens/UserManagementScreen";
import MainPostListScreen from "./src/screens/MainPostListScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator id={undefined}>
    <Tab.Screen name="Home" component={MainPostListScreen} />
    <Tab.Screen name="Area Administrativa" component={AdminDashboardScreen} />
  </Tab.Navigator>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UpdateProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" id={undefined}>

            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={MainPostListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainTabs} options={{ title: "Home", headerShown: false }} />

            <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: "Criar Postagem" }} />
            <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: "Editar postagem" }} />
            <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: "Detalhes da postagem" }} />

            <Stack.Screen name="AdminUser" component={UserManagementScreen} options={{ title: "Manutenção de Usuário" }} />
            <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ title: "Criação de Usuário" }} />
            <Stack.Screen name="EditUser" component={EditUserScreen} options={{ title: "Detalhes de Usuário" }} initialParams={{ userId: undefined }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </UpdateProvider>
    </AuthProvider>
  );
};

export default App;
