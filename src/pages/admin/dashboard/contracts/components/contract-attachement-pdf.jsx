import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
  },
  value: {
    width: "70%",
  },
  footer: {
    marginTop: 30,
    borderTop: "1px solid #ccc",
    paddingTop: 10,
    fontSize: 10,
    textAlign: "center",
  },
});

const getStatus = (startDate, endDate) => {
  const now = new Date();
  let sDate = new Date(startDate);
  let eDate = new Date(endDate);
  now.setHours(0, 0, 0);
  if (now < sDate) return "Upcoming";
  if (now > eDate) return "Completed";
  return "Active";
};

// PDF Document Component
function ContractPDF({ contract, car, user }) {
  const duration = Math.floor(
    (new Date(contract.endDate) - new Date(contract.startDate)) /
      (1000 * 60 * 60 * 24)
  );

  const totalPrice = duration * contract.price;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text>Car Rental Service</Text>
          <Text>{new Date().toLocaleDateString()}</Text>
        </View>

        {/* Title */}
        <View>
          <Text style={styles.title}>CONTRACT ATTACHMENT</Text>
          <Text style={styles.subtitle}>For Contract #{contract.id}</Text>
        </View>

        {/* Contract Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTRACT DETAILS</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Contract ID:</Text>
            <Text style={styles.value}>{contract.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.value}>
              {new Date(contract.startDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>End Date:</Text>
            <Text style={styles.value}>
              {new Date(contract.endDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Price:</Text>
            <Text style={styles.value}>${contract.price}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CLIENT INFORMATION</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ID/CIN:</Text>
            <Text style={styles.value}>{user.cin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>

        {/* Vehicle Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VEHICLE INFORMATION</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Make:</Text>
            <Text style={styles.value}>{car.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Model:</Text>
            <Text style={styles.value}>{car.model}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Year:</Text>
            <Text style={styles.value}>{car.year}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{car.type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Daily Rate:</Text>
            <Text style={styles.value}>${car.price}</Text>
          </View>
        </View>

        {/* Additional Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADDITIONAL NOTES</Text>
          <Text>
            This document serves as an official attachment to the rental
            contract referenced above. It contains a summary of the key details
            of the rental agreement for quick reference. For the complete terms
            and conditions, please refer to the main contract document.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Mingo Cars • Generated on {new Date().toLocaleString()}
          </Text>
          <Text>
            This is an official document. Please keep for your records.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default ContractPDF;
