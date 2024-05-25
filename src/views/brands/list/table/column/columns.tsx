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
} from "src/views/brands/styles/styles";

// Component Imports
import {LanguageStatus} from "src/views/brands/list/languages/languageStatus";

// Interface Imports
import {Brands, TranslationContent} from "src/@core/interface/brands/interface";
import {Language} from "src/@core/interface/language/interface";
import {knownBrands} from "src/views/brands/logoBrand/logoBrand";

type TFunction = (key: string) => string;

type BrandsTypeWithAction = Brands & {
  action?: string
}

const columnHelper = createColumnHelper<BrandsTypeWithAction>();

const getBrandName = (contents: TranslationContent[], lang: string) => {
  const content = contents.find(content => content.lang_code === lang);
  if (content) {
    return content.content.name || content.content.description;
  }

  return null;
};

export const createColumns = (
  selectedLang: string,
  languages: Language[],
  handleEditBrands: (brands: Brands) => void,
  handleDeleteBrands: (brands: Brands) => void,
  t: TFunction,
) => [
  {
    id: 'select',
    header: ({ table }: { table: Table<BrandsTypeWithAction> }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }: { row: Row<BrandsTypeWithAction> }) => (
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
  columnHelper.accessor('icon', {
    header: t('Icon'),
    cell: ({ row }) => {
      const brandName = getBrandName(row.original.translate_content, selectedLang) || 'default';
      const iconSrc = knownBrands[brandName] || row.original.icon || '/images/brand/default.png';

      return (
        <div>
          <img src={iconSrc} alt="brand icon" style={{ width: 70, height: 70 }} />
        </div>
      );
    },
  }),
  columnHelper.accessor('translate_content', {
    header: t('Title'),
    cell: ({ row }) => (
      <div>
        {row.original.translate_content
          .filter(content => content.lang_code === selectedLang)
          .map((content, index) => (
            <div key={index}>
              <Typography>{content.content.name}</Typography>
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
    cell: ({ row }) => (
      <div className="flex gap-4 border border-gray-300 p-2 items-center justify-center rounded-md">
        {languages.map((lang) => {
          const translation = row.original.translate_content.find((content) => content.lang_code === lang.language_code);

          return (
            // @ts-ignore
            <LanguageStatus key={`lang_${lang.language_code}`} languages={lang} hasTranslation={!!translation} />
          );
        })}
      </div>
    ),
    enableSorting: false
  }),
  columnHelper.accessor('action', {
    header: t('Action'),
    cell: ({ row }) => (
      <div className='flex items-center'>
        <Link href={`http://localhost:3009/brands/view/${row.original.id}`}>
          <IconButton sx={eyeIconStyle}>
            <i className='ri-eye-line text-[22px] text-textSecondary'/>
          </IconButton>
        </Link>
        <IconButton onClick={() => handleEditBrands(row.original)} sx={editIconStyle}>
          <i className='ri-edit-box-line text-[22px] text-textSecondary'/>
        </IconButton>
        <IconButton onClick={() => handleDeleteBrands(row.original)} sx={deleteIconStyle}>
          <i className='ri-delete-bin-7-line text-[22px] text-textSecondary'/>
        </IconButton>
        <IconButton sx={downloadIconStyle}>
          <i className='ri-download-line text-[22px] text-textSecondary'/>
        </IconButton>
      </div>
    ),
    enableSorting: false
  }),
];
