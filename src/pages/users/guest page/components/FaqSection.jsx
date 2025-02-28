import { useState } from "react";
import { useSelector } from "react-redux";

export default function FaqSection() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="images/faq/computerUser.jpg"
              alt={isEnglish ? "FAQ tailwind section" : "قسم الأسئلة الشائعة"}
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-brand-600 mb-2 lg:text-left dark:text-brand-400">
                  {isEnglish ? "FAQs" : "الأسئلة الشائعة"}
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left dark:text-gray-100">
                  {isEnglish ? "Looking for answers?" : "تبحث عن إجابات؟"}
                </h2>
              </div>
              <div
                className="accordion-group"
                data-accordion="default-accordion"
              >
                {[
                  {
                    question: isEnglish ? "How to book a car?" : "كيف تحجز سيارة؟",
                    answer: isEnglish
                      ? "To book a car, browse our available vehicles, select your preferred car, choose your rental dates, and complete the booking form with your details. Confirm your booking and make the payment to finalize the reservation."
                      : "لحجز سيارة، تصفح المركبات المتاحة لدينا، اختر سيارتك المفضلة، حدد تواريخ الإيجار، وأكمل نموذج الحجز بتفاصيلك. أكد حجزك وقم بالدفع لإتمام الحجز.",
                  },
                  {
                    question: isEnglish
                      ? "What is the cancellation policy?"
                      : "ما هي سياسة الإلغاء؟",
                    answer: isEnglish
                      ? "You can cancel your booking up to 24 hours before the rental period starts for a full refund. Cancellations made within 24 hours of the rental period will incur a cancellation fee."
                      : "يمكنك إلغاء حجزك حتى 24 ساعة قبل بدء فترة الإيجار لاسترداد كامل المبلغ. الإلغاءات التي تتم خلال 24 ساعة من فترة الإيجار ستتحمل رسوم إلغاء.",
                  },
                  {
                    question: isEnglish
                      ? "What documents are required to rent a car?"
                      : "ما هي المستندات المطلوبة لاستئجار سيارة؟",
                    answer: isEnglish
                      ? "You will need a valid driver's license, a credit card in your name, and proof of insurance. International renters may need to provide a passport and an international driving permit."
                      : "ستحتاج إلى رخصة قيادة سارية، بطاقة ائتمان باسمك، وإثبات تأمين. قد يحتاج المستأجرون الدوليون إلى تقديم جواز سفر وتصريح قيادة دولي.",
                  },
                  {
                    question: isEnglish ? "What is the fuel policy?" : "ما هي سياسة الوقود؟",
                    answer: isEnglish
                      ? "Our cars are provided with a full tank of fuel. Please return the car with a full tank to avoid additional refueling charges. If you are unable to refuel, we will charge you for the missing fuel at a higher rate."
                      : "تُقدم سياراتنا بخزان وقود ممتلئ. يرجى إعادة السيارة بخزان ممتلئ لتجنب رسوم إعادة التزود بالوقود الإضافية. إذا لم تتمكن من إعادة التزود بالوقود، سنقوم بفرض رسوم على الوقود المفقود بسعر أعلى.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`accordion py-8 border-b border-solid border-gray-200 dark:border-gray-700 ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-brand-600 accordion-active:text-brand-600 accordion-active:font-medium dark:text-gray-300 dark:hover:text-brand-400"
                      onClick={() => toggleAccordion(index)}
                      aria-controls={`basic-collapse-${index}`}
                    >
                      <h5>{item.question}</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-brand-600 accordion-active:text-brand-600 ${
                          activeIndex === index ? "rotate-180" : ""
                        } dark:text-gray-100 dark:group-hover:text-brand-400`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id={`basic-collapse-${index}`}
                      className={`accordion-content w-full px-0 overflow-hidden pr-4 transition-max-height duration-500 ease-in-out ${
                        activeIndex === index ? "active" : ""
                      }`}
                      style={{
                        maxHeight: activeIndex === index ? "100px" : "0",
                      }}
                      aria-labelledby={`basic-heading-${index}`}
                    >
                      <p className="text-base font-normal text-gray-600 dark:text-gray-300">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
