import Document from "@/pages/_document";
import { ReactNode, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;
  children: ReactNode;
}

const ModalBase = ({ toggleModal, blockClosing, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const portalRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    portalRef.current = document.querySelector<HTMLElement>("body");
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) return;

      if (!event.target) return;

      if (!ref.current.contains(event.target as HTMLDivElement)) toggleModal();
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal]);

  return mounted && portalRef.current
    ? createPortal(
        <div
          className={`top-0 w-screen z-[1000] h-screen fixed bg-[rgba(0,0,0,0.5)] flex justify-center items-center overflow-auto`}
        >
          <div
            ref={blockClosing ? null : ref}
            className="slideIn h-[100vh] w-full flex items-center justify-center"
          >
            {children}
          </div>
        </div>,
        portalRef.current
      )
    : null;
};

export default ModalBase;
