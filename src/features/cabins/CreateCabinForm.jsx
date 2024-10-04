import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("data berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(`data gagal di tambahkan ${err.message}`),
  });

  console.log(errors);
  const onError = (errors, e) => console.log(errors, e);

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow errors={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Nama Harus di isi" })}
        />
      </FormRow>

      <FormRow errors={errors?.maxCapacity?.message} label="max Capacity">
        <Input
          type="number"
          id="maxCapacity"
          // disabled={isWorking}
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
          // disabled={isWorking}
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
          // defaultValue={0}
          // disabled={isWorking}
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
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "Deskripsi harus diisi" })}
        />
      </FormRow>

      <FormRow>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          Edit cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
