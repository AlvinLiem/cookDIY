const midtransClient = require("midtrans-client");
const { Order } = require(`../models/index`);

class PaymentController {
  static async getMidtransToken(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        throw { name: "Data not Found" };
      }

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: order.orderId,
          gross_amount: 100000,
        },
      };

      const response = await snap.createTransaction(parameter);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getMidtransNotifications(req, res, next) {
    const statusResponse = req.body;
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
    );

    // Sample transactionStatus handling logic
    const order = await Order.findOne({
      where: { orderId },
    });

    async function successProcess() {
      await order.update({ status: "Paid" });
    }

    if (transactionStatus == "capture") {
      if (fraudStatus == "accept") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        await successProcess();
      }
    } else if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      await successProcess();
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      await order.update({ status: "Fail" });
    }

    res.sendStatus(200);
  }
}

module.exports = PaymentController;
