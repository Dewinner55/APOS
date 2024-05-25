// React Imports
import React, {useEffect, useState} from "react";

// Next Imports
import Link from "next/link";

// MUI Imports
import { createColumnHelper, Table, Row } from "@tanstack/react-table";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// Styles Imports
import {
  deleteIconStyle,
  downloadIconStyle,
  editIconStyle,
  eyeIconStyle,
} from "src/views/products/styles/styles";

// Component Imports
import { LanguageStatus } from "src/views/products/list/languages/languageStatus";

// Interface Imports
import { Product } from "src/@core/interface/products/interface";
import { Language } from "src/@core/interface/language/interface";

type TFunction = (key: string) => string;

type ProductsTypeWithAction = Product & {
  action?: string;
}

const columnHelper = createColumnHelper<ProductsTypeWithAction>();

export const createColumns = (
  selectedLang: string,
  languages: Language[],
  handleEditProduct: (product: Product) => void,
  handleDeleteProduct: (product: Product) => void,
) => [
  {
    id: 'select',
    header: ({ table }: { table: Table<ProductsTypeWithAction> }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }: { row: Row<ProductsTypeWithAction> }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler()
        }}
      />
    )
  },
  columnHelper.accessor('product_info', {
    header: "Изображение и Цвет",
    cell: ({ row }) => {
      const [selectedColor, setSelectedColor] = useState(Object.keys(row.original.product_info)[0]);

      const handleColorChange = (colorKey: string) => {
        setSelectedColor(colorKey);
      };

      useEffect(() => {
        const productInfo = row.original.product_info[selectedColor];
        const imageElement = document.getElementById(`product-image-${row.index}`) as HTMLImageElement;
        if (imageElement) {
          imageElement.src = productInfo.images[0] || '/placeholder.jpg';
        }
      }, [selectedColor, row]);

      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            id={`product-image-${row.index}`}
            src={row.original.product_info[selectedColor].images[0] || '/placeholder.jpg'}
            alt="product"
            style={{ width: 70, height: 70, borderRadius: 10, marginRight: 10 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexWrap: 'wrap' }}>
            {Object.keys(row.original.product_info).map((colorKey, index) => {
              const colorCode = row.original.product_info[colorKey].color_code;
              const validColorCode = colorCode.startsWith('#') ? colorCode : `#${colorCode}`;

              return (
                <div
                  key={colorKey}
                  onClick={() => handleColorChange(colorKey)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: validColorCode,
                    border: selectedColor === colorKey ? '2px solid black' : '1px solid grey',
                    cursor: 'pointer',
                    marginBottom: index % 3 === 2 ? '8px' : '0' // Add marginBottom for every third color
                  }}
                />
              );
            })}
          </div>
        </div>
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('translate_content', {
    header: "Название",
    cell: ({ row }) => (
      <div>
        {row.original.translate_content
          .filter(content => content.lang_code === selectedLang)
          .map((content, index) => (
            <div key={index}>
              <Typography>{content.content.name}</Typography>
              <Typography>{content.content.description.slice(0, 25)}...</Typography>
            </div>
          ))}
        {!row.original.translate_content.some(content => content.lang_code === selectedLang) && (
          <Typography>Перевод отсутствует</Typography>
        )}
      </div>
    ),
  }),
  columnHelper.accessor('categoryAndSubcategory', {
    header: "Категория / Подкатегория",
    cell: ({ row }) => (
      <div>
        <Typography>{row.original.category?.translate_content
          .find(content => content.lang_code === selectedLang)?.content.title || "Категория отсутствует"}</Typography>
        <Typography>{row.original.subcategory?.translate_content
          .find(content => content.lang_code === selectedLang)?.content.title || "Подкатегория отсутствует"}</Typography>
      </div>
    ),
  }),
  columnHelper.accessor('available', {
    header: "В наличии",
    cell: ({ row }) => (
      <Typography>{row.original.available ? "Да" : "Нет"}</Typography>
    ),
  }),
  columnHelper.accessor('price', {
    header: "Цена",
    cell: ({ row }) => (
      <Typography>{row.original.price}</Typography>
    ),
  }),
  columnHelper.accessor('action', {
    header: "Действия",
    cell: ({ row }) => (
      <div className='flex items-center'>
        <Link href={`http://localhost:3009/product/view/${row.original.id}`}>
          <IconButton sx={eyeIconStyle}>
            <i className='ri-eye-line text-[22px] text-textSecondary' />
          </IconButton>
        </Link>
        <IconButton onClick={() => handleEditProduct(row.original)} sx={editIconStyle}>
          <i className='ri-edit-box-line text-[22px] text-textSecondary' />
        </IconButton>
        <IconButton onClick={() => handleDeleteProduct(row.original)} sx={deleteIconStyle}>
          <i className='ri-delete-bin-7-line text-[22px] text-textSecondary' />
        </IconButton>
        <IconButton sx={downloadIconStyle}>
          <i className='ri-download-line text-[22px] text-textSecondary' />
        </IconButton>
      </div>
    ),
    enableSorting: false
  }),
];
