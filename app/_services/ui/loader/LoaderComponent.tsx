export default function LoaderComponent() {
  return (
    <div className="pulsating-circle my-auto bg-gradient-to-tr from-green to-cream text-white w-full min-h-[100vh] flex flex-col gap-5 items-center justify-center">
      <div className="w-[100px] h-[100px] rounded-full bg-black shadow-none animate-pulse"></div>
      <span className="text-white text-2xl italic">Loading...</span>
    </div>
  )
}