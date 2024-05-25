import {StyledSnackbar} from "src/views/category/styles/styles";

type Props = {
  color: string;
  message: string;
  showMessage: () => void;
  open?: boolean;
  autoHideDuration?: number;
  onClose?: () => void; // добавляем onClose в тип Props
}

export const renderSnackbar = ({ color, message, showMessage, open = true, autoHideDuration = 6000, onClose }: Props) => (
  <StyledSnackbar
    color={color}
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose ? () => onClose() : undefined}
    message={message}
  />
);
