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

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: bookingsData = {},
    // data: { data: bookings = [], count = 0 },
    error,
  } = useQuery({
    // tambahkan argument kedua
    queryKey: ["bookings", filter, sortBy, page],
    //memasukkan props ke api untuk melakukan filter dan sorting data bookings
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  // Destructuring data dan count dari bookingsData
  const { data: bookings = [], count = 0 } = bookingsData;
  return { isLoading, bookings, error, count };
}
