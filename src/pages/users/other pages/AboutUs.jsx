import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  return (
    <>
      <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 className="text-gray-400 dark:text-gray-300 text-base font-normal leading-relaxed">
                    {isEnglish ? "About Us" : "معلومات عنا"}
                  </h6>
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-brand-700 dark:text-brand-400 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                      {isEnglish ? "Our Journey in Car Rental Services" : "رحلتنا في خدمات تأجير السيارات"}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed lg:text-start text-center">
                      {isEnglish ? "Our story is one of dedication to providing top-notch car rental services. We have navigated through challenges, celebrated milestones, and continuously strive for excellence." : "قصتنا هي قصة التفاني في تقديم خدمات تأجير السيارات من الدرجة الأولى. لقد اجتزنا التحديات، واحتفلنا بالإنجازات، ونسعى باستمرار لتحقيق التميز."}
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-6 flex">
                  <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 dark:text-gray-100 text-2xl font-bold font-manrope leading-9">
                        {isEnglish ? "10+ Years" : "أكثر من 10 سنوات"}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                        {isEnglish ? "Providing Reliable Car Rental Services" : "تقديم خدمات تأجير سيارات موثوقة"}
                      </p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 dark:text-gray-100 text-2xl font-bold font-manrope leading-9">
                        {isEnglish ? "500+ Cars" : "أكثر من 500 سيارة"}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                        {isEnglish ? "A Wide Range of Vehicles to Choose From" : "مجموعة واسعة من المركبات للاختيار من بينها"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 dark:text-gray-100 text-2xl font-bold font-manrope leading-9">
                        {isEnglish ? "50+ Locations" : "أكثر من 50 موقعًا"}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                        {isEnglish ? "Convenient Pickup and Drop-off Points" : "نقاط استلام وتسليم مريحة"}
                      </p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 dark:text-gray-100 text-2xl font-bold font-manrope leading-9">
                        {isEnglish ? "95% Happy Clients" : "95% من العملاء السعداء"}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                        {isEnglish ? "Committed to Customer Satisfaction" : "ملتزمون برضا العملاء"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Link dir="ltr" to="/cars" className="sm:w-fit w-full group px-3.5 py-2 bg-brand-50 dark:bg-brand-900 hover:bg-brand-100 dark:hover:bg-brand-800 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                <span className="px-1.5 text-brand-600 dark:text-brand-300 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                  {isEnglish ? "Explore Cars" : "استكشاف السيارات"}
                </span>
                <svg className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 dark:sm:bg-gray-800 rounded-3xl sm:border border-gray-200 dark:border-gray-600 relative">
                <img className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover" src="https://pagedone.io/asset/uploads/1717742431.png" alt="about Us image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
