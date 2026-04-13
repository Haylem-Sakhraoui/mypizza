import { jsPDF } from "jspdf";
import type { CartItem } from "../context/CartContext";

interface ReceiptData {
  orderID: string;
  items: CartItem[];
  total: number;
}

export function generateReceipt({ orderID, items, total }: ReceiptData) {
  // Thermal printer style: 80mm width ≈ 226 pts
  const pageWidth = 226;
  const doc = new jsPDF({
    unit: "pt",
    format: [pageWidth, 600],
  });

  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const centerText = (text: string, fontSize: number, bold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    const w = doc.getTextWidth(text);
    doc.text(text, (pageWidth - w) / 2, y);
    y += fontSize * 1.3;
  };

  const leftRight = (left: string, right: string, fontSize: number) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    doc.text(left, margin, y);
    const rw = doc.getTextWidth(right);
    doc.text(right, pageWidth - margin - rw, y);
    y += fontSize * 1.4;
  };

  const dashedLine = () => {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const dash = "-".repeat(48);
    const w = doc.getTextWidth(dash);
    doc.text(dash, (pageWidth - w) / 2, y);
    y += 12;
  };

  // Header
  centerText("My Pizza", 18, true);
  y += 4;
  centerText("Rechnung", 13, true);
  y += 2;
  dashedLine();

  // Order info
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Bestellung: #${orderID.slice(-8).toUpperCase()}`, margin, y);
  y += 13;
  doc.text(`Datum: ${new Date().toLocaleString("de-DE")}`, margin, y);
  y += 6;
  dashedLine();

  // Items header
  leftRight("Artikel", "Preis", 9);
  dashedLine();

  // Item list
  for (const item of items) {
    const lineTotal = (item.price * item.qty).toFixed(2).replace(".", ",");
    leftRight(
      `${item.qty}x ${item.name}`,
      `${lineTotal} \u20AC`,
      9
    );
  }

  dashedLine();

  // Total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  const totalStr = `${total.toFixed(2).replace(".", ",")} \u20AC`;
  doc.text("Gesamtbetrag:", margin, y);
  const tw = doc.getTextWidth(totalStr);
  doc.text(totalStr, pageWidth - margin - tw, y);
  y += 20;

  dashedLine();

  // Paid stamp
  y += 6;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  const paid = "\u2713 Bezahlt";
  const pw = doc.getTextWidth(paid);
  doc.text(paid, (pageWidth - pw) / 2, y);
  y += 22;

  // Footer
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  centerText("Vielen Dank für Ihre Bestellung!", 8);
  centerText("My Pizza - Ihr Lieblingspizzeria", 8);

  // Trim page to content height
  const finalHeight = y + 20;
  const trimmed = new jsPDF({
    unit: "pt",
    format: [pageWidth, finalHeight],
  });
  // Re-draw on trimmed page
  const pages = doc.output("arraybuffer");
  trimmed.addPage();
  trimmed.deletePage(1);

  // Simpler approach: just open the original
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url);
  if (printWindow) {
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  }
}
