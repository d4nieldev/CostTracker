import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useState } from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import moment from "moment";
import DateRangePicker from "rn-select-date-range";
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
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);

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

      <TouchableOpacity onPress={() => setIsDateRangeVisible((v) => !v)}>
        <Text>View costs from dates</Text>
      </TouchableOpacity>
      {isDateRangeVisible && (
        <DateRangePicker
          onSelectDateRange={(range) => {
            newStart = startDate;
            newEnd = endDate;
            if (range.firstDate != undefined)
              newStart = range.firstDate.toDate();
            if (range.secondDate != undefined)
              newEnd = range.secondDate.toDate();
            setStartDate(newStart);
            setEndDate(newEnd);
            onDateRangeSelect(newStart, newEnd);
          }}
          blockSingleDateSelection={true}
          selectedDateContainerStyle={styles.selectedDateContainerStyle}
          selectedDateStyle={styles.selectedDateStyle}
        />
      )}

      {startDate && endDate && (
        <View>
          <Text>
            Showing {startDate.toDateString()} - {endDate.toDateString()}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setStartDate(null);
              setEndDate(null);
              onDateRangeSelect(startDate, endDate);
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
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
});

export default AnalyticsChoose;
