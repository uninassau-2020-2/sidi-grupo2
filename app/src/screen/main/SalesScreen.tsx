import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../../interface";
import { HeaderRight, ListEmpty } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../services/store/createStore";
import { loadRequestAction } from "../../services/store/ducks/product/actions";

const ProductScreen: React.FC = () => {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { data: products, loading, error } = useSelector(
    (state: StoreState) => state.product
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setRefreshing(loading);
  }, [loading]);

  const onRefresh = useCallback(() => {
    getProducts();
  }, []);

  function getProducts() {
    dispatch(loadRequestAction());
  }

  function handleToEditProvider(product: Product) {
    navigation.navigate("NewEditProduct", {
      isNewProduct: false,
      product: product,
    });
  }

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.action}>
          <Text style={styles.title}>Total:</Text>
          <Text style={styles.title}>R$125</Text>
        </View>
      </View>
    );
  };

  const renderItemList = () => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      key={String()}
      
    >
      {/* <Image source={{ uri: item.image }} style={styles.cardImage} /> */}
      <View
        style={{
          marginLeft: 6,
          flex: 1,
        }}
      >
        <Text style={styles.cardDescriptionData}>20/12/2020</Text>
        <Text style={styles.cardTitle}>Biscoito Maisena</Text>
      </View>
      <View style={{ alignItems: "flex-end", marginRight: 20 }}>
        <Text style={styles.cardValue}>R$50</Text>
        <Text style={styles.cardDescription}>MasterCard</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {renderHeader()}
      <View style={styles.conteiner}>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 12,
          }}
          keyExtractor={(item, index) => String(index)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={products || []}
          renderItem={renderItemList}
          ListEmptyComponent={<ListEmpty />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="carregando.."
            />
          }
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  separator: {
    marginVertical: 3,
  },
  title:{
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 22,
  },
  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 6,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    margin: 12,
    alignItems: "center",
  },
  cardDetails: {
    backgroundColor: "#05375a",
    height: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: "center",
  },
  cardImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 18,
  },
  cardValue: {
    fontSize: 22,
    color: "#83d79a",
    fontWeight: "bold",
  },
  cardDescription: {
    color: "#a2abbb",
    marginBottom: 15,
    fontSize: 14
  },
  cardDescriptionData: {
    color: "#a2abbb",
    marginBottom: 1,
    fontSize: 16,
    fontWeight: "bold"
  },

  action: {
   
    paddingHorizontal: 24,
    marginVertical: 12,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 12,
    margin: 12,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#FFF",
    width: "90%",
    color: "#222",
    fontSize: 17,
    borderRadius: 10,
    padding: 8,
  },
  subTitle: {
    fontSize: 16,
    marginTop: 12,
    marginRight: 12,
    alignItems: "center",
    color: "#D4D4D4",
    textAlign: "right",
  },
  buttons: {
    backgroundColor: "#8DD6CA",
    paddingVertical: 8,
    marginVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    margin: 12,
    alignItems: "center",
  },
});

export default ProductScreen;
