import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {Colors} from '../AllData/Utill';

const SlotTime = ({onStartTimeChange, onEndTimeChange, tor, data}) => {
  const [numColumns, setNumColumns] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState([]);

  // const [torna, settoyna] = useState(tor);

  const handleSlotSelection = (id, data) => {
    if (selectedSlot.length == 1) {
      const sID = selectedSlot[0].id;
      const filterSlot = data.filter(slot =>
        sID > id
          ? slot.id <= sID && slot.id >= id
          : slot.id >= sID && slot.id <= id,
      );
      onStartTimeChange(filterSlot[0].start_time);
      onEndTimeChange(filterSlot[filterSlot.length - 1].end_time);
      setSelectedSlot(filterSlot);

      console.log(filterSlot[0].start_time);
      console.log(filterSlot[filterSlot.length - 1].end_time);
    } else {
      const filterSlot = data.filter(slot => slot.id == id);
      onStartTimeChange(filterSlot[0].start_time);
      onEndTimeChange(filterSlot[filterSlot.length - 1].end_time);
      setSelectedSlot(filterSlot);
      console.log(filterSlot[0].start_time);
      console.log(filterSlot[filterSlot.length - 1].end_time);
    }
  };

  const renderItem = ({item, index}) => {
    const starttimes = moment.utc(item.start_time * 1000).format('hh:mm A');
    const endtime = moment.utc(item.end_time * 1000).format('hh:mm A');
    const fulltime = `${starttimes} - ${endtime}`;
    const slot = selectedSlot.map(i => i.id);
    console.log(item.available, starttimes, '==check');
    return (
      <>
        {item.start_time && (
          <TouchableOpacity
            disabled={!item.available}
            style={[
              {
                backgroundColor: '#fff',
                margin: 10,
                padding: 12,
                borderRadius: wp(1.5),
                borderColor: Colors.blue,
                borderWidth: wp(0.3),
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              },
              slot.includes(item.id) && styles.selectedTimeSlot,
              !item.available ? styles.notAvaable : null,
            ]}
            onPress={() => {
              handleSlotSelection(item.id, data);
            }}>
            <Text
              style={[
                styles.timeText,
                slot.includes(item.id) && styles.selectedtext, !item.available ? styles.notAvaable : null
              ]}>
              {fulltime}
            </Text>
            <Text
              style={[
                styles.timeText,
                slot.includes(item.id) && styles.selectedtext, !item.available ? styles.notAvaable : null
              ]}>
            $ 200
            </Text>
            {/* </View> */}
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: hp(2),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.pxboxa}></View>

          <Text style={styles.sold}>Available</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.pxboxs}></View>

          <Text style={styles.sold}>Selected</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.pxboxn}></View>

          <Text style={styles.sold}>Not Available</Text>
        </View>

      
      </View>
      <FlatList
        style={{flex: 1,padding:10, margin:4}}
        contentContainerStyle={{justifyContent: 'space-between'}}
        data={data}
        numColumns={numColumns}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notAvaable: {
    backgroundColor: Colors.not_availe,
    color: '#fff',
  },
  datess: {alignSelf: 'center', color: '#f97272', marginVertical: hp(1)},
  pxboxa: {
    width: wp(3),
    height: wp(3),
    backgroundColor: '#fff',
    marginHorizontal: wp(2),
    borderColor: '#000',
    borderWidth: 1,
  },
  pxboxs: {
    width: wp(3),
    height: wp(3),
    backgroundColor: Colors.sky,
    marginHorizontal: wp(2),
    borderColor: '#000',
    borderWidth: 1,
  },
  pxboxn: {
    width: wp(3),
    height: wp(3),
    backgroundColor: Colors.not_availe,
    marginHorizontal: wp(2),
    borderColor: '#000',
    borderWidth: 1,
  },
  sold: {color: '#000'},
  thiView: {marginHorizontal: wp(10)},
  minHoursText: {
    textAlign: 'center',
    fontSize: wp(4),
    color: 'red',
    marginTop: 10,
  },
  timeText: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  selectedtext: {color: '#fff'},
  selectedItem: {
    // Add styles to indicate the selected item (e.g., change the background color)
    backgroundColor: 'blue',
  },
  slotTxt: {
    color: '#000',
    borderWidth: wp(0.3),
    borderColor: Colors.blue,
    padding: wp(3),
    borderRadius: wp(2),
    fontSize: wp(4),
    marginBottom: wp(1),
  },
  textLeft: {textAlignVertical: 'center', flex: 1},
  timeSlot: {
    backgroundColor: '#E3EFEB',
    margin: wp(2),
    borderRadius: wp(1.5),
    borderColor: Colors.blue,
    borderWidth: wp(0.3),
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  calView: {marginTop: hp(10)},
  con: {
    backgroundColor: '#E3EFEB',
    width: wp(12),
    height: wp(15),
    borderRadius: wp(2),
  },
  localestyle: {
    name: 'en', // Set the locale to English
    config: {
      months: moment.localeData('en').months(), // Use English months
      weekdaysShort: moment.localeData('en').weekdaysShort(), // Use English weekdays
    },
  },
  dateselect: {
    type: 'border',
    borderWidth: 0, // Adjust the borderWidth as desired
    borderHighlightColor: Colors.blue,

    // Add padding to create space between the border and content
  },
  hightname: {
    color: Colors.blue,
    fontSize: wp(4),
  },
  highDate: {color: Colors.blue, fontSize: wp(5)},
  datename: {color: 'grey', fontSize: wp(3.5)},
  numdate: {color: 'grey', fontSize: wp(3.5)},
  calheader: {
    color: '#000',
    fontSize: wp(5),
    paddingBottom: wp(5),
  },
  maincalanedr: {
    height: hp(14),
    paddingBottom: 20,
    position: 'relative',
  },
  container: {position: 'relative', flex:1},
  selectedDateText: {textAlign: 'center'},
  selectedItem: {
    backgroundColor: Colors.blue,
  },
  selectedTimeSlot: {
    backgroundColor: Colors.sky,
  },
});

export default SlotTime;
