import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/LoginScreen";
import MainPostListScreen from "./src/screens/MainPostListScreen";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import EditPostScreen from "./src/screens/EditPostScreen";
import AdminDashboardScreen from "./src/screens/AdminDashboardScreen";
import CreateTeacherScreen from "./src/screens/CreateTeacherScreen";
import EditTeacherScreen from "./src/screens/EditTeacherScreen";
import TeachersListScreen from "./src/screens/TeachersListScreen";
import CreateStudentScreen from "./src/screens/CreateStudentScreen";
import EditStudentScreen from "./src/screens/EditStudentScreen";
import StudentsListScreen from "./src/screens/StudentsListScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminTabs = () => (
  <Tab.Navigator id={undefined}>
    <Tab.Screen name="Posts" component={AdminDashboardScreen} />
    <Tab.Screen name="Teachers" component={TeachersListScreen} />
    <Tab.Screen name="Students" component={StudentsListScreen} />
  </Tab.Navigator>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" id={undefined}>
        {/* Login */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

        {/* Public Pages */}
        <Stack.Screen name="MainPostList" component={MainPostListScreen} options={{ title: "Posts" }} />
        <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: "Post Details" }} />

        {/* Admin Pages */}
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: "Create Post" }} />
        <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: "Edit Post" }} />
        <Stack.Screen name="AdminDashboard" component={AdminTabs} options={{ title: "Admin Dashboard", headerShown: false }} />

        {/* Teachers Management */}
        <Stack.Screen name="CreateTeacher" component={CreateTeacherScreen} options={{ title: "Create Teacher" }} />
        <Stack.Screen name="EditTeacher" component={EditTeacherScreen} options={{ title: "Edit Teacher" }} />

        {/* Students Management */}
        <Stack.Screen name="CreateStudent" component={CreateStudentScreen} options={{ title: "Create Student" }} />
        <Stack.Screen name="EditStudent" component={EditStudentScreen} options={{ title: "Edit Student" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
