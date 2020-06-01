import * as React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

const list = [
  {
    name: "Amy Farha",
    subtitle: "August 23, 1954",
  },
  {
    name: "Chris Jackson",
    subtitle: "October 2, 1991",
  },
  {
    name: "Michael Saucedo",
    subtitle: "June 28, 1960",
  },
  {
    name: "Irene Bojorquez",
    subtitle: "May 3, 1953",
  },
  {
    name: "Teri Greene",
    subtitle: "June 18, 1993",
  },
  {
    name: "Robin Hughes",
    subtitle: "October 8, 1967",
  },
  {
    name: "Ted Snow",
    subtitle: "December 10, 1991",
  },
  {
    name: "Gerald Delgado",
    subtitle: "January 18, 1981",
  },
  {
    name: "Andrew Culpepper",
    subtitle: "March 15, 1948",
  },
  {
    name: "Virgil Velez",
    subtitle: "October 9, 1969",
  },
  {
    name: "Sharon Richards",
    subtitle: "October 25, 1967",
  },
  {
    name: "Ginger Baze",
    subtitle: "June 27, 1943",
  },
  {
    name: "Janet Joyner",
    subtitle: "August 17, 1963",
  },
  {
    name: "Ellen McLean",
    subtitle: "August 6, 1942",
  },
  {
    name: "Felipe Jacobs",
    subtitle: "August 30, 1991",
  },
  {
    name: "Larry Patterson",
    subtitle: "September 7, 1989",
  },
];

export default function RNListItem(props) {
  return (
    <View>
      {list.map((item, i) => (
        <ListItem
          key={i}
          title={item.name}
          subtitle={item.subtitle}
          onPress={() =>
            props.navigation.navigate("Demographics", {
              name: item.name,
              DOB: item.subtitle,
            })
          }
          bottomDivider
          chevron
        />
      ))}
    </View>
  );
}
