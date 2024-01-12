import { Form } from "@prisma/client";
import PasswordDialogContent from "./PasswordDialogContent";

const PasswordBtn = ({ form }: { form: Form }) => {
  return <PasswordDialogContent form={form} />;
};

export default PasswordBtn;
