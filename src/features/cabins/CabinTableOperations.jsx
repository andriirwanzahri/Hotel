import TableOperatins from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperations() {
  return (
    <TableOperatins>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (Low Price)" },
          { value: "regularPrice-desc", label: "Sort By Price (High Price)" },
          {
            value: "maxCapacity-asc",
            label: "Sort By Capacity (Min Capacity)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort By Capacity (Max Capacity)",
          },
        ]}
      />
    </TableOperatins>
  );
}

export default CabinTableOperations;
