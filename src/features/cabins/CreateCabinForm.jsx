import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { creating, isCreating } = useCreateCabin();
  const { editting, isEditting } = useEditCabin();

  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);
  // menentukan apakah datanya berada pada creating atau editing
  const isWaiting = isCreating || isEditting;
  const onError = (errors, e) => console.log(errors, e);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  //Kelola data dari form mau di masukkan kedalam creating atau editng
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // mengechek apakah datanya bersifat editing atau creating
    if (isEditSession)
      editting(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      creating(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow errors={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          disabled={isWaiting}
          {...register("name", { required: "Nama Harus di isi" })}
        />
      </FormRow>

      <FormRow errors={errors?.maxCapacity?.message} label="max Capacity">
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWaiting}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow errors={errors?.regularPrice?.message} label="regular Price">
        <Input
          type="number"
          id="regularPrice"
          disabled={isWaiting}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow errors={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWaiting}
          {...register("discount", {
            required: "Can't be empty, make it at least 0",
            validate: (value) =>
              Number(getValues().regularPrice) >=
                Number(getValues("discount")) ||
              `Discount should be less than regular price ${value}`,
          })}
        />
      </FormRow>

      <FormRow errors={errors?.description?.message} label="Description">
        <Textarea
          type="text"
          id="description"
          disabled={isWaiting}
          defaultValue=""
          {...register("description", { required: "Deskripsi harus diisi" })}
        />
      </FormRow>

      <FormRow label="Image">
        <FileInput
          id="image"
          disabled={isWaiting}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Gambar Harus di isi ..",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isWaiting}>
          {isEditSession ? "Edit Cabin" : "Buat Cabin Baru"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

export default CreateCabinForm;
