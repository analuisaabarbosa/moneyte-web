const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gray-900">
      {" "}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full bg-blue-500/30 blur-3xl animate-float1"
          style={{ top: "10%", left: "20%" }}
        />
        <div
          className="absolute w-80 h-80 rounded-full bg-purple-700/25 blur-3xl animate-float2"
          style={{ top: "60%", right: "15%" }}
        />
        <div
          className="absolute w-72 h-72 rounded-full bg-violet-800/20 blur-3xl animate-float3"
          style={{ top: "30%", left: "60%" }}
        />
        <div
          className="absolute w-64 h-64 rounded-full bg-sky-500/15 blur-2xl animate-float1"
          style={{ bottom: "20%", left: "10%", animationDirection: "reverse" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-transparent to-gray-900/30" />
    </div>
  );
};

export default Background;
