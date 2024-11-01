import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checkedOut `);
      QueryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("there was an error while checking out"),
  });
  return { checkout, isCheckingOut };
}
