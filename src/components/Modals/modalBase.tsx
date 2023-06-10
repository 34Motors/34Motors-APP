import { ReactNode, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;
  children: ReactNode;
}

const ModalBase = ({ toggleModal, blockClosing, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

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
  return createPortal(
    <div className={`top-0 w-screen h-screen fixed bg-[rgba(0,0,0,0.5)] flex justify-center items-center overflow-auto`}>
      <div ref={blockClosing ? null : ref}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalBase;
