/**
 * ============================================================================
 * EDEN27 WEDDING — LUXURY GOOGLE SHEETS DASHBOARD & AUTO-EMAIL SENDER
 * ============================================================================
 * HOW TO UPDATE:
 * 1. In your Google Sheet, click Extensions -> Apps Script.
 * 2. Replace the code with this updated file and click Save (Ctrl+S).
 * 3. Click "Deploy" -> "Manage deployments" -> Pencil Icon (Edit) ->
 *    Version: "New version" -> Click "Deploy".
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // If action is "format_reset", clear and rebuild the luxury template cleanly
    if (data.action === "format_reset") {
      sheet.clear();
      setupLuxurySheetTemplate(sheet);
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, action: "format_reset" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // 1. Ensure Luxury Banner + KPI Row + Header Row exist (Rows 1-3)
    if (sheet.getLastRow() < 3 || sheet.getRange("A3").getValue() !== "Seat Number") {
      setupLuxurySheetTemplate(sheet);
    }

    // 2. Handle Door Check-In Update
    if (data.action === "checkin") {
      var lastRow = sheet.getLastRow();
      if (lastRow >= 4) {
        var rows = sheet.getRange(4, 1, lastRow - 3, 14).getValues();
        for (var i = 0; i < rows.length; i++) {
          var rowNum = i + 4;
          if (rows[i][13] === data.id || rows[i][0] === data.seatNumber) {
            var timeStr = Utilities.formatDate(new Date(), "Africa/Lagos", "MMM d, h:mm a");
            var statusCell = sheet.getRange(rowNum, 12);
            statusCell
              .setValue("✓ CHECKED IN (" + timeStr + ")")
              .setBackground("#dcfce7")
              .setFontColor("#15803d")
              .setFontWeight("bold");
            break;
          }
        }
      }
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, action: "checkin" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Append New Guest Registration Row (starting from Row 4)
    var nextRow = Math.max(sheet.getLastRow() + 1, 4);

    // Format Phone column as plain text FIRST so "+234..." never causes #ERROR!
    sheet.getRange(nextRow, 4).setNumberFormat("@");

    var formattedDate = Utilities.formatDate(
      data.registeredAt ? new Date(data.registeredAt) : new Date(),
      "Africa/Lagos",
      "MMM d, yyyy · h:mm a"
    );

    var tier = (data.guestType || "GENERAL").toUpperCase();
    var cleanPhone = String(data.phone || "");

    var rowValues = [
      data.seatNumber || "",
      Number(data.seatCount || 1),
      data.fullName || "",
      cleanPhone,
      data.email || "",
      tier,
      data.eventsAttending || "",
      Number(data.plusOnesCount || 0),
      data.plusOnesNames || "—",
      data.dietaryNote || "—",
      data.vipCodeUsed || "—",
      "PENDING",
      formattedDate,
      data.id || ""
    ];

    sheet.getRange(nextRow, 1, 1, 14).setValues([rowValues]);
    styleGuestRow(sheet, nextRow, tier, "PENDING");

    // 4. Automatically Email the Guest Their Allocated Reception Seat Number & QR Code
    if (data.email && data.email.indexOf("@") !== -1) {
      sendGuestSeatEmail(data);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, seatNumber: data.seatNumber, row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Builds the 3-Row Luxury Header:
 * Row 1: Deep Espresso & Champagne Gold Title Banner
 * Row 2: Live Auto-Calculating KPI Bar (Seats Allocated / 300, Remaining, VIPs, Checked-In)
 * Row 3: Styled Column Headers
 */
