// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import QRCode from 'qrcode';

// // 🔥 SelfySnap Support Number
// const SUPPORT_PHONE = '+91 99922 88843';

// // 🔥 Website URL — QR code isko open karega
// const WEBSITE_URL = 'https://www.selfysnap.com';

// // 🔥 LOGO CONFIG
// const LOGO_PATH = '/logo34.png';
// const LOGO_FORMAT = 'PNG';

// // 🔥 HEADER COLOR
// const HEADER_BLUE_HEX = '#2874f0';

// // 🔥 HEX → RGB
// const hexToRgb = (hex: string): [number, number, number] => {
//   const clean = hex.replace('#', '');
//   const r = parseInt(clean.substring(0, 2), 16);
//   const g = parseInt(clean.substring(2, 4), 16);
//   const b = parseInt(clean.substring(4, 6), 16);
//   return [r, g, b];
// };

// const HEADER_BLUE_RGB = hexToRgb(HEADER_BLUE_HEX);

// interface InvoiceData {
//   orderId: string;
//   orderDate: string;
//   orderStatus: string;
//   paymentMethod: string;
//   paymentStatus: string;
//   customer: {
//     name: string;
//     mobile: string;
//     address: string;
//     city: string;
//     state: string;
//     pinCode: string;
//   };
//   seller: {
//     name: string;
//   };
//   items: Array<{
//     title: string;
//     size: string;
//     quantity: number;
//     price: number;
//     total: number;
//   }>;
//   subtotal: number;
//   deliveryFee: number;
//   discount: number;
//   totalAmount: number;
// }

// // 🔥 LOGO LOADER
// const loadLogo = (): Promise<string | null> => {
//   return new Promise((resolve) => {
//     try {
//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.src = LOGO_PATH;

//       img.onload = () => {
//         try {
//           const canvas = document.createElement('canvas');
//           canvas.width = img.width;
//           canvas.height = img.height;
//           const ctx = canvas.getContext('2d');
//           if (ctx) {
//             ctx.drawImage(img, 0, 0);
//             const format = LOGO_PATH.toLowerCase().endsWith('.png')
//               ? 'image/png'
//               : 'image/jpeg';
//             const dataUrl = canvas.toDataURL(format, 0.95);
//             resolve(dataUrl);
//           } else {
//             resolve(null);
//           }
//         } catch (err) {
//           console.error('Canvas error:', err);
//           resolve(null);
//         }
//       };

//       img.onerror = () => {
//         console.warn(`Logo not found at ${LOGO_PATH}`);
//         resolve(null);
//       };
//     } catch (err) {
//       console.error('Logo load error:', err);
//       resolve(null);
//     }
//   });
// };

// // 🔥 QR CODE GENERATOR
// const generateQRCode = async (url: string): Promise<string | null> => {
//   try {
//     const dataUrl = await QRCode.toDataURL(url, {
//       width: 300,
//       margin: 1,
//       color: {
//         dark: '#000000',
//         light: '#FFFFFF',
//       },
//       errorCorrectionLevel: 'H',
//     });
//     return dataUrl;
//   } catch (err) {
//     console.error('QR code error:', err);
//     return null;
//   }
// };

// export const generateInvoice = async (data: InvoiceData) => {
//   const doc = new jsPDF();

//   // 🔥 Logo + QR parallel load karo
//   const [logoBase64, qrBase64] = await Promise.all([
//     loadLogo(),
//     generateQRCode(WEBSITE_URL),
//   ]);

//   // ─────────── HEADER (WHITE BACKGROUND) ───────────

//   // 🔥 Small Logo
//   if (logoBase64) {
//     try {
//       doc.addImage(
//         logoBase64,
//         LOGO_FORMAT,
//         14, 10, 18, 10,
//         undefined,
//         'FAST'
//       );
//     } catch (err) {
//       console.error('Logo add error:', err);
//       doc.setTextColor(
//         HEADER_BLUE_RGB[0],
//         HEADER_BLUE_RGB[1],
//         HEADER_BLUE_RGB[2]
//       );
//       doc.setFontSize(16);
//       doc.setFont('helvetica', 'bold');
//       doc.text('SelfySnap', 14, 18);
//     }
//   } else {
//     doc.setTextColor(
//       HEADER_BLUE_RGB[0],
//       HEADER_BLUE_RGB[1],
//       HEADER_BLUE_RGB[2]
//     );
//     doc.setFontSize(16);
//     doc.setFont('helvetica', 'bold');
//     doc.text('SelfySnap', 14, 18);
//   }

//   // 🔥 selfysnap.com
//   doc.setTextColor(100, 100, 100);
//   doc.setFontSize(7);
//   doc.setFont('helvetica', 'normal');
//   doc.text('www.selfysnap.com', 14, 24);

//   // 🔥 TAX INVOICE (top-right)
//   doc.setTextColor(
//     HEADER_BLUE_RGB[0],
//     HEADER_BLUE_RGB[1],
//     HEADER_BLUE_RGB[2]
//   );
//   doc.setFontSize(20);
//   doc.setFont('helvetica', 'bold');
//   doc.text('TAX INVOICE', 195, 20, { align: 'right' });

