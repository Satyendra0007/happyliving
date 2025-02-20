import logo from "../images/logo.svg"
import user from '../images/user.webp'


export default function Card({ image, name, userId, phone, course }) {

  return (
    <div className='card flex items-center gap-4 h-64 p-4 bg-gradient-to-r from-blue-400 to-orange-300 w-[21rem] md:w-[32rem] rounded-xl shadow-2xl '>
      <div className="image  rounded-full w-[40%]">
        <img className=' w-28 mx-auto h-28 md:h-40 md:w-40  rounded-full' src={image ? image : user} alt="" />
      </div>
      <div className="desc h-full w-[60%]">
        <div className="top h-1/2 flex flex-col justify-between ">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="name text-base md:text-lg font-bold text-orange-600 mb-5 uppercase">
            {name ? name : "xxxxx xxxxx"}
          </div>
        </div>
        <div className="bottom flex flex-col text-sm  h-1/2">
          <div className="studentid">
            <div className="title text-gray-600 text-[10px] font-bold">STUDENT ID</div>
            <div className="detail font-bold text-gray-700 uppercase">{userId ? userId : "XXX-987"}</div>
          </div>
          <div className="Phone">
            <div className="title text-gray-600 text-[10px] font-bold">PHONE</div>
            <div className="detail font-bold text-gray-700">{phone ? phone : "6778XXXXXXX"}</div>
          </div>
          <div className="course">
            <div className="title text-gray-600 text-[10px] font-bold">COURSE</div>
            <div className="detail font-bold text-gray-700 uppercase">{course ? course : "XYZ"}</div>
          </div>
        </div>
      </div>

    </div>
  )
}
