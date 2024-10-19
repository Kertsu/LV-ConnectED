import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (email: string, password: string) => void;
  onDeleteAccount: (email: string) => void; // New prop for deleting account
}

export function AccountSettingsModal({ isOpen, onClose, onSave, onDeleteAccount }: AccountSettingsModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deleteEmail, setDeleteEmail] = useState(''); // State for delete confirmation

  const handleSave = () => {
    onSave(email, password);
    onClose();
  };

  const handleDeleteAccount = () => {
    if (deleteEmail) {
      onDeleteAccount(deleteEmail);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>
            Update your account settings here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        
        {/* Danger Zone */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            Enter your email to confirm account deletion.
          </p>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="delete-email" className="text-right">Email</Label>
            <Input
              id="delete-email"
              type="email"
              value={deleteEmail}
              onChange={(e) => setDeleteEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <Button variant="destructive" onClick={handleDeleteAccount} className="mt-4">
            Delete Account
          </Button>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