//   // 🔥 Blue separator line
//   doc.setDrawColor(
//     HEADER_BLUE_RGB[0],
//     HEADER_BLUE_RGB[1],
//     HEADER_BLUE_RGB[2]
//   );
//   doc.setLineWidth(0.8);
//   doc.line(14, 32, 196, 32);

//   // ─────────── INVOICE META ───────────
//   doc.setTextColor(50, 50, 50);
//   doc.setFontSize(10);
//   doc.setFont('helvetica', 'normal');

//   doc.text(`Invoice #: INV-${data.orderId.slice(-8).toUpperCase()}`, 14, 42);
//   doc.text(`Order ID: ${data.orderId}`, 14, 48);
//   doc.text(`Order Date: ${data.orderDate}`, 14, 54);
//   doc.text(`Order Status: ${data.orderStatus}`, 14, 60);

//   doc.text(`Payment Mode: ${data.paymentMethod}`, 120, 42);
//   doc.text(`Payment Status: ${data.paymentStatus}`, 120, 48);

//   // ─────────── BILLING DETAILS ───────────
//   let yPos = 73;

//   // BILL TO
//   doc.setFillColor(240, 248, 255);
//   doc.rect(14, yPos - 5, 90, 40, 'F');
//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(
//     HEADER_BLUE_RGB[0],
//     HEADER_BLUE_RGB[1],
//     HEADER_BLUE_RGB[2]
//   );
//   doc.text('BILL TO', 18, yPos);

//   doc.setFontSize(9);
//   doc.setTextColor(50, 50, 50);
//   doc.setFont('helvetica', 'normal');
//   doc.text(data.customer.name || '-', 18, yPos + 7);
//   doc.text(data.customer.mobile || '-', 18, yPos + 13);
//   doc.text(
//     `${data.customer.address || ''}, ${data.customer.city || ''}`,
//     18, yPos + 19
//   );
//   doc.text(
//     `${data.customer.state || ''} - ${data.customer.pinCode || ''}`,
//     18, yPos + 25
//   );

//   // SOLD BY
//   doc.setFillColor(255, 247, 237);
//   doc.rect(106, yPos - 5, 90, 40, 'F');
//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(251, 100, 27);
//   doc.text('SOLD BY', 110, yPos);

//   doc.setFontSize(9);
//   doc.setTextColor(50, 50, 50);
//   doc.setFont('helvetica', 'normal');
//   doc.text(data.seller.name || 'SelfySnap Seller', 110, yPos + 7);

//   // ─────────── ITEMS TABLE ───────────
//   yPos += 50;

//   autoTable(doc, {
//     startY: yPos,
//     head: [['#', 'Product', 'Size', 'Qty', 'Price', 'Total']],
//     body: data.items.map((item, idx) => [
//       idx + 1,
//       item.title,
//       item.size,
//       item.quantity,
//       `Rs. ${item.price.toFixed(2)}`,
//       `Rs. ${item.total.toFixed(2)}`,
//     ]),
//     theme: 'grid',
//     headStyles: {
//       fillColor: HEADER_BLUE_RGB,
//       textColor: [255, 255, 255],
//       fontStyle: 'bold',
//       fontSize: 10,
//     },
//     bodyStyles: {
//       fontSize: 9,
//       textColor: [50, 50, 50],
//     },
//     alternateRowStyles: {
//       fillColor: [245, 250, 255],
//     },
//     columnStyles: {
//       0: { cellWidth: 10 },
//       1: { cellWidth: 70 },
//       2: { cellWidth: 20 },
//       3: { cellWidth: 15, halign: 'center' },
//       4: { cellWidth: 35, halign: 'right' },
//       5: { cellWidth: 35, halign: 'right' },
//     },
//   });

//   // ─────────── SUMMARY ───────────
//   // @ts-ignore
//   yPos = doc.lastAutoTable.finalY + 10;

//   doc.setFontSize(10);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(80, 80, 80);

//   doc.text('Subtotal:', 130, yPos);
//   doc.text(`Rs. ${data.subtotal.toFixed(2)}`, 195, yPos, { align: 'right' });

//   doc.text('Delivery Fee:', 130, yPos + 7);
//   doc.text(
//     data.deliveryFee > 0 ? `Rs. ${data.deliveryFee.toFixed(2)}` : 'FREE',
//     195, yPos + 7, { align: 'right' }
//   );

//   if (data.discount > 0) {
//     doc.setTextColor(34, 197, 94);
//     doc.text('Discount:', 130, yPos + 14);
//     doc.text(`- Rs. ${data.discount.toFixed(2)}`, 195, yPos + 14, {
//       align: 'right',
//     });
//   }

//   // TOTAL BAR
//   yPos += 22;
//   doc.setFillColor(
//     HEADER_BLUE_RGB[0],
//     HEADER_BLUE_RGB[1],
//     HEADER_BLUE_RGB[2]
//   );
//   doc.rect(125, yPos, 75, 12, 'F');
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'bold');
//   doc.text('TOTAL:', 130, yPos + 8);
//   doc.text(`Rs. ${data.totalAmount.toFixed(2)}`, 195, yPos + 8, {
//     align: 'right',
//   });

