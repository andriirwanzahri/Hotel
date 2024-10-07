import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import PropTypes from "prop-types";

import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

import CreateCabinFrom from "./CreateCabinForm";

import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isPending, deleteCabin } = useDeleteCabin();
  const { creating, isCreating } = useCreateCabin();

  const {
    id: cabinId,
    name,
    image,
    maxCapacity,
    discount,
    regularPrice,
    description,
  } = cabin;

  function handleDuplicate() {
    creating({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      discount,
      regularPrice,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Muat untuk {maxCapacity} Orang</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <div>&mdash;</div>
        )}
        <div>
          <button onClick={() => handleDuplicate()} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm(!showForm)}>
            <HiPencil />
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isPending}>
            {isPending ? "Deleting..." : <HiTrash />}
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinFrom cabinToEdit={cabin} />}
    </>
  );
}

// CabinRow.propTypes = {
//   cabin: PropTypes.Object,
// };

export default CabinRow;
