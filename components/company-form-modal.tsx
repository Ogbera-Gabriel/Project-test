'use client'

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


const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
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

export default function CompanyFormModal() {
    const [open, setOpen] = useState(true);

    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(formSchema)
    });

    type MyFormData = FieldValues & {
        name: string;
        companyName: string;
        deliveryAddress: string;
        telephone: string;
        email: string;
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formData = data as MyFormData
        console.log(formData);
        handleClose();
    }
    
    useEffect(() => {
        handleOpen();
    }, []);

    return (
        <>
        <Button onClick={handleOpen}>Open Form</Button>
        </>
    )
}