//   // ─────────── QR CODE (BOTTOM-LEFT) ───────────
//   const qrY = yPos + 25;
//   const qrSize = 30;

//   if (qrBase64) {
//     try {
//       // QR box
//       doc.setFillColor(255, 255, 255);
//       doc.setDrawColor(220, 220, 220);
//       doc.setLineWidth(0.3);
//       doc.rect(14, qrY - 5, qrSize + 10, qrSize + 15, 'FD');

//       // QR image
//       doc.addImage(
//         qrBase64,
//         'PNG',
//         19, qrY,
//         qrSize, qrSize,
//         undefined,
//         'FAST'
//       );

//       // QR label
//       doc.setTextColor(80, 80, 80);
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.text('SCAN TO VISIT', 14 + (qrSize + 10) / 2, qrY + qrSize + 5, {
//         align: 'center',
//       });

//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.text('www.selfysnap.com', 14 + (qrSize + 10) / 2, qrY + qrSize + 9, {
//         align: 'center',
//       });
//     } catch (err) {
//       console.error('QR add error:', err);
//     }
//   }

//   // ─────────── FOOTER ───────────
//   const pageHeight = doc.internal.pageSize.height;
//   doc.setDrawColor(200, 200, 200);
//   doc.setLineWidth(0.5);
//   doc.line(14, pageHeight - 30, 196, pageHeight - 30);

//   doc.setTextColor(100, 100, 100);
//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'normal');
//   doc.text('This is a computer generated invoice.', 14, pageHeight - 22);
//   doc.text(
//     `For support, call us at ${SUPPORT_PHONE} (10 AM - 7 PM)`,
//     14, pageHeight - 16
//   );
//   doc.text('SelfySnap - www.selfysnap.com', 195, pageHeight - 16, {
//     align: 'right',
//   });

//   // ─────────── SAVE ───────────
//   doc.save(`SelfySnap-Invoice-${data.orderId.slice(-8)}.pdf`);
// };


















// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import QRCode from 'qrcode';

// const SUPPORT_PHONE = '+91 99922 88843';
// const SUPPORT_EMAIL = 'support@selfysnap.com';
// const WEBSITE_URL = 'https://www.selfysnap.com';

// const LOGO_PATH = '/logo34.png';
// const LOGO_FORMAT = 'PNG';

// interface InvoiceData {
//   orderId: string;
//   invoiceNumber?: string;
//   orderDate: string;
//   orderStatus: string;
//   paymentMethod: string;
//   paymentStatus: string;
//   awbNumber?: string;

//   customer: {
//     name: string;
//     mobile: string;
//     email?: string;
//     address: string;
//     city: string;
//     state: string;
//     pinCode: string;
//   };

//   delivery?: {
//     name: string;
//     mobile: string;
//     address: string;
//     city: string;
//     state: string;
//     pinCode: string;
//   };

//   seller: {
//     name: string;
//     mobile?: string;
//     email?: string;
//     businessEmail?: string;
//     businessAddress?: string;
//     address?: string;
//     GSTIN?: string;
//     gstin?: string;
//     state?: string;
//     city?: string;
//     pinCode?: string;
//   };

//   items: Array<{
//     title: string;
//     size?: string;
//     quantity: number;
//     price: number;
//     total: number;
//     taxRate?: number;
//     hsnCode?: string;
//   }>;

//   subtotal: number;
//   deliveryFee: number;
//   discount: number;
//   totalAmount: number;
// }

// // ═══════════════════════════════════════════════════
// // HELPERS
// // ═══════════════════════════════════════════════════
// const getFirst = (...values: (string | undefined | null)[]): string => {
//   for (const val of values) {
//     if (val && String(val).trim() !== '' && String(val) !== '-') {
//       return String(val).trim();
//     }
//   }
//   return '';
// };

// const loadLogo = (): Promise<string | null> => {
//   return new Promise((resolve) => {
//     try {
//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.src = LOGO_PATH;
//       img.onload = () => {
//         try {
//           const canvas = document.createElement('canvas');
//           canvas.width = img.width;
//           canvas.height = img.height;
//           const ctx = canvas.getContext('2d');
//           if (ctx) {
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL('image/png', 0.95));
//           } else resolve(null);
//         } catch { resolve(null); }
//       };
//       img.onerror = () => resolve(null);
//     } catch { resolve(null); }
//   });
// };

// const generateQRCode = async (url: string): Promise<string | null> => {
//   try {
//     return await QRCode.toDataURL(url, {
//       width: 300,
//       margin: 1,
//       color: { dark: '#000000', light: '#FFFFFF' },
//       errorCorrectionLevel: 'H',
//     });
//   } catch { return null; }
// };

// const numberToWords = (num: number): string => {
//   const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//   const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//   const numToWords = (n: number): string => {
//     if (n < 20) return a[n];
//     if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
//     if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
//     if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
//     if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
//     return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
//   };

//   const rupees = Math.floor(num);
//   const paise = Math.round((num - rupees) * 100);
//   let words = numToWords(rupees) + ' Rupees';
//   if (paise > 0) words += ' and ' + numToWords(paise) + ' Paise';
//   return words + ' Only';
// };

// // ═══════════════════════════════════════════════════
// // MAIN GENERATOR
// // ═══════════════════════════════════════════════════
// export const generateInvoice = async (data: InvoiceData) => {
//   const doc = new jsPDF({ format: 'a4', unit: 'mm' });

//   const [logoBase64, qrBase64] = await Promise.all([
//     loadLogo(),
//     generateQRCode(WEBSITE_URL),
//   ]);

//   // ═══ DYNAMIC VALUES ═══
//   const sellerName = getFirst(data.seller.name) || 'Seller';
//   const sellerMobile = getFirst(data.seller.mobile) || SUPPORT_PHONE;
//   const sellerEmail = getFirst(data.seller.businessEmail, data.seller.email) || SUPPORT_EMAIL;
//   const sellerGSTIN = getFirst(data.seller.GSTIN, data.seller.gstin) || '-';

//   const sellerAddress = [
//     getFirst(data.seller.businessAddress, data.seller.address),
//     getFirst(data.seller.city),
//     getFirst(data.seller.state),
//     getFirst(data.seller.pinCode),
//   ].filter(p => p).join(', ') || 'Address not available';

//   const deliveryData = data.delivery || {
//     name: data.customer.name,
//     mobile: data.customer.mobile,
//     address: data.customer.address,
//     city: data.customer.city,
//     state: data.customer.state,
//     pinCode: data.customer.pinCode,
//   };

//   const pageWidth = 210;
//   const pageHeight = 297;
//   const margin = 10;
//   const contentWidth = pageWidth - margin * 2;

//   let yPos = margin + 5;

//   // ═══════════════════════════════════════════════════
//   // HEADER (Logo + Brand left, TAX INVOICE right)
//   // ═══════════════════════════════════════════════════
//   const logoW = 22;
//   const logoH = 14;

//   if (logoBase64) {
//     try {
//       doc.addImage(logoBase64, LOGO_FORMAT, margin, yPos, logoW, logoH, undefined, 'FAST');
//     } catch {}
//   }

//   // Brand next to logo
//   doc.setFontSize(14);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);
//   doc.text('Selfysnap', margin + logoW + 4, yPos + 7);

//   doc.setFontSize(7);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(80, 80, 80);
//   doc.text('WWW.SELFYSNAP.COM', margin + logoW + 4, yPos + 12);

//   // TAX INVOICE right
//   doc.setFontSize(16);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);
//   doc.text('TAX INVOICE', pageWidth - margin, yPos + 6, { align: 'right' });

//   doc.setFontSize(7);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(80, 80, 80);
//   doc.text('Tax Invoice/Bill of Supply/Cash Memo', pageWidth - margin, yPos + 11, { align: 'right' });

//   doc.setFont('helvetica', 'bolditalic');
//   doc.text('(Triplicate for Supplier)', pageWidth - margin, yPos + 15, { align: 'right' });

//   yPos += logoH + 3;

//   // Header divider
//   doc.setDrawColor(0, 0, 0);
//   doc.setLineWidth(0.5);
//   doc.line(margin, yPos, pageWidth - margin, yPos);
//   yPos += 5;

//   // ═══════════════════════════════════════════════════
//   // SOLD BY
//   // ═══════════════════════════════════════════════════
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);
//   doc.text('Sold By:', margin, yPos);
//   yPos += 5;

