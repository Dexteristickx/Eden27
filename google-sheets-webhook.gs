/**
 * ============================================================================
 * EDEN27 WEDDING — GOOGLE SHEETS LIVE DATABASE HOOK & AUTO-EMAIL SENDER
 * ============================================================================
 * HOW TO ACTIVATE IN 60 SECONDS:
 * 1. Create a new Google Sheet (e.g. "EDEN27 Wedding Reception Guests").
 * 2. In your Google Sheet, click Extensions -> Apps Script.
 * 3. Delete any code in the editor and paste this entire file.
 * 4. Click "Deploy" (top right) -> "New deployment".
 *    - Select type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy" and authorize permissions when prompted.
 * 5. Copy the generated "Web app URL" (https://script.google.com/macros/s/.../exec)
 *    and set it as GOOGLE_SHEET_WEBHOOK_URL in your website's .env.local file!
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 1. Initialize Header Row if the sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Seat Number",
        "Seats Reserved",
        "Full Name",
        "Phone Number",
        "Email Address",
        "Guest Tier",
        "Events Attending",
        "Plus-Ones Count",
        "Plus-Ones Names",
        "Dietary / Wishes",
        "VIP Code Used",
        "Check-In Status",
        "Registered At",
        "Guest ID"
      ]);
      sheet.getRange(1, 1, 1, 14).setFontWeight("bold").setBackground("#f9f6f0");
      sheet.setFrozenRows(1);
    }

    // 2. Handle Door Check-In Update
    if (data.action === "checkin") {
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][13] === data.id || rows[i][0] === data.seatNumber) {
          sheet.getRange(i + 1, 12).setValue("CHECKED IN (" + (data.checkedInAt || new Date().toISOString()) + ")");
          sheet.getRange(i + 1, 1, 1, 14).setBackground("#e6f4ea");
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: true, action: "checkin" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Append New Guest Registration Row
    sheet.appendRow([
      data.seatNumber || "",
      data.seatCount || 1,
      data.fullName || "",
      data.phone || "",
      data.email || "",
      data.guestType || "GENERAL",
      data.eventsAttending || "",
      data.plusOnesCount || 0,
      data.plusOnesNames || "",
      data.dietaryNote || "",
      data.vipCodeUsed || "",
      "PENDING",
      data.registeredAt || new Date().toISOString(),
      data.id || ""
    ]);

    // 4. Automatically Email the Guest Their Allocated Reception Seat Number & QR Code
    if (data.email && data.email.indexOf("@") !== -1) {
      sendGuestSeatEmail(data);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, seatNumber: data.seatNumber }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function sendGuestSeatEmail(data) {
  var subject = "Your Reception Seat Pass (" + data.seatNumber + ") — Oluwadunsin & Ololade (#EDEN27)";
  var inlineImages = {};
  var qrHtml = "";

  if (data.qrCodeDataUrl && data.qrCodeDataUrl.indexOf("base64,") !== -1) {
    var base64Data = data.qrCodeDataUrl.split("base64,")[1];
    var qrBlob = Utilities.newBlob(Utilities.base64Decode(base64Data), "image/png", "EDEN27-Ticket-QR.png");
    inlineImages["qrCodeImg"] = qrBlob;
    qrHtml = '<div style="margin:24px 0;"><img src="cid:qrCodeImg" width="180" height="180" alt="Reception QR Pass" style="border:1px solid #eaddcf;border-radius:12px;padding:10px;background:#fff;" /></div>';
  }

  var htmlBody =
    '<div style="font-family:Georgia,serif;background-color:#f9f6f0;padding:36px 16px;color:#2c241b;">' +
      '<div style="max-width:540px;margin:0 auto;background:#ffffff;border:2px solid #c48b71;border-radius:20px;padding:36px 28px;text-align:center;">' +
        '<p style="font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c48b71;margin:0 0 8px;">EDEN27 WEDDING CELEBRATION</p>' +
        '<h1 style="font-size:30px;margin:0 0 6px;color:#2c241b;font-weight:normal;">Oluwadunsin &amp; Ololade</h1>' +
        '<p style="font-size:14px;color:#6e5f53;margin:0 0 24px;">December 30–31, 2026 &middot; Ibadan, Oyo State</p>' +
        '<hr style="border:none;border-top:1px solid #eaddcf;margin:20px 0;" />' +
        '<p style="font-size:16px;line-height:1.6;color:#2c241b;">Dear <strong>' + data.fullName + '</strong>,</p>' +
        '<p style="font-size:15px;line-height:1.6;color:#55483d;">Thank you for registering to celebrate with us in Ibadan! Below is your official allocated seat pass for the Wedding Reception:</p>' +
        '<div style="background:#f9f6f0;border:1px solid #c48b71;border-radius:16px;padding:24px;margin:24px 0;">' +
          '<p style="font-family:sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8c7a6b;margin:0 0 8px;">ALLOCATED RECEPTION SEAT NUMBER</p>' +
          '<p style="font-size:44px;font-weight:bold;color:#c48b71;margin:0;">' + data.seatNumber + '</p>' +
          '<p style="font-family:sans-serif;font-size:12px;color:#6e5f53;margin:10px 0 0;">' + (data.seatCount || 1) + ' Seat(s) Reserved &middot; Tier: ' + (data.guestType || "GENERAL") + '</p>' +
        '</div>' +
        qrHtml +
        '<p style="font-size:13px;color:#6e5f53;margin-top:16px;">Please present this email or your QR code at the reception entrance in Ibadan for smooth check-in.</p>' +
        '<p style="margin-top:24px;"><a href="https://eden27.com/schedule" style="display:inline-block;background:#c48b71;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:99px;font-family:sans-serif;font-size:13px;">View Wedding Schedule &amp; Venue Details</a></p>' +
      '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody,
    inlineImages: inlineImages,
    name: "Oluwadunsin & Ololade (EDEN27)"
  });
}
