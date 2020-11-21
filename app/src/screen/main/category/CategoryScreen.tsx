import React, { useLayoutEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import DismissKeyboard from "../../../components/DismissKeyboard";
import DeleteSwipe from "../../../components/DeleteSwipe";

import CategoriesData from "../../../data/CategoryData.json";
import ListEmpty from "../../../components/ListEmpty";
import HeaderRight from "../../../components/HeaderRight";
import { Category } from "../../../interface";

const DATA_CATEGORIES: Array<Category> = CategoriesData;

const CategoryScreen: React.FC = () => {
  const [categories, setCategories] = useState(DATA_CATEGORIES);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={() => navigation.navigate("NewEditCategory")} />
      ),
    });
  }, [navigation]);

  const renderItemList = ({ item, index }: ListRenderItemInfo<Category>) => (
    <DeleteSwipe
      titleDelete="Remover categoria"
      messageDelete="Tem certeza que deseja remover?"
      onDelete={(ref) => {
        setCategories(
          categories.filter((item, indexItem) => indexItem !== index)
        );
      }}
    >
      <TouchableOpacity
        style={styles.card}
        key={String(item.id)}
        delayPressIn={20}
      >
        <Text style={styles.cardTitle}>{item.name}</Text>

        <Ionicons name="md-arrow-forward" size={20} color="#05375a" />
      </TouchableOpacity>
    </DeleteSwipe>
  );

  return (
    <DismissKeyboard>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 12,
        }}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={categories}
        renderItem={renderItemList}
        ListEmptyComponent={<ListEmpty />}
      />
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 12,
    alignItems: "center",
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 16,
  },
  separator: {
    marginVertical: 3,
  },
});

export default CategoryScreen;