//   doc.setFontSize(10);
//   doc.setFont('helvetica', 'bold');
//   doc.text(sellerName, margin, yPos);
//   yPos += 5;

//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(60, 60, 60);
//   const sellerAddrLines = doc.splitTextToSize(sellerAddress, contentWidth);
//   doc.text(sellerAddrLines, margin, yPos);
//   yPos += sellerAddrLines.length * 3.8 + 2;

//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);
//   doc.text(`GST Registration No: ${sellerGSTIN}`, margin, yPos);
//   yPos += 6;

//   // Seller Mobile + Email
//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(60, 60, 60);
//   doc.text('Seller Mobile:', margin, yPos);
//   doc.setTextColor(0, 0, 0);
//   doc.text(sellerMobile, margin + 28, yPos);

//   doc.setTextColor(60, 60, 60);
//   doc.text('Email:', pageWidth / 2 + 10, yPos);
//   doc.setTextColor(0, 0, 0);
//   doc.text(sellerEmail, pageWidth / 2 + 25, yPos);
//   yPos += 6;

//   doc.setDrawColor(200, 200, 200);
//   doc.setLineWidth(0.2);
//   doc.line(margin, yPos, pageWidth - margin, yPos);
//   yPos += 5;

//   // ═══════════════════════════════════════════════════
//   // BILLING + SHIPPING (2 Columns)
//   // ═══════════════════════════════════════════════════
//   const halfW = contentWidth / 2;

//   // ─── BILLING (Left) ───
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);
//   doc.text('Billing Address:', margin, yPos);

//   // ─── SHIPPING (Right) ───
//   doc.text('Shipping Address:', margin + halfW + 5, yPos);
//   yPos += 5;

