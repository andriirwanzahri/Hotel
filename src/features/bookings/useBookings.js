import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "status", value: filterValue, method: "qte" };

  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    // error,
  } = useQuery({
    // tambahkan argument kedua
    queryKey: ["bookings", filter, sortBy],
    //memasukkan props ke api untuk melakukan filter dan sorting data bookings
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, bookings };
}
