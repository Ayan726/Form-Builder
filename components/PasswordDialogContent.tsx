"use client";

import { ChangePassword } from "@/actions/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Form } from "@prisma/client";
import { useState, useTransition } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { toast } from "./ui/use-toast";

const PasswordDialogContent = ({ form }: { form: Form }) => {
  const [checkValue, setCheckValue] = useState(form.isProtected);
  const [pass, setPass] = useState(form.password);
  const [err, setErr] = useState(false);
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const changePassword = async (
    id: number,
    pass: string,
    isProtected: boolean
  ) => {
    try {
      await ChangePassword(id, pass, isProtected).then(() => setOpen(false));
      toast({
        title: "Success",
        description: "Password changed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full text-base" variant="destructive">
          Set password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center">
            <span>Protection</span>
            <Switch
              checked={checkValue}
              onCheckedChange={(value) => {
                setCheckValue(value);
              }}
            />
          </div>
          <>
            <Input
              className={cn(err && "border-red-500")}
              onBlur={(e) => {
                setErr(e.target.value.length !== 4);
              }}
              value={pass}
              disabled={!checkValue}
              placeholder="Type your password..."
              type="number"
              min={1000}
              max={9999}
              onChange={(e) => setPass(e.target.value)}
            />
            {err && (
              <p className="text-red-500 text-sm">
                Please enter a 4 digit password
              </p>
            )}
          </>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (err) {
                toast({
                  title: "Error",
                  description: "Please enter a four digit password!",
                  variant: "destructive",
                });
                return;
              }
              startTransition(() => changePassword(form.id, pass, checkValue));
            }}
            type="submit"
          >
            Save changes
            {pending && <AiOutlineLoading className="animate-spin ml-1" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialogContent;
