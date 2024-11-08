import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../AppFiap/src/Home/index"

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
        </StackNavigation.Navigator>
      </NavigationContainer>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
