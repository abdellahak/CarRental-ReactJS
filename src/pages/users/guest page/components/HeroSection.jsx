import { useSelector } from "react-redux";
export default function HeroSection() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  return (
    <>
      <div className="relative isolate overflow-hidden bg-brand-300 dark:bg-gray-900" id="hero">
        <img
          src="/images/hero/heroGif.gif"
          alt={isEnglish ? "discover your car" : "اكتشف سيارتك"}
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] object-cover"
        />
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-900 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-white"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width="200"
              height="200"
              x="100%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none"></path>
            </pattern>
          </defs>
          <svg
            x="50%"
            y="-1"
            className="overflow-visible fill-gray-800/20 dark:fill-white/20"
          >
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth="0"
            ></path>
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
          ></rect>
        </svg>
        <div
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          ></div>
        </div>
        <div className="mt-[64px] flex h-screen items-center justify-center">
          <div className="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
            <h1 className="mt-10 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {isEnglish ? "Discover" : "اكتشف"}
              <span className="text-brand-500"> {isEnglish ? "Your Next Car" : "سيارتك التالية"}</span> {isEnglish ? "with" : "مع"}
              <span className="text-brand-500"> Mingo Cars</span>
            </h1>
            <p className="mt-6 text-lg leading-8 font-bold text-gray-900 dark:text-gray-300">
              {isEnglish
                ? "Whether you're planning a weekend getaway, a business trip, or need a reliable vehicle for daily use, Mingo Cars offers a wide range of cars to suit your needs. Enjoy competitive rates, flexible rental options, and exceptional customer service. Book your car today and experience the freedom of the open road with Mingo Cars."
                : "سواء كنت تخطط لقضاء عطلة نهاية الأسبوع، أو رحلة عمل، أو تحتاج إلى سيارة موثوقة للاستخدام اليومي، تقدم Mingo Cars مجموعة واسعة من السيارات لتلبية احتياجاتك. استمتع بأسعار تنافسية، وخيارات تأجير مرنة، وخدمة عملاء استثنائية. احجز سيارتك اليوم واستمتع بحرية الطريق المفتوح مع Mingo Cars."}
            </p>
            <div className="mt-5 flex items-center justify-center gap-x-6">
              <a
                href="#search-car"
                className="rounded-md px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-400 cursor-pointer bg-brand-600 hover:bg-brand-700"
              >
                {isEnglish ? "Book your car →" : "← احجز سيارتك"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
