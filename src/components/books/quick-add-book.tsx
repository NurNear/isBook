"use client";

import { Plus, ScanBarcode } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  volumeNo: z.coerce.number().int().positive(),
  isbn: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type FormInput = z.input<typeof formSchema>;

export function QuickAddBook() {
  const form = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      volumeNo: 1,
      isbn: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.info("Quick add placeholder", values);
    form.reset({ title: "", volumeNo: 1, isbn: "" });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 rounded-lg border bg-white p-4 sm:grid-cols-[1fr_120px_180px_auto]">
      <Input placeholder="Book title" {...form.register("title")} />
      <Input type="number" min={1} placeholder="Volume" {...form.register("volumeNo")} />
      <Input placeholder="ISBN / Barcode" {...form.register("isbn")} />
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="icon" aria-label="Scan ISBN">
          <ScanBarcode className="size-4" />
        </Button>
        <Button type="submit">
          <Plus className="size-4" />
          Add
        </Button>
      </div>
    </form>
  );
}
