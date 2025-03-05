export default function ReceiptCard(receipt) {
  return (
    <div className="max-w-lg   mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-t-4 border-blue-600">
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 text-center">Payment Receipt</h2>

        <div className="mt-4 text-gray-600 text-xs  md:text-sm ">
          <p className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span className="text-gray-800">{receipt.name}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Payment ID:</span>
            <span className="text-gray-800">{receipt.paymentId}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">User ID:</span>
            <span className="text-gray-800">{receipt.userId}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Transaction ID:</span>
            <span className="text-gray-800">{receipt._id}</span>
          </p>
          <p className="flex justify-between text-lg font-semibold text-green-600 mt-3">
            <span>Total Amount:</span>
            <span>{(receipt.amount).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
