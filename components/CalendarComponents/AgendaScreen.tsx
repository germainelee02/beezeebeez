import { addDays, format } from "date-fns";
import { addDoc, collection, getDocs, orderBy, query, where, doc, getDoc } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import { Agenda } from "react-native-calendars";
import { authentication, db } from "../../firebase/firebase-config";
const { height, width } = Dimensions.get("window");

type Item = {
  name: string
};

type Event = {
  title: string,
  startDate: string,
  endDate: string,
  notes: string,
  id: string

}

const AgendaScreen = () => {
  const [items, setItems] = useState<{[key: string]: Event[]}>({
  });

  useEffect(() => {
    // run once

    const getData = async () => {
      const eventsCol = query(collection(db, "events: " + authentication.currentUser.uid), orderBy("startDate"))
      const eventsSnashot = await getDocs(eventsCol);
      let tempArray = [];
      eventsSnashot.forEach((doc) => {
        tempArray.push(doc.data())
      })
      console.log(tempArray)
      
      const mappedData = tempArray.map((event) => {
        const date = new Date(event.startDate)
        return {
          ...event,
          date: format(date, 'yyyy-MM-dd')
        }
      })
      const reduced = mappedData.reduce((acc, currentItem) => {
        const {date, ...item} = currentItem;
        acc[date] = [item]
        return acc;
      })
      console.log(reduced)
      setItems(reduced);

      // const response = await fetch(
      //   'https://jsonplaceholder.typicode.com/posts',
      // );       
      // const data: Event[] = await response.json();

      // const mappedData = data.map((post, index) => {
      //   const date = addDays(new Date(), index);

      //   return {
      //     ...post,
      //     date: format(date, 'yyyy-MM-dd'),
      //   };
      // });

      // const reduced = mappedData.reduce(
      //   (acc: {[key: string]: Event[]}, currentItem) => {
      //     const {date, ...coolItem} = currentItem;

      //     acc[date] = [coolItem];

      //     return acc;
      //   },
      //   {},
      // );

    };

    getData();
  }, []);

  const renderItem = (item: Item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Agenda items={items} renderItem={renderItem} style={{height: height, width: width}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default AgendaScreen;
