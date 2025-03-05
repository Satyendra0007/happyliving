const { razorpayInstance } = require("../util/payment")
const Room = require("../models/room-model")
const crypto = require("crypto")
const axios = require("axios")
const Payment = require("../models/payment-model")
const puppeteer = require("puppeteer");

module.exports.createPayment = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ _id: roomId })
    const options = {
      amount: ((room.price * 10) / 100) * 100,
      currency: 'INR'
    }
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error " })

  }
}

module.exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, amount, name } = req.body
  const userData = req.userData
  try {
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    hmac.update(order_id + '|' + payment_id);
    const generatedSignature = hmac.digest("hex");
    if (generatedSignature === signature) {
      const newPayment = await Payment.create({
        userId: userData._id,
        paymentId: payment_id,
        amount: amount / 100,
        name: userData.name
      })
      res.status(200).json({
        success: true,
        message: "Payment Verified",
        payment: newPayment
      });
    }
    else {
      res.status(400).json({ success: false, message: "Payment Unsuccessful " })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, messsage: "Internal Server Error " })
  }

}

const getPaymentDetails = async (paymentId) => {
  try {
    const authHeader = {
      Authorization: `Basic ${Buffer.from(
        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString("base64")}`,
    };
    return await axios.get(
      `https://api.razorpay.com/v1/payments/${paymentId}`,
      { headers: authHeader }
    );
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error " })
  }
}


module.exports.generateReciept = async (req, res) => {
  const { paymentId } = req.params
  const userData = req.userData
  try {
    const paymentData = await getPaymentDetails(paymentId);
    if (!paymentData) {
      return res.status(400).json({ success: false, message: "Invalid Payment ID" });
    }

    const { id: payment_id,
      amount,
      currency,
      status,
      order_id,
      method,
      description,
      vpa,
      email,
      contact,
      fee,
      tax,
      created_at,
      acquirer_data,
    } = paymentData.data

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const paymentDate = new Date(created_at * 1000).toLocaleString();

    const receiptHTML = `
      <html>
      <head>
        <style>
          body { font-family: 'Poppins', sans-serif; text-align: center; padding: 30px; background: #f0f2f5; }
          .receipt-container { max-width: 650px; margin: auto; background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-top: 6px solid #0056b3; }
          .header { background: #0056b3; color: white; padding: 15px; font-size: 18px; font-weight: bold; border-radius: 10px 10px 0 0; }
          .head { background: #0056b3; color: white; padding: 15px; font-size: 24px; font-weight: bold; border-radius: 10px 10px 0 0; }
          .logo { width: 60px; height: auto; margin-bottom: 10px; }
          .details { padding: 20px; text-align: left; font-size: 15px; line-height: 1.6; }
          .details p { margin: 10px 0; font-weight: 500; }
          .amount { font-size: 22px; font-weight: bold; color: #28a745; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          table, th, td { border: 1px solid #ddd; padding: 12px; text-align: left; border-radius: 6px; }
          th { background: #007bff; color: white; }
          .footer { margin-top: 20px; font-size: 14px; color: #555; text-align: center; }
          .highlight { color: #d4af37; font-weight: bold; } /* Gold color for premium touch */
          .qr-container { text-align: center; margin-top: 15px; }
          .qr-placeholder { width: 100px; height: 100px; background: #eee; display: inline-block; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="receipt-container">
        <div class="head">
            Happy Living
          </div>
          <div class="header">
            Payment Receipt
          </div>
          <div class="details">
            <p><strong>Payment ID:</strong> <span class="highlight">${payment_id}</span></p>
            <p><strong>Order ID:</strong> ${order_id}</p>
            <p><strong>Date:</strong> ${paymentDate}</p>
            <p><strong>Payment Method:</strong> ${method.toUpperCase()}</p>
            <p><strong>UPI ID:</strong> ${vpa}</p>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact:</strong> ${contact}</p>

            <table>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>${description}</td>
                <td class="amount">₹${(amount / 100).toLocaleString()} ${currency}</td>
              </tr>
              
              <tr>
                <td><strong>Total Paid</strong></td>
                <td class="amount">₹${((amount / 100)).toLocaleString()} ${currency}</td>
              </tr>
            </table>

            <p><strong>Transaction Reference:</strong> ${acquirer_data.rrn}</p>
            <p><strong>UPI Transaction ID:</strong> ${acquirer_data.upi_transaction_id}</p>
            <p><strong>Status:</strong> <span style="color: ${status === "captured" ? "green" : "red"}">${status.toUpperCase()}</span></p>
          </div>

          <div class="footer">
            <p>Thank you for your payment!</p>>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(receiptHTML);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=receipt_${paymentId}.pdf`);
    res.setHeader("Content-Length", pdfBuffer.length);
    // res.send(pdfBuffer);
    res.end(pdfBuffer);


  } catch (error) {
    console.error("Error generating receipt:", error);
    res.status(500).json({ success: false, message: "Failed to generate receipt" });
  }
}


const invoiceResponse = async (userData, amount) => {
  const authHeader = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
    ).toString("base64")}`,
  };
  return await axios.post(
    "https://api.razorpay.com/v1/invoices",
    {
      type: "invoice",
      customer: {
        name: userData.name,
        email: userData.email,
        contact: userData.phone,
      },
      line_items: [
        {
          name: "Happy Living",
          amount: amount,
          currency: "INR",
          quantity: 1,
        },
      ],
      description: "Invoice for Hostel Room Booking",
    },
    { headers: authHeader }
  );
}