function setupLuxurySheetTemplate(sheet) {
  sheet.clear();

  // --- ROW 1: Luxury Title Banner ---
  sheet.getRange("A1:N1").merge();
  sheet
    .getRange("A1")
    .setValue("✦  EDEN27 WEDDING RECEPTION GUEST LIST  ·  OLUWADUNSIN & OLOLADE (IBADAN, NIGERIA)  ✦")
    .setBackground("#2c241b")
    .setFontColor("#f9f6f0")
    .setFontFamily("Georgia")
    .setFontSize(14)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 46);

  // --- ROW 2: Live KPI Summary Strip ---
  sheet.getRange("A2:C2").merge();
  sheet.getRange("A2").setFormula('="🪑 RECEPTION SEATS ALLOCATED: " & SUM(B4:B) & " / 300"');

  sheet.getRange("D2:F2").merge();
  sheet.getRange("D2").setFormula('="✨ SEATS REMAINING: " & (300 - SUM(B4:B))');

  sheet.getRange("G2:I2").merge();
  sheet.getRange("G2").setFormula('="👑 VIP REGISTRATIONS: " & COUNTIF(F4:F, "VIP")');

  sheet.getRange("J2:N2").merge();
  sheet.getRange("J2").setFormula('="✅ CHECKED IN AT DOOR: " & COUNTIF(L4:L, "✓*") & " / " & COUNTA(A4:A)');

  sheet
    .getRange("A2:N2")
    .setBackground("#f4ebe1")
    .setFontColor("#2c241b")
    .setFontFamily("Arial")
    .setFontSize(10)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setBorder(true, true, true, true, true, true, "#d8c7b8", SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(2, 34);

  // --- ROW 3: Table Column Headers ---
  var headers = [
    "Seat Number",
    "Seats Reserved",
    "Full Name",
    "Phone Number",
    "Email Address",
    "Guest Tier",
    "Events Attending",
    "Plus-Ones",
    "Plus-Ones Names",
    "Dietary / Wishes",
    "VIP Code",
    "Check-In Status",
    "Registered At",
    "Guest ID"
  ];

  sheet.getRange(3, 1, 1, 14).setValues([headers]);
  sheet
    .getRange(3, 1, 1, 14)
    .setBackground("#c48b71")
    .setFontColor("#ffffff")
    .setFontFamily("Arial")
    .setFontSize(10)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setBorder(true, true, true, true, true, true, "#a87056", SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(3, 36);

  // Freeze top 3 rows
  sheet.setFrozenRows(3);

  // Set clean, spacious column widths
  var widths = [135, 115, 210, 155, 220, 115, 250, 95, 190, 240, 105, 165, 165, 220];
  for (var c = 0; c < widths.length; c++) {
    sheet.setColumnWidth(c + 1, widths[c]);
  }

  // Ensure Column D (Phone) is always Plain Text so "+234..." never shows #ERROR!
  sheet.getRange("D4:D1000").setNumberFormat("@");
}

/**
 * Styles each guest row with alternating warm ivory striping and colored status badges
 */
function styleGuestRow(sheet, rowNum, tier, status) {
  var isEven = rowNum % 2 === 0;
  var baseBg = isEven ? "#ffffff" : "#fcf9f5";

  var rowRange = sheet.getRange(rowNum, 1, 1, 14);
  rowRange
    .setBackground(baseBg)
    .setFontColor("#2c241b")
    .setFontFamily("Arial")
    .setFontSize(10)
    .setVerticalAlignment("middle")
    .setWrap(true)
    .setBorder(true, true, true, true, true, true, "#ebe3d5", SpreadsheetApp.BorderStyle.SOLID);

  sheet.setRowHeight(rowNum, 34);

  // Center align specific columns
  sheet.getRange(rowNum, 1).setHorizontalAlignment("center"); // Seat Number
  sheet.getRange(rowNum, 2).setHorizontalAlignment("center"); // Seats Reserved
  sheet.getRange(rowNum, 4).setHorizontalAlignment("center"); // Phone
  sheet.getRange(rowNum, 6).setHorizontalAlignment("center"); // Tier
  sheet.getRange(rowNum, 8).setHorizontalAlignment("center"); // Plus-Ones Count
  sheet.getRange(rowNum, 11).setHorizontalAlignment("center"); // VIP Code
  sheet.getRange(rowNum, 12).setHorizontalAlignment("center"); // Check-In Status
  sheet.getRange(rowNum, 13).setHorizontalAlignment("center"); // Registered At

  // Highlight Seat Number Pill (Col A)
  sheet
    .getRange(rowNum, 1)
    .setBackground("#f9f1ea")
    .setFontColor("#b06949")
    .setFontFamily("Georgia")
    .setFontSize(11)
    .setFontWeight("bold");

  // Full Name bold (Col C)
  sheet.getRange(rowNum, 3).setFontWeight("bold");

  // Guest Tier Badge (Col F)
  var tierCell = sheet.getRange(rowNum, 6);
  if (tier === "VIP") {
    tierCell
      .setBackground("#fef3c7")
      .setFontColor("#92400e")
      .setFontWeight("bold");
  } else {
    tierCell
      .setBackground("#f1f5f9")
      .setFontColor("#475569")
      .setFontWeight("bold");
  }

  // Check-In Status Badge (Col L)
  var statusCell = sheet.getRange(rowNum, 12);
  if (String(status).indexOf("CHECKED IN") !== -1) {
    statusCell
      .setBackground("#dcfce7")
      .setFontColor("#15803d")
      .setFontWeight("bold");
  } else {
    statusCell
      .setBackground("#fffbeb")
      .setFontColor("#b45309")
      .setFontWeight("bold");
  }

  // Mute Guest ID column (Col N)
  sheet.getRange(rowNum, 14).setFontColor("#9ca3af").setFontSize(8);
}

function sendGuestSeatEmail(data) {
  var subject =
    "Your Reception Seat Pass (" +
    data.seatNumber +
    ") — Oluwadunsin & Ololade (#EDEN27)";
  var inlineImages = {};
  var qrHtml = "";

  if (data.qrCodeDataUrl && data.qrCodeDataUrl.indexOf("base64,") !== -1) {
    var base64Data = data.qrCodeDataUrl.split("base64,")[1];
    var qrBlob = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      "image/png",
      "EDEN27-Ticket-QR.png"
    );
    inlineImages["qrCodeImg"] = qrBlob;
    qrHtml =
      '<div style="margin:24px 0;"><img src="cid:qrCodeImg" width="180" height="180" alt="Reception QR Pass" style="border:1px solid #eaddcf;border-radius:12px;padding:10px;background:#fff;" /></div>';
  }

  var htmlBody =
    '<div style="font-family:Georgia,serif;background-color:#f9f6f0;padding:36px 16px;color:#2c241b;">' +
    '<div style="max-width:540px;margin:0 auto;background:#ffffff;border:2px solid #c48b71;border-radius:20px;padding:36px 28px;text-align:center;">' +
    '<p style="font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c48b71;margin:0 0 8px;">EDEN27 WEDDING CELEBRATION</p>' +
    '<h1 style="font-size:30px;margin:0 0 6px;color:#2c241b;font-weight:normal;">Oluwadunsin &amp; Ololade</h1>' +
    '<p style="font-size:14px;color:#6e5f53;margin:0 0 24px;">December 30–31, 2026 &middot; Ibadan, Oyo State</p>' +
    '<hr style="border:none;border-top:1px solid #eaddcf;margin:20px 0;" />' +
    '<p style="font-size:16px;line-height:1.6;color:#2c241b;">Dear <strong>' +
    data.fullName +
    "</strong>,</p>" +
    '<p style="font-size:15px;line-height:1.6;color:#55483d;">Thank you for registering to celebrate with us in Ibadan! Below is your official allocated seat pass for the Wedding Reception:</p>' +
    '<div style="background:#f9f6f0;border:1px solid #c48b71;border-radius:16px;padding:24px;margin:24px 0;">' +
    '<p style="font-family:sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8c7a6b;margin:0 0 8px;">ALLOCATED RECEPTION SEAT NUMBER</p>' +
    '<p style="font-size:44px;font-weight:bold;color:#c48b71;margin:0;">' +
    data.seatNumber +
    "</p>" +
    '<p style="font-family:sans-serif;font-size:12px;color:#6e5f53;margin:10px 0 0;">' +
    (data.seatCount || 1) +
    " Seat(s) Reserved &middot; Tier: " +
    (data.guestType || "GENERAL") +
    "</p>" +
    "</div>" +
    qrHtml +
    '<p style="font-size:13px;color:#6e5f53;margin-top:16px;">Please present this email or your QR code at the reception entrance in Ibadan for smooth check-in.</p>' +
    '<p style="margin-top:24px;"><a href="https://eden27.com/schedule" style="display:inline-block;background:#c48b71;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:99px;font-family:sans-serif;font-size:13px;">View Wedding Schedule &amp; Venue Details</a></p>' +
    "</div>" +
    "</div>";

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody,
    inlineImages: inlineImages,
    name: "Oluwadunsin & Ololade (EDEN27)",
  });
}
