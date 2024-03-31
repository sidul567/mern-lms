import { Box, Modal } from "@mui/material";
import React, { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRoute?: (route: string) => void;
  activeItem: any;
  component: any;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  activeItem,
  component: Component,
  setRoute
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[320px] 800px:w-[420px] 800px:px-6 p-4 pb-6 rounded-md shadow-none bg-gray-50 dark:bg-slate-900 outline-none">
        <Component setRoute={setRoute} setOpen={setOpen} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
