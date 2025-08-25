import QRCode from  "qrcode";

// Function to generate QR code data URL
export const generateUPIQRCode = async (upiId, amount, name = "Merchant") => {
  // UPI URL format
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${amount}&cu=INR`;

  try {
    // Convert URL to QR code (base64 data URI)
    const qrDataUrl = await QRCode.toDataURL(upiUrl, { width: 300 });
    return qrDataUrl;
  } catch (err) {
    console.error("QR Code generation failed", err);
    return null;
  }
};
