import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabin();
  const [searchParams] = useSearchParams();

  // 1.) filter Cabin
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins = cabins || [];
  if (filterValue === "all") filteredCabins = cabins || [];
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0) || [];
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0) || [];

  // 2.) Sort By Price Cabin
  const sortBy = searchParams.get("sortBy") || "created_at-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins =
    filteredCabins && filteredCabins.length > 0
      ? [...filteredCabins].sort(
          // (a, b) => (a[field] - b[field]) * modifier
          (a, b) => {
            if (typeof a[field] === "string" && typeof b[field] === "string") {
              return a[field].localeCompare(b[field]) * modifier;
            }
            return (a[field] - b[field]) * modifier;
          }
        )
      : [];

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
