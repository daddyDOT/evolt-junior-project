import { ReactNode, useEffect } from "react";

interface DrawerProps {
  state: boolean;
  onClose: (x : boolean) => void;
  children: ReactNode;
}

const Drawer = ({ state, children, onClose } : DrawerProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="left-0 top-0 transition-all ease-in absolute w-full h-full" style={{ backgroundColor: state ? "#00000050" : "#00000000", zIndex: state ? "9999" : -1 }} >
      <div className='transition-all ease-in absolute h-[100vh] w-[300px] bg-default-50 px-4 py-6' style={{ left: state ? 0 : "-300px" }}>
        {children}
      </div>
      <a onClick={() => onClose(false)} className="block w-full h-full" />
    </div>
  )
}

export default Drawer