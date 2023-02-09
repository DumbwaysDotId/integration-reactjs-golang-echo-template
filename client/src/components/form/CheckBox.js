import { createElement, useEffect, useState } from "react";

export default function CheckBox(props) {
  const { value, handleChangeCategoryId, categoryId } = props;

  const [isChecked, setIsChecked] = useState(false);

  const getIsChecked = () => {
    const checked = categoryId.includes(value)
    setIsChecked(checked);
  };

  useEffect(() => {
    getIsChecked();
  }, []);

  return createElement("input", {
    type: "checkbox",
    checked: isChecked,
    value: value,
    onChange: (e) => handleChangeCategoryId(e, setIsChecked),
  });
}
