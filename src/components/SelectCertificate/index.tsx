import Select from "react-select";
import { getSelectedItem, selectItem, useAppDispatch } from "../../store";
import { useGetOptionsQuery } from "../../store/api";
import { memo, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

function SelectCertificate() {
  const { data, isError, isLoading } = useGetOptionsQuery();

  const options = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      value: item,
      label: item.NAME,
    }));
  }, [data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) alert("Ошибка загрузки данных");
  }, [isError]);

  const selectedItem = useSelector(getSelectedItem);

  return (
    <Select
      options={options}
      placeholder="Выберите сертификат"
      isSearchable={false}
      styles={{
        option: (styles) => ({
          ...styles,
          cursor: "pointer",
        }),
        control: (styles) => ({
          ...styles,
          cursor: "pointer",
        }),
      }}
      onChange={(selectedItem) => {
        if (selectedItem) {
          dispatch(selectItem(selectedItem.value));
        }
      }}
      isLoading={isLoading}
      loadingMessage={() => "Загрузка..."}
      defaultValue={
        selectedItem && { value: selectedItem, label: selectedItem.NAME }
      }
    />
  );
}

export default memo(SelectCertificate);
