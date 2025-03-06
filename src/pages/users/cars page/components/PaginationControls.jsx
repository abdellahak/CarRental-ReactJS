import { useSelector } from "react-redux";
export default function PaginationControls({
  currentPage,
  totalPages,
  handlePageChange,
}) {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";

  return (
    <div className="pagination flex justify-center my-2 p-2 bg-gray-200 dark:bg-gray-800 w-fit mx-auto rounded-lg">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed text-black"
      >
        {isEnglish ? "Previous" : "السابق"}
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 mx-1 rounded-sm ${
            currentPage === index + 1
              ? "bg-brand-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed text-black"
      >
        {isEnglish ? "Next" : "التالي"}
      </button>
    </div>
  );
}
