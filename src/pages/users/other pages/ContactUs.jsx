import { Mail, Phone, MapPin, Car } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function ContactUs() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
            <div className="flex items-center lg:mb-0 mb-10">
              <div className="w-full">
                <h4 className="text-brand-600 text-base font-medium leading-6 mb-4 lg:text-start text-center">
                  {isEnglish ? "Contact Us" : "اتصل بنا"}
                </h4>
                <h2 className="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-start text-center">
                  {isEnglish ? "Reach Out To Us" : "تواصل معنا"}
                </h2>
                {/* start */}
                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  id="form"
                  className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                >
                  <input
                    type="hidden"
                    name="access_key"
                    value="a69adc5b-f6da-4f1a-a32d-df4ec603ce3a"
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value="New Submission from Mingo Cars Contact Form"
                  />
                  <input
                    type="checkbox"
                    name="botcheck"
                    id=""
                    style={{ display: "none" }}
                  />
                  <div className="px-5 py-4 sm:px-6 sm:py-5">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                      {isEnglish ? "Default Inputs" : "المدخلات الافتراضية"}
                    </h3>
                  </div>
                  <div className="p-5 space-y-6 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        {isEnglish ? "Full Name" : "الاسم الكامل"}
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder={isEnglish ? "Your name" : "اسمك"}
                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        {isEnglish ? "Email" : "البريد الإلكتروني"}
                      </label>
                      <input
                        type="email"
                        placeholder={
                          isEnglish ? "info@mail.com" : "info@mail.com"
                        }
                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        {isEnglish ? "Message" : "الرسالة"}
                      </label>
                      <textarea
                        name="message"
                        placeholder={isEnglish ? "Your message" : "رسالتك"}
                        className="dark:bg-dark-900 h-24 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="h-11 w-full rounded-lg bg-brand-600 text-white text-sm font-medium shadow-theme-xs hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                      >
                        {isEnglish ? "Send" : "إرسال"}
                      </button>
                    </div>
                  </div>
                </form>
                {/* end */}
              </div>
            </div>
            <div className="lg:max-w-xl w-full h-[600px] flex items-center justify-center  bg-cover bg-no-repeat bg-[url('https://pagedone.io/asset/uploads/1696245837.png')] ">
              <div className="">
                <div className="lg:w-96 w-auto h-auto bg-white shadow-xl lg:p-6 p-4">
                  <div
                    dir="ltr"
                    className="flex items-center mb-6 justify-center gap-4"
                  >
                    <Car className="w-14 h-14 text-brand-600 mb-2" />
                    {/* cspell:ignore Mingo */}
                    <h1 className="block text-center my-4 text-3xl font-bold">
                      Mingo Cars
                    </h1>
                  </div>
                  <div className="flex items-center mb-6">
                    <Phone className="w-6 h-6" />
                    <h5 className="text-black text-base font-normal leading-6 mx-5">
                      +212 6 80 69 61 99
                    </h5>
                  </div>
                  <div className="flex items-center mb-6">
                    <Mail className="w-6 h-6" />
                    <h5 className="text-black text-base font-normal leading-6 mx-5">
                      khoudenak@gmail.com
                    </h5>
                  </div>
                  <div className="flex items-center mb-6">
                    <MapPin className="w-6 h-6" />
                    <h5 className="text-black text-base font-normal leading-6 mx-5">
                      789 Oak Lane, Lakeside, TX 54321
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
