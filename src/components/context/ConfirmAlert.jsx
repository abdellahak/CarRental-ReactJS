import { useSelector } from "react-redux";
export default function ConfirmAlert({onClose, onConfirm, title, message}) {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center p-5 overflow-y-auto modal z-99999`}
      >
        <div className={`modal-close-btn fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]`}>
        </div>
        <div className="flex flex-col px-4 py-4 overflow-y-auto no-scrollbar md:min-w-[400px]">
          <div className="relative w-full max-w-[507px] rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
            <div className="text-center">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
                {title}
              </h4>
              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                {message}
              </p>

              <div className="flex items-center justify-center w-full gap-3 mt-8">
                <button
                  type="button"
                  className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                  onClick={onClose}
                >
                  {isEnglish ? "Cancel" : "إلغاء"}
                </button>
                <button
                  type="button"
                  className="flex justify-center px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  onClick={onConfirm}
                >
                  {isEnglish ? "Confirm" : "تأكيد"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
