// React Imports
import React from "react";

// Next Imports
import Link from "next/link";

// MUI Imports
import {createColumnHelper, Row, Table} from "@tanstack/react-table";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// Styles Imports
import {
  deleteIconStyle,
  downloadIconStyle,
  editIconStyle,
  eyeIconStyle,
} from "src/views/category/styles/styles";

// Component Imports
import {LanguageStatus} from "src/views/category/list/languages/languageStatus";

// Interface Imports
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Language} from "src/@core/interface/language/interface";

type TFunction = (key: string) => string;

type SubcategoryTypeWithAction = Subcategory & {
  action?: string
}

const columnHelper = createColumnHelper<SubcategoryTypeWithAction>()

export const createColumns = (
  selectedLang: string,
  languages: Language[],
  handleEditSubcategory: (subcategory: Subcategory) => void,
  handleDeleteSubcategory: (subcategory: Subcategory) => void,
  t: TFunction,
) => (
  [
    {
      id: 'select',
      header: ({table}: { table: Table<SubcategoryTypeWithAction> }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler()
          }}
        />
      ),
      cell: ({row}: { row: Row<SubcategoryTypeWithAction> }) => (
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
    columnHelper.accessor('image', {
      header: t('Image'),
      cell: ({row}) => <img src={row.original.image} alt="category"
                            style={{width: 50, height: 50, borderRadius: 10}}/>,
      enableSorting: false
    }),
    columnHelper.accessor('translate_content', {
      header: t('Title'),
      cell: ({row}) => (
        <div>
          {row.original.translate_content
            .filter(content => content.lang_code === selectedLang)
            .map((content, index) => (
              <div key={index}>
                <Typography>{content.content.title}</Typography>
                <Typography>{content.content.description}</Typography>
              </div>
            ))}
          {!row.original.translate_content.some(content => content.lang_code === selectedLang) && (
            <Typography>Перевод отсутствует</Typography>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('language', {
      header: t('Languages'),
      cell: ({row}) => (
        <div className="flex gap-4 border border-gray-300 p-2 items-center justify-center rounded-md">
          {languages.map((lang) => {
            const translation = row.original.translate_content.find((content) => content.lang_code === lang.language_code);

            return (

              // @ts-ignore
              <LanguageStatus key={`lang_${lang.language_code}`} languages={lang} hasTranslation={!!translation}/>
            );
          })}
        </div>
      ),
      enableSorting: false
    }),
    columnHelper.accessor('action', {
      header: t('Action'),
      cell: ({row}) => (
        <div className='flex items-center'>
          <Link href={`http://localhost:3009/subcategory/view/${row.original.id}`}>
            <IconButton sx={eyeIconStyle}>
              <i className='ri-eye-line text-[22px] text-textSecondary'/>
            </IconButton>
          </Link>
          <IconButton onClick={() => handleEditSubcategory(row.original)} sx={editIconStyle}>
            <i className='ri-edit-box-line text-[22px] text-textSecondary'/>
          </IconButton>
          <IconButton onClick={() => handleDeleteSubcategory(row.original)} sx={deleteIconStyle}>
            <i className='ri-delete-bin-7-line text-[22px] text-textSecondary'/>
          </IconButton>
          <IconButton sx={downloadIconStyle}>
            <i className='ri-download-line text-[22px] text-textSecondary'/>
          </IconButton>
        </div>
      ),
      enableSorting: false
    }),
  ]
);