//   doc.setFontSize(10);
//   doc.setFont('helvetica', 'bold');
//   doc.text(data.customer.name || '-', margin, yPos);
//   doc.text(deliveryData.name || '-', margin + halfW + 5, yPos);
//   yPos += 5;

//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(50, 50, 50);

//   const billAddr = `${data.customer.address}, ${data.customer.city}, ${data.customer.state} - ${data.customer.pinCode}`;
//   const billLines = doc.splitTextToSize(billAddr, halfW - 5);
//   doc.text(billLines, margin, yPos);

//   const delAddr = `${deliveryData.address}, ${deliveryData.city}, ${deliveryData.state} - ${deliveryData.pinCode}`;
//   const delLines = doc.splitTextToSize(delAddr, halfW - 5);
//   doc.text(delLines, margin + halfW + 5, yPos);

//   const maxAddrLines = Math.max(billLines.length, delLines.length);
//   yPos += maxAddrLines * 3.8 + 3;

//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);
//   doc.text(`Mobile: ${data.customer.mobile || '-'}`, margin, yPos);
//   doc.text(`Mobile: ${deliveryData.mobile || '-'}`, margin + halfW + 5, yPos);
//   yPos += 6;

//   doc.setDrawColor(200, 200, 200);
//   doc.setLineWidth(0.2);
//   doc.line(margin, yPos, pageWidth - margin, yPos);
//   yPos += 5;

//   // ═══════════════════════════════════════════════════
//   // INVOICE META (2 columns)
//   // ═══════════════════════════════════════════════════
//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');

//   const rowMeta = (label1: string, val1: string, label2: string, val2: string) => {
//     doc.setTextColor(70, 70, 70);
//     doc.text(label1, margin, yPos);
//     doc.setTextColor(0, 0, 0);
//     doc.text(val1, margin + 32, yPos);

//     doc.setTextColor(70, 70, 70);
//     doc.text(label2, margin + halfW + 5, yPos);
//     doc.setTextColor(0, 0, 0);
//     doc.text(val2, margin + halfW + 42, yPos);
//     yPos += 5;
//   };

//   rowMeta('Place of supply:', data.customer.state || '-', 'Invoice Number:', data.invoiceNumber || `INV-${data.orderId.slice(-6)}`);
//   rowMeta('Place of delivery:', deliveryData.state || '-', 'Invoice Date:', data.orderDate);
//   rowMeta('Payment Method:', data.paymentMethod || '-', 'AWB Number:', data.awbNumber || '-');
//   rowMeta('Payment Status:', data.paymentStatus || '-', 'Order Date:', data.orderDate);
//   rowMeta('Order Status:', data.orderStatus || '-', 'Order Number:', data.orderId.slice(-15));

//   yPos += 2;

//   // ═══════════════════════════════════════════════════
//   // PRODUCT TABLE
//   // ═══════════════════════════════════════════════════
//   const isInterState = data.seller.state !== data.customer.state;

//   const tableBody = data.items.map((item, idx) => {
//     const taxRate = item.taxRate ?? 18;
//     const totalIncTax = item.total;
//     const netAmount = +(totalIncTax / (1 + taxRate / 100)).toFixed(2);
//     const taxAmount = +(totalIncTax - netAmount).toFixed(2);
//     const unitPrice = +(netAmount / item.quantity).toFixed(2);

//     return [
//       idx + 1,
//       item.title,
//       `Rs. ${unitPrice.toFixed(2)}`,
//       item.quantity,
//       `Rs. ${netAmount.toFixed(2)}`,
//       `${taxRate}%`,
//       isInterState ? 'IGST' : 'CGST+SGST',
//       `Rs. ${taxAmount.toFixed(2)}`,
//       `Rs. ${totalIncTax.toFixed(2)}`,
//     ];
//   });

//   autoTable(doc, {
//     startY: yPos,
//     margin: { left: margin, right: margin },
//     head: [[
//       'Sl. No',
//       'Description',
//       'Unit Price (Net)',
//       'Qty',
//       'Net Amount',
//       'Tax Rate',
//       'Tax Type',
//       'Tax Amount',
//       'Total Amount',
//     ]],
//     body: tableBody,
//     foot: [[
//       {
//         content: 'Grand Total (inclusive of tax)',
//         colSpan: 8,
//         styles: { halign: 'right', fontStyle: 'bold' },
//       },
//       {
//         content: `Rs. ${data.totalAmount.toFixed(2)}`,
//         styles: { halign: 'right', fontStyle: 'bold' },
//       },
//     ]],
//     theme: 'grid',
//     headStyles: {
//       fillColor: [240, 240, 240],
//       textColor: [0, 0, 0],
//       fontStyle: 'bold',
//       fontSize: 8,
//       halign: 'center',
//       cellPadding: 2.5,
//       lineColor: [0, 0, 0],
//       lineWidth: 0.2,
//     },
//     bodyStyles: {
//       fontSize: 8,
//       textColor: [0, 0, 0],
//       fontStyle: 'bold',
//       cellPadding: 2.5,
//       lineColor: [0, 0, 0],
//       lineWidth: 0.2,
//       valign: 'top',
//     },
//     footStyles: {
//       fillColor: [240, 240, 240],
//       textColor: [0, 0, 0],
//       fontSize: 9,
//       fontStyle: 'bold',
//       cellPadding: 3,
//       lineColor: [0, 0, 0],
//       lineWidth: 0.2,
//     },
//     columnStyles: {
//       0: { cellWidth: 12, halign: 'center' },
//       1: { cellWidth: 50 },
//       2: { cellWidth: 20, halign: 'right' },
//       3: { cellWidth: 10, halign: 'center' },
//       4: { cellWidth: 20, halign: 'right' },
//       5: { cellWidth: 15, halign: 'center' },
//       6: { cellWidth: 18, halign: 'center' },
//       7: { cellWidth: 18, halign: 'right' },
//       8: { cellWidth: 22, halign: 'right' },
//     },
//   });

