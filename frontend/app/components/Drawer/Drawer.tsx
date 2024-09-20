import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

interface DrawerProps {
  state: boolean;
  control: (state: boolean) => void;
  children: ReactNode;
}

const Drawer = ({ state, control, children } : DrawerProps) => {

  return (
    <div className="left-0 top-0 transition-all ease-in absolute w-full h-full" style={{ backgroundColor: state ? "#00000050" : "#00000000", zIndex: state ? "9999" : -1 }} >
      <div className='transition-all ease-in absolute h-[100vh] w-[300px] bg-default-50 px-4 py-6' style={{ left: state ? 0 : "-300px" }}>
        {children}
      </div>
    </div>
  )
}

export default Drawer