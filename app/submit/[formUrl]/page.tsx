import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import OtpComponent from "@/components/OtpComponent";
import React from "react";

const SubmitPage = async ({
  params,
}: {
  params: {
    formUrl: string;
  };
}) => {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) throw new Error("form not found!");

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} isProtected={form.isProtected} password={form.password} />;
};

export default SubmitPage;
