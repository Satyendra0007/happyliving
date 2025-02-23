import { Bed, DollarSign} from "lucide-react";

const UserRoomCard = ({ thumbnail, price, bedType, seatAvailable }) => {
  return (
    <div className="w-64 md:w-80 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <img src={thumbnail} alt="Room" className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{bedType} Bed</h3>

        <div className=" mt-2">
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign size={18} />
            <span className="font-medium text-gray-700">₹{price}/Year</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Bed size={18} />
            <span className="font-medium">{seatAvailable} Seats Left</span>
          </div>
        </div>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default UserRoomCard
