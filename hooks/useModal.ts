import { atom, useRecoilState } from 'recoil';

export type ModalType = 'createServer';
//   onOpen: (type: ModalType) => void;
//   onClose: () => void;
interface Modal {
  type: ModalType | null;
  isOpen: boolean;
}

const modalAtom = atom<Modal>({
  key: 'modal',
  default: { type: null, isOpen: false },
});

export const useModal = () => {
  const [{ type, isOpen }, setValue] = useRecoilState(modalAtom);

  const onOpen = (type: ModalType) => {
    setValue({ isOpen: true, type });
  };

  const onClose = () => {
    setValue({ isOpen: false, type: null });
  };

  return { type, isOpen, onOpen, onClose };
};
