/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription, // Import DialogDescription
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  export function BondConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
  }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Making Bond</DialogTitle>
            <DialogDescription>
              This action will create a bond. Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "Making bond..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  