import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DemographicsScreen from "./screens/DemographicsScreen";
import * as React from "react";
import * as eva from "@eva-design/eva";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from "react-native";
import { ThemeProvider } from "react-native-elements";
import useCachedResources from "./hooks/useCachedResources";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import {
  ApplicationProvider,
  IconRegistry,
  TopNavigation,
  Text,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./navigation/Navigation";
import { PatientInfoScreen } from "./screens/PatientInfoScreen";

const Stack = createStackNavigator();

export const Context = React.createContext();

const theme = {
  // Button: {
  //   raised: true,
  // },
};

export default function App(props) {
  const [auth, setAuth] = React.useState(true);
  const [email, setEmail] = React.useState("Admin@admin.com");
  const [password, setPassword] = React.useState("P@ssword123");
  const isLoadingComplete = useCachedResources();

  const authenticate = (data) => {
    let x = {
      email: email,
      password: password,
    };
    console.log(x);
    fetch("http://69c6dafdd75b.ngrok.io/api/Users/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.isValid == true) {
          setAuth(true);
        }
      });
  };

  const renderTabBar = () => {
    return <StatusBar />;
  };

  const onChangeEmail = (query) => {};

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <View
            renderTabBar={renderTabBar}
            style={{
              flex: 1,
            }}
          >
            <StatusBar />
            {auth && (
              <>
                <TopNavigation
                  title={(evaProps) => (
                    // <Text {...evaProps}>Baton Rouge General</Text>
                    <Image
                      style={{ width: 225, height: 40 }}
                      source={require("./assets/images/BRG_Header.png")}
                    />
                  )}
                />
                <Context.Provider
                  value={{
                    setAuth: setAuth,
                  }}
                >
                  <AppNavigator />
                </Context.Provider>
              </>
            )}
            {!auth && (
              <Layout
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <Image
                  style={{ width: 300, height: 105, marginBottom: 5 }}
                  source={require("./assets/images/BRG.png")}
                />
                <Input
                  value="Admin@admin.com"
                  size="medium"
                  placeholder="Email"
                  onChangeText={(e) => setEmail(e)}
                />
                <Input
                  value="P@ssword123"
                  secureTextEntry={true}
                  size="medium"
                  placeholder="Password"
                  onChangeText={(e) => setPassword(e)}
                />
                <Button onPress={authenticate}>Login</Button>
              </Layout>
            )}
          </View>
        </ApplicationProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
