import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const renderTotalToday = () => (
    <View style={styles.categoryBtn}>
      <Text style={styles.infoTitlePostive}>+R$300,20</Text>
      <Text style={styles.infoLegend}>total de hoje</Text>
    </View>
  );

  const renderAvarageMonth = () => (
    <View style={styles.categoryBtn}>
      <Text style={styles.infoTitle}>R$200,00</Text>
      <Text style={styles.infoLegend}>média do mês</Text>
    </View>
  );

  const renderCardProduct = () => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            "https://veja.abril.com.br/wp-content/uploads/2020/08/2-GettyImages-1128182316.jpg.jpg?quality=70&strip=info&resize=100,100",
        }}
        style={styles.cardImage}
      />
      <View style={{ marginLeft: 6, flex: 1 }}>
        <Text style={styles.cardTitle}>Mel</Text>
        <Text style={styles.cardDescription}>mais vendido</Text>
      </View>
      <Text style={styles.cardValue}>R$30,00</Text>
    </View>
  );

  const renderCardSale = () => (
    <View style={styles.card}>
      <Image
        source={{
          uri: "https://ui-avatars.com/api/?name=John+Doe",
        }}
        style={styles.cardImage}
      />
      <View style={{ marginLeft: 6, flex: 1 }}>
        <Text style={styles.cardTitle}>João Devoto</Text>
        <Text style={styles.cardDescription}>funcionário do dia</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.cardValue}>+R$300,00</Text>
        <Text style={styles.cardDescription}>30 vendas</Text>
      </View>
    </View>
  );

  const generateChartConfig = (): AbstractChartConfig => ({
    fillShadowGradientOpacity: 1,
    fillShadowGradient: "#d7dfff",
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#f2f2f2",
    backgroundGradientToOpacity: 1,
    backgroundGradientFromOpacity: 1,
    color: () => "#000",
    labelColor: () => "#c1c4cb",
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeDasharray: "4",
      strokeWidth: 0, // If you put 0 in the value no line is displayed
      stroke: `rgba(0, 0, 0, 0)`,
    },
  });

  const renderGraphic = () => {
    const data: LineChartData = {
      labels: ["1", "5", "7", "15", "20", "25", "30"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(132, 159, 255, ${opacity})`, // optional
          // color: (opacity = 1) => `rgba(215, 223, 255, ${opacity})`, // optional
          strokeWidth: 4, // optional
        },
      ],
      // legend: ["Rainy Days"], // optional
    };
    // const chartConfig = {
    //   backgroundGradientFrom: "#1E2923",
    //   backgroundGradientFromOpacity: 0,
    //   backgroundGradientTo: "#08130D",
    //   backgroundGradientToOpacity: 0.5,
    //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    //   strokeWidth: 2, // optional, default 3
    //   barPercentage: 0.5,
    //   useShadowColorFromDataset: false, // optional
    // };
    return (
      <View style={{ marginVertical: 24 }}>
        <LineChart
          data={data}
          style={{ borderRadius: 20 }}
          width={400}
          height={220}
          yAxisSuffix=""
          chartConfig={generateChartConfig()}
          bezier
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <Text style={styles.title}>Dados Financeiros</Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 12,
          }}
        >
          {renderTotalToday()}
          {renderAvarageMonth()}
        </View>
        {renderGraphic()}
        {renderCardProduct()}
        {renderCardSale()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 0,
  },
  title: {
    marginTop: 12,
    fontSize: 24,
    color: "#5c657e",
    fontWeight: "bold",
  },

  infoTitle: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#2d3858",
  },

  infoTitlePostive: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#83d79a",
  },
  infoLegend: {
    fontWeight: "bold",
    color: "#babec5",
  },
  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 16,
  },

  cardValue: {
    fontSize: 16,
    color: "#83d79a",
    fontWeight: "bold",
  },

  cardDescription: {
    color: "#a2abbb",
  },
});
