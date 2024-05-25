// React Imports
import {ReactNode} from "react";
import {CN, KG, KZ, RU, US} from "country-flag-icons/react/3x2";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";

// Interface Imports
import {Language} from "src/@core/interface/language/interface";

interface Props {
  languages: Language[];
  hasTranslation: boolean;
}

export const LanguageStatus = ({languages, hasTranslation}: Props) => {
  const flagIcons: { [key: string]: ReactNode } = {
    ru: <RU style={{width: '30px', height: '30px', marginRight: '5px'}}/>,
    en: <US style={{width: '30px', height: '30px', marginRight: '5px'}}/>,
    kz: <KZ style={{width: '30px', height: '30px', marginRight: '5px'}}/>,
    kgz: <KG style={{width: '30px', height: '30px', marginRight: '5px'}}/>,
    ch: <CN style={{width: '30px', height: '30px', marginRight: '5px'}}/>
  };

  return (
    <div>
      {flagIcons

        // @ts-ignore
        [languages?.language_code]}
        {hasTranslation ? <AiOutlineCheck style={{color: 'green', fontSize: '24px'}}/> :
        <AiOutlineClose style={{color: 'red', fontSize: '24px'}}/>}
    </div>
  );
};
