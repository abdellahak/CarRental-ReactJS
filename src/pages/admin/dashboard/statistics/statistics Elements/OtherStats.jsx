import { useSelector } from "react-redux";

export default function OtherStats() {
  const contracts = useSelector((state) => state.contracts);
  const revenue = contracts.reduce((acc, contract) => acc + contract.price, 0);
  const thisMonthRevenue = contracts
    .filter(
      (contract) =>
        new Date(contract.startDate).getMonth() === new Date().getMonth()
    )
    .reduce((acc, contract) => acc + contract.price, 0);
    const thisMonthBookedCars = contracts.filter(
      (contract) =>
        new Date(contract.startDate).getMonth() === new Date().getMonth()
    ).length;
  return (
    <>
      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            This Month Booked Cars
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {thisMonthBookedCars}
            
          </p>
        </div>

        <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Revenue
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {revenue} MAD
            
          </p>
        </div>

        <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            This Month
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {thisMonthRevenue} MAD
            
          </p>
        </div>
      </div>
    </>
  );
}
