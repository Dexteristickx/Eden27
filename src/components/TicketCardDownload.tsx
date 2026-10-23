"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface TicketCardDownloadProps {
  fullName: string;
  seatNumber: string;
  seatCount?: number;
  guestType: "general" | "vip";
  qrCodeDataUrl: string;
}

export default function TicketCardDownload({
  fullName,
  seatNumber,
  seatCount = 1,
  guestType,
  qrCodeDataUrl,
}: TicketCardDownloadProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadCard = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1560;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Warm Champagne Background
      ctx.fillStyle = "#f9f6f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Outer & Inner Editorial Borders
      ctx.strokeStyle = "#c48b71";
      ctx.lineWidth = 4;
      ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);

      ctx.strokeStyle = "rgba(44, 36, 27, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(68, 68, canvas.width - 136, canvas.height - 136);

      // 3. Top Monogram & Header
      ctx.fillStyle = "#c48b71";
      ctx.font = "600 26px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("OFFICIAL WEDDING RECEPTION PASS", canvas.width / 2, 155);

      ctx.fillStyle = "#2c241b";
      ctx.font = "bold 76px Georgia, serif";
      ctx.fillText("EDEN27", canvas.width / 2, 250);

      ctx.fillStyle = "#c48b71";
      ctx.font = "italic 40px Georgia, serif";
      ctx.fillText("Oluwadunsin & Ololade", canvas.width / 2, 315);

      // Divider line
      ctx.strokeStyle = "#c48b71";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(280, 360);
      ctx.lineTo(canvas.width - 280, 360);
      ctx.stroke();

      // 4. Guest Details Box
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(120, 405, canvas.width - 240, 440);
      ctx.strokeStyle = "rgba(196, 139, 113, 0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(120, 405, canvas.width - 240, 440);

      ctx.fillStyle = "#8c7a6b";
      ctx.font = "600 22px sans-serif";
      ctx.fillText("HONOURED GUEST", canvas.width / 2, 465);

      ctx.fillStyle = "#2c241b";
      ctx.font = "bold 46px Georgia, serif";
      ctx.fillText(fullName.slice(0, 32), canvas.width / 2, 525);

      // Seat Number Label
      ctx.fillStyle = "#8c7a6b";
      ctx.font = "600 22px sans-serif";
      ctx.fillText("ALLOCATED RECEPTION SEAT", canvas.width / 2, 605);

      ctx.fillStyle = "#c48b71";
      ctx.font = "bold 84px Georgia, serif";
      ctx.fillText(seatNumber, canvas.width / 2, 695);

      // Tier & Party Size Pill
      const tierLabel =
        guestType === "vip"
          ? `VIP ACCESS · ${seatCount} SEAT(S) RESERVED`
          : `GENERAL RECEPTION · ${seatCount} SEAT(S) RESERVED`;
      ctx.fillStyle = "#2c241b";
      ctx.font = "600 23px sans-serif";
      ctx.fillText(tierLabel, canvas.width / 2, 785);

      // 5. Draw QR Code
      const qrImg = new window.Image();
      qrImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        qrImg.onload = () => resolve();
        qrImg.onerror = () => reject(new Error("Failed to load QR image"));
        qrImg.src = qrCodeDataUrl;
      });

      const qrSize = 360;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = 890;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
      ctx.strokeStyle = "rgba(44, 36, 27, 0.15)";
      ctx.strokeRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      // 6. Footer Date & Location
      ctx.fillStyle = "#2c241b";
      ctx.font = "bold 30px Georgia, serif";
      ctx.fillText(
        "December 30 – 31, 2026 · Ibadan, Oyo State",
        canvas.width / 2,
        1365
      );

      ctx.fillStyle = "#6e5f53";
      ctx.font = "24px sans-serif";
      ctx.fillText(
        "Please present this pass at the reception entrance for seat check-in.",
        canvas.width / 2,
        1420
      );

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `EDEN27-Reception-Pass-${seatNumber.replace(/\s+/g, "")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to generate ticket card:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownloadCard}
      disabled={isGenerating}
      className="inline-flex items-center justify-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-lg cursor-pointer disabled:opacity-50"
    >
      <Download className="w-4 h-4" />
      <span>
        {isGenerating
          ? "Designing Your Pass..."
          : "Download Official Reception E-Ticket Card"}
      </span>
    </button>
  );
}
