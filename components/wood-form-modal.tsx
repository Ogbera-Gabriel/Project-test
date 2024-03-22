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


const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const formSchema = z.object({
  softwood: z.string().min(1, {
    message: "Softwood selection is required",
  }),
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
  companyName: z.string().min(1, {
    message: "Company Name is required",
  }),
  deliveryAddress: z.string().min(1, {
    message: "Delivery Address is required",
  }),
  telephone: z.string().regex(phoneRegex, "Invalid Number!"),
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export default function WoodFormModal() {
  const [open, setOpen] = useState(true);
  const [showCompany, setShowCompany] = useState(false);
  const [showWood, setShowWood] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({
    softwood: "",
    quantity: "",
    length: "",
    drying: "",
    strength: "",
    visual: "",
    certified: "",
    moisture: "",
    impregnation: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const handleShowCompany = () => {
    setShowCompany(true);
    setShowWood(false);
  };

  const handleShowWood = () => {
    setShowCompany(false);
    setShowWood(true);
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    // // debugger;
    const formData = data as MyFormData;
    data.quantity = !isNaN(Number(data.quantity))
      ? Number(data.quantity)
      : data.quantity;
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
          <DialogContentText sx={{marginBottom: "10px"}}>Please fill out the form below.</DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {showWood && (
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label">SoftWood</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  label="SoftWood"
                  defaultValue={""}
                  {...register("softwood")}
                  error={!!errors.softwood}
                  value={selectedOptions.softwood}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, softwood: e.target.value })}
                >
                  {[
                    "Douglas 45x200 Unplaned",
                    "Larch 160x260 Unplaned",
                    "Pine 47x100 Unplaned",
                    "Spruce 22x45 Unplaned",
                    "Spruce SLS 38x140 planed",
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {showWood && (
              <TextField
                {...register("quantity")}
                required
                label="Quantity"
                error={!!errors.quantity}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
            {showWood && (
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label">Length</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  label="Length"
                  defaultValue={""}
                  {...register("length")}
                  value={selectedOptions.length}
                  error={!!errors.length}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, length: e.target.value })}
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
            )}

            {showWood && (
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label">Drying</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  defaultValue={""}
                  label="Drying"
                  {...register("drying")}
                  value={selectedOptions.drying}
                  error={!!errors.drying}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, drying: e.target.value })}
                >
                  {["KD", "AD", "Heat Treated"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showWood && (
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label">Strength</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  defaultValue={""}
                  label="Strength"
                  {...register("strength")}
                  value={selectedOptions.strength}
                  error={!!errors.strength}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, strength: e.target.value })}
                >
                  {["No Strength grade", "C24", "C18"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showWood && (
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label">
                  Visual Quality
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  defaultValue={""}
                  label="Visual Quality"
                  {...register("visual")}
                  value={selectedOptions.visual}
                  error={!!errors.visual}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, visual: e.target.value })}
                >
                  {["C(V)", "B (OS I-IV)", "S/F (I-V)"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showWood && (
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label">Certified</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={""}
                  label="Certified"
                  {...register("certified")}
                  value={selectedOptions.certified}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, certified: e.target.value })}
                >
                  {["No Certificate", "FSC or PEFC", "ISPM15"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showWood && (
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label">Moisture</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={""}
                  label="Moisture"
                  {...register("moisture")}
                  value={selectedOptions.moisture}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, moisture: e.target.value })}
                >
                  {["10-14", "18-21", "15-18"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showWood && (
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
                  value={selectedOptions.impregnation}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, impregnation: e.target.value })}
                >
                  {["Impregnated", "Not Impregnated"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showCompany && (
              <TextField
                {...register("companyName")}
                required
                label="Company Name"
                error={!!errors.companyName}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}

            {showCompany && (
              <TextField
                {...register("deliveryAddress")}
                required
                label="Company Delivery Address"
                error={!!errors.deliveryAddress}
                fullWidth
                style={{ marginBottom: "10px" }}
                
              />
            )}

            {showCompany && (
              <TextField
                {...register("telephone")}
                required
                error={!!errors.telephone}
                fullWidth
                label="Company Phone Number"
                style={{ marginBottom: "10px" }}
              />
            )}
            
            
            {showCompany && (
              <TextField
                {...register("email")}
                required
                error={!!errors.email}
                fullWidth
                label="Company Email"
                style={{ marginBottom: "10px" }}
              />
            )}

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {showWood && (
                <Button type="button" onClick={handleShowCompany}>
                  Next
                </Button>
              )}
              {showCompany && (
                <Button type="button" onClick={handleShowWood}>
                  {" "}
                  Back
                </Button>
              )}
              {showCompany && (
                <Button type="submit">
                  Submit
                </Button>
              )}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
