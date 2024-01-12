"use client";
import { SubmitForm } from "@/actions/form";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { HiCursorClick } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import { FormElementInstance, FormElements } from "./FormElements";
import OtpComponent from "./OtpComponent";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const FormSubmitComponent = ({
  formUrl,
  content,
  isProtected,
  password,
}: {
  formUrl: string;
  content: FormElementInstance[];
  isProtected: boolean;
  password: string;
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [otp, setOtp] = useState<number>(0);
  const [passCracked, setPassCracked] = useState(false);
  const [otpError, setOtpError] = useState(false);

  useEffect(() => {
    const stringOtp = otp.toString();
    if (stringOtp.length !== 4) return;
    if (stringOtp === password) {
      setPassCracked(true);
      setOtpError(false);
    } else setOtpError(true);
  }, [otp]);

  const handleOtpChange = (value: number) => {
    setOtp(value);
  };

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, []);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    const validForm = validateForm();
    formErrors.current = {};
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Please check the form for errors!",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }

    console.log("FORM VALUES", formValues.current);
  };

  if (isProtected && !passCracked)
    return <OtpComponent otp={otp} handleOtpChange={handleOtpChange} err={otpError} />;

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((el) => {
          const FormElement = FormElements[el.type].formComponent;
          return (
            <FormElement
              key={el.id}
              elementInstance={el}
              submitValue={submitValue}
              isInvalid={formErrors.current[el.id]}
              defaultValue={formValues.current[el.id]}
              formErrors={formErrors}
            />
          );
        })}
        <Button
          disabled={pending}
          onClick={() => {
            startTransition(submitForm);
          }}
          className="mt-8"
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
