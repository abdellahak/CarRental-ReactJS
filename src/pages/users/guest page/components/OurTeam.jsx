import { useSelector } from "react-redux";
export default function OurTeam() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
              {isEnglish ? "Our team" : "فريقنا"}
            </h2>
          </div>
          <a href="https://abdellahkhouden.me/" target="_blank" className="flex gap-8 max-w-xl mx-auto md:max-w-3xl lg:max-w-full justify-center items-center">
            <div className="block group md:col-span-2 lg:col-span-1">
              <div className="relative mb-6">
                <img
                  src="images/team/my picture.png"
                  alt="Antonio image"
                  className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-brand-600 dark:group-hover:border-brand-400"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400">
                {isEnglish ? "Abdellah Khouden" : "عبد الله خودان"}
              </h4>
              <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200">
                {isEnglish ? "Developer" : "مطور"}
              </span>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
