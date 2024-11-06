import styled from "styled-components";
import TodayActivity from "../check-in-out/TodayActivity";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useCabin } from "../cabins/useCabin";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending: isPending1 } = useRecentBookings();
  const { confirmedStays, isPending: isPending2, numDays } = useRecentStays();
  const { cabins, isPending: isPending3 } = useCabin();

  if (isPending1 || isPending2 || isPending3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
      {/* <SalesChart bookings={bookings} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
