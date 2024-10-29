import TableOperatins from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
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
    </TableOperatins>
  );
}

export default CabinTableOperations;
