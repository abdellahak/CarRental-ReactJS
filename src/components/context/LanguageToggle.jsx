import { useSelector, useDispatch } from "react-redux";

export default function LanguageToggle(){
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  function handleLanguage() {
    const newLanguage = language === "ar" ? "en" : "ar";
    dispatch({ type: "SWITCH_LANGUAGE", payload: newLanguage });
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
  }

  return (
    <>
      <button className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      
      onClick={handleLanguage}>
        {language === "ar" ? "EN" : "AR"}
      </button>
    </>
  );
};
