import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface LogoutModal {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function LogoutModal({
  open,
  onClose,
  onConfirm,
  isLoading = false
}: LogoutModal) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Confirm Logout</DialogTitle>
          <DialogDescription className="text-gray-600">
            Are you sure you want to logout? You will need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}