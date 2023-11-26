"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement } from "../FormElements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper Text",
      required: false,
      placeholder: "Value here...",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: () => <div>bgfuewhg</div>,
  formComponent: () => <div>aa</div>,
  propertiesComponent: () => <div>bbb</div>,
};
