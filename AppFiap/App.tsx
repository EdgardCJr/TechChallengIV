import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from './src/services/authContext';

import LoginScreen from "./src/screens/LoginScreen";
import PostsListScreen from "./src/screens/PostsListScreen";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import EditPostScreen from "./src/screens/EditPostScreen";
import AdminDashboardScreen from "./src/screens/AdminDashboardScreen";
import CreateUserScreen from "./src/screens/CreateTeacherScreen";
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
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" id={undefined}>

          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={MainPostListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabs} options={{ title: "Main Dashboard", headerShown: false }} />

          <Stack.Screen name="PostsListScreen" component={PostsListScreen} options={{ title: "Posts" }} />
          <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} options={{ title: "Detalhes" }} />

          <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: "Create Post" }} />
          <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: "Edit Post" }} />

          <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ title: "Create Teacher" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
