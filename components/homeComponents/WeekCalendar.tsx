import { format, getDate, startOfWeek, addDays, isSameDay } from 'date-fns';
import moment from 'moment';
import React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");

type Props = {
    date: Date;
    onChange: (value: Date) => void;
  }

const WeekCalendar: FunctionComponent<Props> = ({ date }) => {
    const [week, setWeek] = useState<weekDay[]>([]);

    useEffect(() => {
        const weekDays = getWeekDays(date);
        setWeek(weekDays);
    }, [date]);

    return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <View style={styles.monthContainer}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>{moment().format("MMMM")}</Text>
            </View>
            <View style={styles.container}>
                {week.map(weekDay => {
                    const textStyles = [styles.label];
                    const touchable = [styles.touchable];
                    // check if we are on the selected date, 
                    // essentially makes todays date a diff color
                    const sameDay = isSameDay(weekDay.date, date);
                    if (sameDay) {
                        textStyles.push(styles.selectedLabel);
                        touchable.push(styles.selectedTouchable);
                    }

                    
                    // returns each item
                    return (
                        <View key={weekDay.formatted} style ={styles.weekDayItem}>
                            {/* text */}
                            <Text style={styles.weekDayText}>
                                {weekDay.formatted}
                            </Text>
                            {/* dates */}
                            <View
                                style={touchable}
                            >
                                <Text style={textStyles}>{weekDay.day}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
        
    )
} 

const styles = StyleSheet.create({
    
    container: {
      flexDirection: "row",
      justifyContent: 'space-around',
      width: width - 40,
      height: 80,
      paddingTop: 10
      
    },
    monthContainer: {
        width: width - 40,
        backgroundColor: "#f5e8bb",
        alignItems: "center",
        borderRadius: 25,
        padding: 8
    },

    weekDayText: {
        color: 'gray',
        marginBottom: 10,
        fontSize: 12
    },
    label: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center'
    },
    selectedLabel: {
        color: 'white',
    },
    touchable: {
        borderRadius: 20,
        padding: 7.5,
        height: 35,
        width: 35,
    },
    selectedTouchable: {
        backgroundColor: '#ffba09',
    },
    weekDayItem: {
        alignItems: "center",
    }
  });

  type weekDay = {
      formatted: string;
      date: Date;
      day: number;
  };

  // get week days
  // returns an array of weekDays
  export const getWeekDays = (date: Date): weekDay[] => {
      // week starts on monday
      const start = startOfWeek(date, {weekStartsOn: 1});
      const final = [];

      for (let i = 0; i < 7; i++) {
          const date = addDays(start, i);
          final.push({
              formatted: format(date, 'EEE'),
              date,
              day: getDate(date),
          });
      }
      return final;
  };
  
  export default WeekCalendar;