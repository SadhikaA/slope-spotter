import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md bg-white p-6 flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#004aae] mb-2">
          Slope Spotter
        </h1>
        <p className="text-blue-800 italic text-base mb-8">
          finding a path, slope by slope
        </p>

        {/* Input Section */}
        <div className="w-full space-y-4 mb-8">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004aae] text-base"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004aae] text-base"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/main")}
          className="bg-[#004aae] text-white text-lg font-semibold px-6 py-3 rounded-xl w-full hover:bg-[#00367a] transition shadow"
        >
          Navigate
        </button>
      </div>
    </div>
  );
}

export default Home;
