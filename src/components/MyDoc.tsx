import {
  Document,
  StyleSheet,
  Text,
  View,
  Page,
  Font,
} from "@react-pdf/renderer";
import { Word } from "../types";
import { columns } from "../utils/table";

Font.register({
  family: "Alef",
  src: "/fonts/Alef/Alef-Regular.ttf",
});

export function MyDoc({ file }: { file: Word[] }) {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 35,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  const tableStyles = StyleSheet.create({
    table: {
      padding: 12,
      width: "100%",
      margin: "10px 0",
      fontFamily: "Alef",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "33%",
      borderStyle: "solid",
      borderColor: "#222",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableTransliterationCol: {
      textAlign: "center",
    },
    tableHebrewCol: {
      textAlign: "right",
    },
    tableCell: {
      margin: 5,
      fontSize: 12,
    },
    tableHeader: {
      backgroundColor: "#222",
      color: "#eee",
    },
  });

  return (
    <Document>
      <Page size="A4">
        <View style={styles.body}>
          <Text style={styles.title}>Arqueología</Text>
        </View>
        <View style={tableStyles.table}>
          <View style={[tableStyles.tableRow, tableStyles.tableHeader]}>
            {columns.map((column) => (
              <View key={column.accessorKey} style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>{column.header}</Text>
              </View>
            ))}
          </View>

          {file.map((word, index) => (
            <View style={tableStyles.tableRow} key={index}>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>{word.español}</Text>
              </View>
              <View
                style={[
                  tableStyles.tableCol,
                  tableStyles.tableTransliterationCol,
                ]}
              >
                <Text style={tableStyles.tableCell}>
                  {word.transliteración}
                </Text>
              </View>
              <View style={[tableStyles.tableCol, tableStyles.tableHebrewCol]}>
                <Text style={tableStyles.tableCell}>{word.hebreo}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
