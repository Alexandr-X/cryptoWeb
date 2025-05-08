import "./cryptoDescrCard.css"

interface ICryptoDescrCard{
    setIsRightBtnOnCrptCardClick:(value:number)=>void;
    isRightBtnOnCrptCardClick:number;
}

export const CryptoDescrCard = ({setIsRightBtnOnCrptCardClick,isRightBtnOnCrptCardClick}:ICryptoDescrCard)=>{
    const handleOnCryptoDescr = ()=>{
        setIsRightBtnOnCrptCardClick(-150)
    }
    return <div style={{right:`${isRightBtnOnCrptCardClick}rem`}} onClick={handleOnCryptoDescr} className="descrCont"></div>
}