import Link from "next/link";

const page = () => {

  return (
    <div className="bg-gradient-to-tr from-green to-cream text-white min-h-screen bg-gradie flex items-center justify-center">
      <div className="w-[25%] sm:w-[25%] h-[45%] py-10 rounded shadow-2xl px-9 bg-gradient-to-t from-cream to-green">

        {/* success message  */}
        <p className="text-sm font-extrabold text-lime-100 mb-4 flex justify-center">Message sent successfully 🎉 </p>

        <h1 className="text-4xl font-extrabold font-sans items-center mb-10">
          😅 Say Something...
        </h1>

        <Link href='/'> Home</Link>
      </div>
    </div>
  );
};

export default page;
