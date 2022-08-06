import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useState } from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import DateRangePicker from "react-native-daterange-picker";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const AnalyticsChoose = ({
  onGroupByChoose,
  groupByValue,
  onTypesSelect,
  typesToShow,
  onCategoriesSelect,
  categoriesToShow,
  onDateRangeSelect,
  typeOptions,
  categoryOptions,
  groupByOptions,
}) => {
  const [isGroupByFocus, setIsGroupByFocus] = useState(false);
  const [isCategoriesFocus, setIsCategoriesFocus] = useState(false);
  const [isTypesFocus, setIsTypesFocus] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.chooseContainer}>
        <Text>Group by:</Text>
        <Dropdown
          style={[styles.dropdown, isGroupByFocus && { borderColor: "blue" }]}
          containerStyle={{ marginTop: -40 }}
          data={groupByOptions}
          placeholder="Type"
          labelField="label"
          valueField="value"
          onFocus={() => setIsGroupByFocus(true)}
          onBlur={() => setIsGroupByFocus(false)}
          onChange={(item) => {
            onGroupByChoose(item.value);
            setIsGroupByFocus(false);
          }}
          value={groupByValue}
        />
      </View>

      <View style={styles.chooseContainer}>
        <MultiSelect
          style={[
            styles.dropdown,
            isCategoriesFocus && { borderColor: "blue" },
          ]}
          containerStyle={{ marginTop: -40 }}
          data={categoryOptions}
          placeholder="Choose categories to take account of"
          labelField="label"
          valueField="value"
          onFocus={() => setIsCategoriesFocus(true)}
          onBlur={() => setIsCategoriesFocus(false)}
          onChange={(selectedItems) => {
            onCategoriesSelect(selectedItems);
            setIsCategoriesFocus(false);
          }}
          value={categoriesToShow}
        />
      </View>
      <View style={styles.chooseContainer}>
        <MultiSelect
          style={[styles.dropdown, isTypesFocus && { borderColor: "blue" }]}
          containerStyle={{ marginTop: -40 }}
          data={typeOptions}
          placeholder="Choose types to take account of"
          labelField="label"
          valueField="value"
          onFocus={() => setIsTypesFocus(true)}
          onBlur={() => setIsTypesFocus(false)}
          onChange={(selectedItems) => {
            onTypesSelect(selectedItems);
            setIsTypesFocus(false);
          }}
          value={typesToShow}
        />
      </View>

      <DateRangePicker
        onChange={(dates) => {
          if (dates.startDate != null) setStartDate(dates.startDate.toDate());
          if (dates.endDate != null) {
            const t = dates.endDate.toDate();
            t.setDate(t.getDate() + 1);
            setEndDate(t);
          }
          onDateRangeSelect(startDate, endDate);
        }}
        startDate={moment(startDate)}
        endDate={moment(endDate)}
        displayedDate={moment()}
        range={true}
      >
        <Text>Choose relevant dates</Text>
      </DateRangePicker>
      {startDate && endDate && (
        <View>
          <Text>
            Showing {startDate.toDateString()} - {endDate.toDateString()}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setStartDate(null);
              setEndDate(null);
            }}
          >
            <Text>(cancel)</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 4,
    padding: 20,
  },
  chooseContainer: {
    marginBottom: 20,
  },
});

export default AnalyticsChoose;