//   // @ts-ignore
//   yPos = doc.lastAutoTable.finalY + 5;

//   // ═══════════════════════════════════════════════════
//   // AMOUNT IN WORDS
//   // ═══════════════════════════════════════════════════
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);

//   doc.text('Amount in Words:', margin, yPos);
//   doc.setFont('helvetica', 'bold');
//   const words = numberToWords(data.totalAmount);
//   const wordLines = doc.splitTextToSize(words, contentWidth - 35);
//   doc.text(wordLines, margin + 32, yPos);
//   yPos += wordLines.length * 4 + 2;

//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Whether tax is payable under reverse charge - No', margin, yPos);
//   yPos += 6;

//   // ═══════════════════════════════════════════════════
//   // QR + SIGNATURE
//   // ═══════════════════════════════════════════════════
//   const bottomY = yPos;
//   const qrSize = 25;

//   if (qrBase64) {
//     try {
//       doc.setDrawColor(0, 0, 0);
//       doc.setLineWidth(0.3);
//       doc.rect(margin, bottomY, qrSize + 4, qrSize + 8);

//       doc.addImage(qrBase64, 'PNG', margin + 2, bottomY + 2, qrSize, qrSize, undefined, 'FAST');

//       doc.setFontSize(6.5);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(0, 0, 0);
//       doc.text('QR Code for selfysnap.com', margin + 2, bottomY + qrSize + 4);
//       doc.text('visit selfysnap.com', margin + 2, bottomY + qrSize + 7);
//     } catch {}
//   }

//   // Signature right
//   const sigX = pageWidth - margin - 60;

//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);
//   doc.text(`For ${sellerName}:`, sigX, bottomY + 5);

//   doc.setDrawColor(0, 0, 0);
//   doc.setLineWidth(0.3);
//   doc.line(sigX, bottomY + 22, sigX + 55, bottomY + 22);

//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Authorized Signatory', sigX + 8, bottomY + 27);

//   yPos = bottomY + 38;

//   // ═══════════════════════════════════════════════════
//   // FOOTER
//   // ═══════════════════════════════════════════════════
//   doc.setDrawColor(0, 0, 0);
//   doc.setLineWidth(0.4);
//   doc.line(margin, yPos, pageWidth - margin, yPos);
//   yPos += 5;

//   doc.setFontSize(8);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0, 0, 0);
//   doc.text(
//     `SUPPORT: ${SUPPORT_PHONE} | ${SUPPORT_EMAIL}`,
//     pageWidth / 2,
//     yPos,
//     { align: 'center' }
//   );

//   yPos += 4;

//   doc.setFontSize(7);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(120, 120, 120);
//   doc.text(
//     'This is a computer generated invoice. No signature required.',
//     pageWidth / 2,
//     yPos,
//     { align: 'center' }
//   );

//   doc.save(`Selfysnap-Invoice-${data.orderId.slice(-8)}.pdf`);
// };
























import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

const SUPPORT_PHONE = '+91 99922 88843';
const SUPPORT_EMAIL = 'support@selfysnap.com';
const WEBSITE_URL = 'https://www.selfysnap.com';

const LOGO_PATH = '/logo34.png';
const LOGO_FORMAT = 'PNG';

interface InvoiceData {
  orderId: string;
  invoiceNumber?: string;
  orderDate: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  awbNumber?: string;

  customer: {
    name: string;
    mobile: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };

  delivery?: {
    name: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };

  seller: {
    name: string;
    mobile?: string;
    email?: string;
    businessEmail?: string;
    businessAddress?: string;
    address?: string;
    locality?: string;
    GSTIN?: string;
    gstin?: string;
    state?: string;
    city?: string;
    pinCode?: string;
  };

  items: Array<{
    title: string;
    size?: string;
    quantity: number;
    price: number;
    total: number;
    taxRate?: number;
    hsnCode?: string;
  }>;

  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
}

/* ═══════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════ */
const getFirst = (...values: (string | undefined | null)[]): string => {
  for (const val of values) {
    if (val && String(val).trim() !== '' && String(val) !== '-') {
      return String(val).trim();
    }
  }
  return '';
};

