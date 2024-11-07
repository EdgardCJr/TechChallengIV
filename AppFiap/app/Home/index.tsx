import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
//import RegisterUser from "./src/Register";
import Login from "../Login";

const StackNavigation = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <StackNavigation.Navigator initialRouteName="Login">
          <StackNavigation.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <StackNavigation.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              header: () => <Header title="Home" onMenuPress={() => {}} />,
            })}
          />
          <StackNavigation.Screen
            name="RegisterUser"
            component={RegisterUser}
            options={({ navigation }) => ({
              header: () => (
                <Header
                  title="RegisterUser"
                  onMenuPress={() => {}}
                  canGoBack={navigation.canGoBack()}
                />
              ),
              footer: () => <Footer navigation={navigation} />,
            })}
          />
        </StackNavigation.Navigator>
      </NavigationContainer>
  );
}