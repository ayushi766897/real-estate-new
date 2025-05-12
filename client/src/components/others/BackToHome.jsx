import { useNavigate } from "react-router-dom";

const BackToHome = () => {
  const navigate = useNavigate();

  return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <button onClick={() => navigate("/")} className="bg-black text-center cursor-pointer w-48 rounded-2xl h-14 relative text-white text-xl font-semibold group" type="button">
      
      <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
          <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
          <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
        </svg>
      </div>
      <p className="translate-x-2">Go Home</p>
    </button>
    </div>
  );
};

export default BackToHome;
