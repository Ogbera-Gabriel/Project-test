"use client";

import { FormControl, InputLabel, Select } from "@mui/material";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SubmitHandler } from "react-hook-form";
// import { formSchema } from "@/zod-schema/formSchema";
const formSchema = z.object({
  quantity: z
    .string()
    .or(z.number())
    .refine(
      (value) => {
        if (typeof value === "number") {
          return value > 0;
        }
        return !isNaN(Number(value)) && Number(value) > 0;
      },
      {
        message: "Quantity must be a number greater than 0",
      }
    ),
  length: z.string().min(1, {
    message: "Length is required",
  }),
  drying: z.string().min(1, {
    message: "Drying is required",
  }),
  strength: z.string().min(1, {
    message: "Strength Grade is required",
  }),
  visual: z.string().min(1, {
    message: "Visual Quality is required",
  }),
  certified: z.string().optional(),
  moisture: z.string().optional(),
  impregnation: z.string().optional(),
});

export default function WoodFormModal() {
  const [open, setOpen] = useState(true);

  // const [length, setLength] = useState("");
  // const [drying, setDrying] = useState("");
  // const [strength, setStrength] = useState("");
  // const [visual, setVisual] = useState("");

  // const [certified, setCertified] = useState("");
  // const [moisture, setMoisture] = useState("");
  // const [impregnation, setImpregnation] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  type MyFormData = z.infer<typeof formSchema>;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    // // debugger;
    const formData = data as MyFormData;
    data.quantity = !isNaN(Number(data.quantity)) ? Number(data.quantity) : data.quantity;
    console.log(formData);
    handleClose();

    // console.log(data);
  };

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <>
      <Button onClick={handleOpen}>Open Form</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Wood Form</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below.</DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <TextField
              {...register("quantity")}
              label="Quantity"
              error={!!errors.quantity}
              fullWidth
              helperText="Enter Quanitity"
            />
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">Length</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Length"
                defaultValue={""}
                {...register("length")}
              >
                {[
                  "2400mm",
                  "2500mm",
                  "2600mm",
                  "2700mm",
                  "2800mm",
                  "2900mm",
                  "3000mm",
                  "3100mm",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="length"
              select
              label="Length"
              value={length}
              fullWidth
              onChange={(e) => setLength(e.target.value)}
              helperText="Enter Length"
            >
              {[
                "2400mm",
                "2500mm",
                "2600mm",
                "2700mm",
                "2800mm",
                "2900mm",
                "3000mm",
                "3100mm",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">Drying</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                label="Drying"
                {...register("drying")}
              >
                {["KD", "AD", "Heat Treated"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="drying"
              select
              label="Drying"
              value={drying}
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDrying(e.target.value)
              }
              helperText="Select drying"
            >
              {["KD", "AD", "Heat Treated"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}

            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">Strength</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                label="Strength"
                {...register("strength")}
              >
                {["No Strength grade", "C24", "C18"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="strength"
              select
              label="Strength Grade"
              value={strength}
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStrength(e.target.value)
              }
              helperText="Select strength grade"
            >
              {["No Strength grade", "C24", "C18"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">
                Visual Quality
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                label="Visual Quality"
                {...register("visual")}
              >
                {["C(V)", "B (OS I-IV)", "S/F (I-V)"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="visual"
              select
              label="Visual Quality"
              value={visual}
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setVisual(e.target.value)
              }
              helperText="Select visual quality"
            >
              {["C(V)", "B (OS I-IV)", "S/F (I-V)"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">Certified</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                label="Certified"
                {...register("certified")}
              >
                {["No Certificate", "FSC or PEFC", "ISPM15"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="certified"
              select
              label="Certified"
              value={certified}
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCertified(e.target.value)
              }
              helperText="Select certified"
            >
              {["No Certificate", "FSC or PEFC", "ISPM15"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">Moisture</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                label="Moisture"
                {...register("moisture")}
              >
                {["10-14", "18-21", "15-18"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="moisture"
              select
              label="Moisture level"
              value={moisture}
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMoisture(e.target.value)
              }
              helperText="Select moisture level"
            >
              {["10-14", "18-21", "15-18"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">
                Impregnation
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                label="Impregnation"
                {...register("impregnation")}
              >
                {["Impregnated", "Not Impregnated"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="impregnation"
              select
              label="Impregnation"
              value={impregnation}
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImpregnation(e.target.value)
              }
              helperText="Select impregnation"
            >
              {["Impregnated", "Not Impregnated"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
