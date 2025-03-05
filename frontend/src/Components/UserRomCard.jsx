import { Bed, DollarSign } from "lucide-react";

const UserRoomCard = ({ _id, thumbnail, price, bedType, seatAvailable, makePayment }) => {
  return (
    <div className="w-64 md:w-80 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <img src={thumbnail} alt="Room" className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">{bedType} Bed</h3>

        <div className=" mt-2 text-sm font-semibold space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign size={18} />
            <span className="font-medium text-gray-700">₹{price}/Year</span>
          </div>

          <div className="flex items-center gap-3  ">
            <Bed size={18} />
            <span className="font-medium text-green-600">{seatAvailable} Seats Left</span>
          </div>
        </div>

        <button onClick={() => makePayment(_id)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default UserRoomCard