const buildAddress = (parts: string[]): string => {
  const cleaned = parts.map((p) => (p || '').trim()).filter((p) => p.length > 0);
  const unique: string[] = [];
  cleaned.forEach((p) => {
    if (!unique.some((u) => u.toLowerCase() === p.toLowerCase())) {
      unique.push(p);
    }
  });
  return unique.join(', ');
};

const loadLogo = (): Promise<string | null> => {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = LOGO_PATH;
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png', 0.95));
          } else resolve(null);
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
};

const generateQRCode = async (url: string): Promise<string | null> => {
  try {
    return await QRCode.toDataURL(url, {
      width: 300,
      margin: 1,
      color: { dark: '#000000', light: '#FFFFFF' },
      errorCorrectionLevel: 'H',
    });
  } catch {
    return null;
  }
};

const numberToWords = (num: number): string => {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const numToWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
    return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
  };

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  let words = numToWords(rupees) + ' Rupees';
  if (paise > 0) words += ' and ' + numToWords(paise) + ' Paise';
  return words + ' Only';
};

export const generateInvoice = async (data: InvoiceData) => {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });

  const [logoBase64, qrBase64] = await Promise.all([
    loadLogo(),
    generateQRCode(WEBSITE_URL),
  ]);

  /* ═══ DYNAMIC VALUES ═══ */
  const sellerName = getFirst(data.seller.name) || 'Seller';
  const sellerGSTIN =
    getFirst(data.seller.GSTIN, data.seller.gstin) || 'Not Registered';

  const sellerAddress = buildAddress([
    getFirst(data.seller.address, data.seller.businessAddress),
    getFirst(data.seller.locality),
    getFirst(data.seller.city),
    getFirst(data.seller.state),
    getFirst(data.seller.pinCode),
  ]);

  const sellerAddressFinal = sellerAddress || 'Address not available';

  const deliveryData = data.delivery || {
    name: data.customer.name,
    mobile: data.customer.mobile,
    address: data.customer.address,
    city: data.customer.city,
    state: data.customer.state,
    pinCode: data.customer.pinCode,
  };

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;

  let yPos = margin + 5;

  /* HEADER */
  const logoW = 22;
  const logoH = 14;

  if (logoBase64) {
    try {
      doc.addImage(logoBase64, LOGO_FORMAT, margin, yPos, logoW, logoH, undefined, 'FAST');
    } catch {}
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Selfysnap', margin + logoW + 4, yPos + 7);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('WWW.SELFYSNAP.COM', margin + logoW + 4, yPos + 12);

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('TAX INVOICE', pageWidth - margin, yPos + 6, { align: 'right' });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Tax Invoice/Bill of Supply/Cash Memo', pageWidth - margin, yPos + 11, { align: 'right' });

  doc.setFont('helvetica', 'bolditalic');
  doc.text('(Triplicate for Supplier)', pageWidth - margin, yPos + 15, { align: 'right' });

  yPos += logoH + 3;

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 5;

  /* SOLD BY */
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Sold By:', margin, yPos);
  yPos += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(sellerName, margin, yPos);
  yPos += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  const sellerAddrLines = doc.splitTextToSize(sellerAddressFinal, contentWidth);
  doc.text(sellerAddrLines, margin, yPos);
  yPos += sellerAddrLines.length * 3.8 + 2;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`GST Registration No: ${sellerGSTIN}`, margin, yPos);
  yPos += 6;

  /* ❌ EMAIL LINE HATA DI */

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 5;

  /* BILLING + SHIPPING */
  const halfW = contentWidth / 2;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Billing Address:', margin, yPos);
  doc.text('Shipping Address:', margin + halfW + 5, yPos);
  yPos += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(data.customer.name || '-', margin, yPos);
  doc.text(deliveryData.name || '-', margin + halfW + 5, yPos);
  yPos += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);

  const billAddr = buildAddress([
    data.customer.address,
    data.customer.city,
    data.customer.state
      ? `${data.customer.state} - ${data.customer.pinCode || ''}`
      : data.customer.pinCode || '',
  ]);
  const billLines = doc.splitTextToSize(billAddr || '-', halfW - 5);
  doc.text(billLines, margin, yPos);

  const delAddr = buildAddress([
    deliveryData.address,
    deliveryData.city,
    deliveryData.state
      ? `${deliveryData.state} - ${deliveryData.pinCode || ''}`
      : deliveryData.pinCode || '',
  ]);
  const delLines = doc.splitTextToSize(delAddr || '-', halfW - 5);
  doc.text(delLines, margin + halfW + 5, yPos);

  const maxAddrLines = Math.max(billLines.length, delLines.length);
  yPos += maxAddrLines * 3.8 + 3;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Mobile: ${data.customer.mobile || '-'}`, margin, yPos);
  doc.text(`Mobile: ${deliveryData.mobile || '-'}`, margin + halfW + 5, yPos);
  yPos += 6;

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 5;

  /* INVOICE META */
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');

  const rowMeta = (label1: string, val1: string, label2: string, val2: string) => {
    doc.setTextColor(70, 70, 70);
    doc.text(label1, margin, yPos);
    doc.setTextColor(0, 0, 0);
    doc.text(val1, margin + 32, yPos);

    doc.setTextColor(70, 70, 70);
    doc.text(label2, margin + halfW + 5, yPos);
    doc.setTextColor(0, 0, 0);
    doc.text(val2, margin + halfW + 42, yPos);
    yPos += 5;
  };

  rowMeta('Place of supply:', data.customer.state || '-', 'Invoice Number:', data.invoiceNumber || `INV-${data.orderId.slice(-6)}`);
  rowMeta('Place of delivery:', deliveryData.state || '-', 'Invoice Date:', data.orderDate);
  rowMeta('Payment Method:', data.paymentMethod || '-', 'AWB Number:', data.awbNumber || '-');
  rowMeta('Payment Status:', data.paymentStatus || '-', 'Order Date:', data.orderDate);
  rowMeta('Order Status:', data.orderStatus || '-', 'Order Number:', data.orderId.slice(-15));

  yPos += 2;

  /* PRODUCT TABLE */
  const isInterState = data.seller.state !== data.customer.state;

  const tableBody = data.items.map((item, idx) => {
    const taxRate = item.taxRate ?? 18;
    const totalIncTax = item.total;
    const netAmount = +(totalIncTax / (1 + taxRate / 100)).toFixed(2);
    const taxAmount = +(totalIncTax - netAmount).toFixed(2);
    const unitPrice = +(netAmount / item.quantity).toFixed(2);

    return [
      idx + 1,
      item.title,
      `Rs. ${unitPrice.toFixed(2)}`,
      item.quantity,
      `Rs. ${netAmount.toFixed(2)}`,
      `${taxRate}%`,
      isInterState ? 'IGST' : 'CGST+SGST',
      `Rs. ${taxAmount.toFixed(2)}`,
      `Rs. ${totalIncTax.toFixed(2)}`,
    ];
  });

  autoTable(doc, {
    startY: yPos,
    margin: { left: margin, right: margin },
    head: [['Sl. No', 'Description', 'Unit Price (Net)', 'Qty', 'Net Amount', 'Tax Rate', 'Tax Type', 'Tax Amount', 'Total Amount']],
    body: tableBody,
    foot: [[
      { content: 'Grand Total (inclusive of tax)', colSpan: 8, styles: { halign: 'right', fontStyle: 'bold' } },
      { content: `Rs. ${data.totalAmount.toFixed(2)}`, styles: { halign: 'right', fontStyle: 'bold' } },
    ]],
    theme: 'grid',
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'center',
      cellPadding: 2.5,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      cellPadding: 2.5,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
      valign: 'top',
    },
    footStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontSize: 9,
      fontStyle: 'bold',
      cellPadding: 3,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { cellWidth: 50 },
      2: { cellWidth: 20, halign: 'right' },
      3: { cellWidth: 10, halign: 'center' },
      4: { cellWidth: 20, halign: 'right' },
      5: { cellWidth: 15, halign: 'center' },
      6: { cellWidth: 18, halign: 'center' },
      7: { cellWidth: 18, halign: 'right' },
      8: { cellWidth: 22, halign: 'right' },
    },
  });

  // @ts-ignore
  yPos = doc.lastAutoTable.finalY + 5;

  /* AMOUNT IN WORDS */
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);

  doc.text('Amount in Words:', margin, yPos);
  doc.setFont('helvetica', 'bold');
  const words = numberToWords(data.totalAmount);
  const wordLines = doc.splitTextToSize(words, contentWidth - 35);
  doc.text(wordLines, margin + 32, yPos);
  yPos += wordLines.length * 4 + 2;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Whether tax is payable under reverse charge - No', margin, yPos);
  yPos += 6;

  /* ✅ 5 DAYS RETURN POLICY */
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(
    'Return Policy: 5 days return available from the date of delivery.',
    margin,
    yPos
  );
  yPos += 6;

  /* QR + SIGNATURE */
  const bottomY = yPos;
  const qrSize = 25;

  if (qrBase64) {
    try {
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.3);
      doc.rect(margin, bottomY, qrSize + 4, qrSize + 8);

      doc.addImage(qrBase64, 'PNG', margin + 2, bottomY + 2, qrSize, qrSize, undefined, 'FAST');

      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('QR Code for selfysnap.com', margin + 2, bottomY + qrSize + 4);
      doc.text('visit selfysnap.com', margin + 2, bottomY + qrSize + 7);
    } catch {}
  }

  const sigX = pageWidth - margin - 60;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`For ${sellerName}:`, sigX, bottomY + 5);

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3);
  doc.line(sigX, bottomY + 22, sigX + 55, bottomY + 22);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Authorized Signatory', sigX + 8, bottomY + 27);

  yPos = bottomY + 38;

  /* FOOTER */
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`SUPPORT: ${SUPPORT_PHONE} | ${SUPPORT_EMAIL}`, pageWidth / 2, yPos, { align: 'center' });

  yPos += 4;

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(120, 120, 120);
  doc.text('This is a computer generated invoice. No signature required.', pageWidth / 2, yPos, { align: 'center' });

  doc.save(`Selfysnap-Invoice-${data.orderId.slice(-8)}.pdf`);
};