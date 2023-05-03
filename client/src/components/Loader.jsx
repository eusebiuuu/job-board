import { Oval } from "react-loader-spinner";

export default function Loader() {
  return <Oval height={100} width={100} visible={true} color='#222' 
    secondaryColor='#fff' strokeWidth={2} strokeWidthSecondary={2} />
}