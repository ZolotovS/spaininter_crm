import DeleteIcon from "@mui/icons-material/Delete";
import {
	Button,
	ButtonBase,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from "@mui/material";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/hooks";
import { authModel } from "@/app/models/auth-model";

type Props = {
	adminId: number;
};

export const DeleteAdmin: FC<Props> = ({ adminId }) => {
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toast = useToast();
	const { mutate } = useMutation({
		mutationKey: ["delete-admin-ke"],
		mutationFn: (adminId: number) => authModel.deleteAdmin(adminId),
		onSuccess: async () => {
			setIsOpen(false);
			toast.success("Admin deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete admin");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["admins-key"] });
		}
	});

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);
	const handleDelete = () => {
		mutate(adminId);
	};

	return (
		<>
			<ButtonBase onClick={handleOpen} sx={{ color: "#FF6B6B" }}>
				<DeleteIcon />
			</ButtonBase>
			<Dialog open={isOpen} onClose={handleClose}>
				<DialogTitle>Delete admin from ID {adminId}?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						If you delete the admin from the database, it will be lost forever.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button sx={{ color: "#FF6B6B" }} onClick={handleDelete} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
