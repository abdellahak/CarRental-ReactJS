import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (data) => {
  const doc = new jsPDF();

  // Add company logo if available
  if (data.companyLogo) {
    try {
      doc.addImage(data.companyLogo, "JPEG", 20, 10, 40, 20);
    } catch (error) {
      console.error("Error adding logo:", error);
    }
  }

  // Add invoice title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("INVOICE", 105, 20, { align: "center" });

  // Add invoice number and date
  doc.setFontSize(10);
  doc.text(`Invoice #: ${data.invoiceNumber}`, 150, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 35);

  // Add company info
  doc.setFontSize(12);
  doc.text(data.companyName, 20, 40);
  doc.setFontSize(10);
  doc.text(data.companyAddress, 20, 45);
  doc.text(`Phone: ${data.companyPhone}`, 20, 50);
  doc.text(`Email: ${data.companyEmail}`, 20, 55);

  // Add customer info
  doc.setFontSize(12);
  doc.text("Bill To:", 20, 70);
  doc.setFontSize(10);
  doc.text(data.customerName, 20, 75);
  doc.text(data.customerEmail, 20, 80);

  // Add rental details
  doc.setFontSize(12);
  doc.text("Rental Details:", 20, 95);

  // Create table for rental details
  autoTable(doc, {
    startY: 100,
    head: [["Description", "Period", "Price/Day", "Total"]],
    body: [
      [
        `${data.carName} ${data.carModel}`,
        `${data.startDate} to ${data.endDate}`,
        `${data.pricePerDay} MAD`,
        `${data.totalPrice} MAD`,
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 66, 66] },
  });

  // Add total
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text(`Total Amount: ${data.totalPrice} MAD`, 150, finalY, {
    align: "right",
  });

  // Add footer
  doc.setFontSize(10);
  doc.text("Thank you for your business!", 105, finalY + 20, {
    align: "center",
  });

  // Return the PDF as a data URL
  return doc.output("dataurlstring");
};
