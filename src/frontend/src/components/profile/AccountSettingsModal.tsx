import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (email: string, password: string) => void;
  onDeleteAccount: (email: string) => void;
}

export function AccountSettingsModal({ isOpen, onClose, onSave, onDeleteAccount }: AccountSettingsModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deleteEmail, setDeleteEmail] = useState('');

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
          <DialogTitle className="text-2xl font-semibold">Account Settings</DialogTitle>
          <DialogDescription>
            Update your account settings or delete your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">        
        <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle size={20} />
              <h3 className="text-lg font-semibold">Danger Zone</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your email to confirm account deletion. This action cannot be undone.
            </p>
            <div className="space-y-2">
              <Label htmlFor="delete-email">Confirm Email</Label>
              <Input
                id="delete-email"
                type="email"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                placeholder="Enter your email to confirm"
                className="border-red-200 focus:ring-red-500"
              />
            </div>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount} 
              className="w-full"
            >
              Delete Account
            </Button>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          {/* <Button type="submit" onClick={handleSave} className="w-full sm:w-auto">
            Save Changes
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}