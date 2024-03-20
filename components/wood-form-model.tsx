"use client";

import { Grid } from "@mui/material";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
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

  const [length, setLength] = useState("");
  const [drying, setDrying] = useState("");
  const [strength, setStrength] = useState("");
  const [visual, setVisual] = useState("");

  const [certified, setCertified] = useState("");
  const [moisture, setMoisture] = useState("");
  const [impregnation, setImpregnation] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  type MyFormData = FieldValues & {
    quantity: number | string;
    length: string;
    drying: string;
    strength: string;
    visual: string;
    certified?: string;
    moisture?: string;
    impregnation?: string;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    debugger;
    const formData = data as MyFormData;
    data.quantity = !isNaN(Number(data.quantity)) ? Number(data.quantity) : data.quantity;
    console.log(formData);
    handleClose();
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
            <TextField
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
            </TextField>

            <TextField
              id="drying"
              select
              label="Drying"
              value={drying}
              fullWidth
              onChange={(e) => setDrying(e.target.value)}
              helperText="Select drying"
            >
              {["KD", "AD", "Heat Treated"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="strength"
              select
              label="Strength Grade"
              value={strength}
              fullWidth
              onChange={(e) => setStrength(e.target.value)}
              helperText="Select strength grade"
            >
              {["No Strength grade", "C24", "C18"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="visual"
              select
              label="Visual Quality"
              value={visual}
              fullWidth
              onChange={(e) => setVisual(e.target.value)}
              helperText="Select visual quality"
            >
              {["C(V)", "B (OS I-IV)", "S/F (I-V)"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="certified"
              select
              label="Certified"
              value={certified}
              fullWidth
              onChange={(e) => setCertified(e.target.value)}
              helperText="Select certified"
            >
              {["No Certificate", "FSC or PEFC", "ISPM15"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="moisture"
              select
              label="Moisture level"
              value={moisture}
              fullWidth
              onChange={(e) => setMoisture(e.target.value)}
              helperText="Select moisture level"
            >
              {["10-14", "18-21", "15-18"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="impregnation"
              select
              label="Impregnation"
              value={impregnation}
              fullWidth
              onChange={(e) => setImpregnation(e.target.value)}
              helperText="Select impregnation"
            >
              {["Impregnated", "Not Impregnated"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

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
