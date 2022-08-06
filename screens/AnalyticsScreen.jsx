import { View, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Text as SVGText } from "react-native-svg";
import { useEffect, useState } from "react";
import AnalyticsChoose from "../components/AnalyticsChoose";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const AnalyticsScreen = ({ categories }) => {
  const [groupByValue, setGroupByValue] = useState(1);
  const groupByOptions = [
    { label: "Type", value: 1 },
    { label: "Category", value: 2 },
    { label: "Date", value: 3 },
  ];
  let categoryIndex = 0;
  const typeOptions = categories
    .flatMap((c) =>
      c.items.map((i) => ({ value: categoryIndex++, label: i.type }))
    )
    .filter((v, i, a) => a.findIndex((v2) => v2.label === v.label) === i);
  const [typesToShow, setTypesToShow] = useState(
    typeOptions.map((opt) => opt.value)
  );

  const categoryOptions = categories.map((c, index) => ({
    label: c.name,
    value: index,
  }));
  const [categoriesToShow, setCategoriesToShow] = useState(
    categoryOptions.map((opt) => opt.value)
  );

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const filterData = (
    typesUpdated,
    categoriesUpdated,
    dateRangeUpdated,
    groupByUpdated
  ) => {
    const getValueByTypeName = (typeName) => {
      return typeOptions.find((type) => type.label === typeName).value;
    };

    const getValueByCategoryName = (categoryName) => {
      return categoryOptions.find((c) => c.label === categoryName).value;
    };

    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    const postCategoryFilter = categories.filter((c) =>
      categoriesUpdated.includes(getValueByCategoryName(c.name))
    );

    const filterCost = (item) => {
      return dateRangeUpdated.startDate
        ? item.date >= dateRangeUpdated.startDate
        : true && dateRangeUpdated.endDate
        ? item.date <= dateRangeUpdated.endDate
        : true && typesUpdated.includes(getValueByTypeName(item.type));
    };

    if (groupByUpdated === 1) {
      // group by type
      let output = [];
      postCategoryFilter
        .flatMap((c) => c.items)
        .reduce((map, item) => {
          if (filterCost(item))
            map.set(
              item.type,
              (map.get(item.type) ? map.get(item.type) : 0) +
                item.cost * item.multiplier
            );
          return map;
        }, new Map())
        .forEach((val, key) =>
          output.push({ key, amount: val, svg: { fill: randomColor() } })
        );
      return output;
    } else if (groupByUpdated === 2) {
      // group by category
      return postCategoryFilter
        .map((c) => ({ name: c.name, color: c.color, items: c.items }))
        .map(({ name, color, items }) => ({
          key: name,
          svg: { fill: color },
          amount: items.reduce(
            (sum, item) =>
              filterCost(item) ? sum + item.cost * item.multiplier : sum,
            0
          ),
        }));
    } else if (groupByUpdated === 3) {
      // group by date
      let output = [];
      postCategoryFilter
        .flatMap((c) => c.items)
        .reduce((map, item) => {
          if (filterCost(item))
            map.set(
              item.date.toDateString(),
              (map.get(item.date.toDateString())
                ? map.get(item.date.toDateString())
                : 0) +
                item.cost * item.multiplier
            );
          return map;
        }, new Map())
        .forEach((val, key) =>
          output.push({ key, amount: val, svg: { fill: randomColor() } })
        );
      return output;
    }
  };
  const [data, setData] = useState(
    filterData(typesToShow, categoriesToShow, dateRange, groupByValue)
  );

  useEffect(() => {
    setGroupByValue(1);
    setTypesToShow(typeOptions.map((opt) => opt.value));
    setCategoriesToShow(categoryOptions.map((opt) => opt.value));
    setDateRange({
      startDate: 0,
      endDate: new Date(),
    });
    setData(filterData(typesToShow, categoriesToShow, dateRange, groupByValue));
  }, []);

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <SVGText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={24}
          stroke={"black"}
          strokeWidth={1}
        >
          {data.amount}
        </SVGText>
      );
    });
  };

  return (
    <View>
      <AnalyticsChoose
        onGroupByChoose={(val) => {
          setGroupByValue(val);
          setData(filterData(typesToShow, categoriesToShow, dateRange, val));
        }}
        groupByValue={groupByValue}
        onTypesSelect={(types) => {
          setTypesToShow(types);
          setData(filterData(types, categoriesToShow, dateRange, groupByValue));
        }}
        typesToShow={typesToShow}
        onCategoriesSelect={(categories) => {
          setCategoriesToShow(categories);
          setData(filterData(typesToShow, categories, dateRange, groupByValue));
        }}
        categoriesToShow={categoriesToShow}
        onDateRangeSelect={(startDate, endDate) => {
          setDateRange({ startDate, endDate });
          setData(
            filterData(
              typesToShow,
              categoriesToShow,
              { startDate, endDate },
              groupByValue
            )
          );
        }}
        typeOptions={typeOptions}
        categoryOptions={categoryOptions}
        groupByOptions={groupByOptions}
      />

      <PieChart
        style={{ height: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={"95%"}
      >
        <Labels />
      </PieChart>

      <View style={{ width: "50%", marginTop: 20 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: item.svg.fill,
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
              />
              <Text style={{ fontSize: 20 }}>{item.key}</Text>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );
};

export default AnalyticsScreen;
